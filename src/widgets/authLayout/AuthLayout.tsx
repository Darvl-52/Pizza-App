import {Outlet} from "react-router-dom";
import {Container} from "../../shared/container/Container.tsx";
import styles from './authLayout.module.css';

export function AuthLayout () {
    return (
        <>
            <div className={styles.layout}>
                <div className={styles.logo}>
                    <img src="/Logo.jpg" alt="Логотип компании" width='564' height='564'/>
                </div>
                    <Container className={styles.content}>
                        <Outlet/>
                    </Container>
            </div>
        </>
    )
}