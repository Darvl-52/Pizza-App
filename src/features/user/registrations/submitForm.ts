import {AppDispatch} from "../../../app/store";
import {register, userActions} from "../user.slice.ts";
import * as React from 'react'

type sendFormParams = {
    e: React.FormEvent;
    dispatch: AppDispatch;
}

export type RegisterForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
    name: {
        value: string;
    }
};


export const sendForm = async ({e, dispatch}: sendFormParams) => {
    e.preventDefault();
    dispatch(userActions.clearRegisterError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password , name} = target;
    dispatch(register({email: email.value, password: password.value, name: name.value}));
}