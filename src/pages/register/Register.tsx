import {Title} from "../../shared/title/Title.tsx";
import {RegisterForm} from "../../features/user/registrations/ui/RegisterForm.tsx";
import style from './register.module.css';

export function Register () {

    return (
        <div className={style.register}>
            <Title>Регистрация</Title>
            <RegisterForm/>
        </div>
    )
}