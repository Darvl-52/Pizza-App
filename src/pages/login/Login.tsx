import styles from './login.module.css';
import {Title} from "../../shared/title/Title.tsx";
import {LoginForm} from "../../features/user/auth/ui/LoginForm.tsx";

export function Login () {

    return (
        <div className={styles.login}>
            <Title>Вход</Title>
            <LoginForm/>
        </div>
    )
}