import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../app/store/storage.ts";
import axios from "axios";
import { PREFIX } from "../../shared/api/api.ts";
import { LoginResponse } from "./auth/submitForm.ts";
import { RootState } from "../../app/store";

export const JWT_STATE = 'userData';

export interface UserPersistentState {
    jwt: string | undefined;
}

export interface Profile {
    id: number;
    email: string;
    address: string;
    name: string;
}

export interface UserState {
    jwt: string | null;
    loginErrorMessage?: string | null;
    registerErrorMessage: string | null;
    profile?: Profile;
}

const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_STATE)?.jwt ?? null,
    loginErrorMessage: null,
    registerErrorMessage: null,
}

export const register = createAsyncThunk('user/register',
    async (params: { email: string, password: string, name: string }) => {
        const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
            email: params.email,
            password: params.password,
            name: params.name,
        });
        return data;
    }
);

export const login = createAsyncThunk('user/login',
    async (params: { email: string, password: string }) => {
        const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
            email: params.email,
            password: params.password,
        });
        return data;
    }
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>('user/getProfile',
    async (_, thunkAPI) => {
        const jwt = thunkAPI.getState().user.jwt;
        const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        return data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null;
        },
        clearLoginError: (state) => {
            state.loginErrorMessage = null;
        },
        clearRegisterError: (state) => {
            state.registerErrorMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state: UserState, action) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        });
        builder.addCase(login.rejected, (state: UserState, action) => {
            state.loginErrorMessage = action.error.message || 'Unknown error';
        });
        builder.addCase(getProfile.fulfilled, (state: UserState, action) => {
            state.profile = action.payload
        });
        builder.addCase(register.fulfilled, (state: UserState, action) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        });
        builder.addCase(register.rejected, (state: UserState, action) => {
            state.registerErrorMessage = action.error.message || 'Unknown error';
        });
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
