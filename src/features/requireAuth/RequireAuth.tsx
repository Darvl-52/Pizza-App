import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import * as React from 'react'

export function RequireAuth ({ children }: {children: React.ReactNode}) {
    const jwt = useSelector((s: RootState) => s.user.jwt);

    if( !jwt ) {
        return <Navigate to='/auth/login' replace/>;
    }

    return children
}