import style from "../../auth/ui/loginForm.module.css";
import {Input} from "../../../../shared/input/Input.tsx";
import {Button} from "../../../../shared/button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {sendForm} from "../submitForm.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../app/store";
import {useEffect} from "react";
import * as React from "react";

export function RegisterForm () {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {jwt, registerErrorMessage} = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate('/')
        }
    },[jwt, navigate]);

    const handelSubmit = (e: React.FormEvent) => {
        sendForm({e, dispatch});
    }

    return (
        <>
            {registerErrorMessage && <div style={{color: 'white', backgroundColor:'#FE724C', borderRadius:'8px', padding:'15px'}}>{registerErrorMessage}</div>}
            <form className={style.form} onSubmit={handelSubmit}>
                <div className={style.field}>
                    <label htmlFor='email'>
                        Ваш email
                    </label>
                    <Input id='email' name='email' placeholder='Email'/>
                </div>
                <div className={style.field}>
                    <label htmlFor='password'>
                        Ваш пароль
                    </label>
                    <Input id='password' name='password' type='password' placeholder='Пароль'/>
                </div>
                <div className={style.field}>
                    <label htmlFor='password'>
                        Ваше Имя
                    </label>
                    <Input id='name' name='name' type='text' placeholder='Имя'/>
                </div>
                <Button appearance='big' type='submit'>
                    Зарегистрироваться
                </Button>
            </form>
            <div className={style.links}>
                Есть аккаунт ?
                <Link to='/auth/login' className={style.registration}>
                    Войти
                </Link>
            </div>
        </>
    )
}