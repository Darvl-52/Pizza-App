import {login, userActions} from "../user.slice.ts";
import { AppDispatch } from "../../../app/store";
import * as React from 'react'

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
};

export type LoginResponse = {
    access_token: string;
};

interface SubmitParams {
    e: React.FormEvent;
    dispatch: AppDispatch;
}

export const submit = async ({ e, dispatch }: SubmitParams) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value, dispatch)
};

const sendLogin = async (email: string, password: string, dispatch: AppDispatch) => {
    dispatch(login({email, password}));
}