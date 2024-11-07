import styles from "./loginForm.module.css";
import {Input} from "../../../../shared/input/Input.tsx";
import {Button} from "../../../../shared/button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {submit} from "../submitForm.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../app/store";
import * as React from "react";
import {useEffect} from "react";

export function LoginForm () {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {jwt, loginErrorMessage} = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate('/')
        }
    },[jwt, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        submit({ e, dispatch });
    };

    return (
        <>
            {loginErrorMessage && <div style={{color: 'white', backgroundColor:'#FE724C', borderRadius:'8px', padding:'15px'}}>Неверный логин или пароль</div>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label htmlFor='email'>
                        Ваш email
                    </label>
                    <Input id='email' name='email' placeholder='Email'/>
                </div>
                <div className={styles.field}>
                    <label htmlFor='password'>
                        Ваш пароль
                    </label>
                    <Input id='password' name='password' type='password' placeholder='Пароль'/>
                </div>
                <Button appearance='big' type='submit'>
                    Вход
                </Button>
            </form>
            <div className={styles.links}>
                Нет аккаунта ?
                <Link to='/auth/register' className={styles.registration}>
                    Зарегистрироваться
                </Link>
            </div>
        </>
    )
}