import {configureStore} from "@reduxjs/toolkit";
import userSlice, {JWT_STATE} from "../../features/user/user.slice.ts";
import {saveState} from "./storage.ts";
import cartSlice, {CART_PERSISTENT_STATE} from "../../features/cart/cart.slice.ts";

export const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice
    },
});

store.subscribe(() => {
   saveState({jwt: store.getState().user.jwt}, JWT_STATE);
    saveState(store.getState().cart, CART_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;