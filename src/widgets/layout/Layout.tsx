import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {Container} from "../../shared/container/Container.tsx";
import styles from './layout.module.css';
import {Button} from "../../shared/button/Button.tsx";
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {getProfile, userActions} from "../../features/user/user.slice.ts";
import {useEffect} from "react";
import {Loader} from "../../shared/loader/Loader.tsx";

export function Layout () {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((s: RootState) => s.cart.items);
    const profile = useSelector((s: RootState) => s.user.profile);

    const logout = () => {
        dispatch(userActions.logout());
        navigate('/auth/login');
    }

    useEffect(  () => {
        dispatch(getProfile());
    }, [dispatch]);

    if (!profile) {
        return <Loader/>
    }

    return (
        <>
                <div className={styles.layout}>
                        <div className={styles.sidebar}>
                            <div className={styles.user}>
                                <img src="/avatar.jpg" alt="Аватарка пользователя" width='112' height='120' style={{borderRadius:'50%'}} loading='lazy'/>
                                <div className={styles.name}>{profile.name}</div>
                                <div className={styles.email}>{profile.email}</div>
                            </div>
                            <div className={styles.menu}>

                                <NavLink to='/' className={({isActive}) => cn(styles.link, {
                                    [styles.active]: isActive
                                })}>
                                    <img src="/menu.svg" alt="Иконка меню" loading='lazy'/>
                                    Меню
                                </NavLink>

                                <NavLink to='/cart' className={({isActive}) => cn(styles.link, {
                                    [styles.active]: isActive
                                })}>
                                    <img src="/cart.svg" alt="Иконка корзины" loading='lazy'/>
                                    Корзина <span className={styles['cart-count']}>{items.reduce((acc, item) => acc += item.count, 0)}</span>
                                </NavLink>

                            </div>
                            <Button className={styles.exit} onClick={logout}>
                                <img src="/exit.svg" alt="Иконка выйти" loading='lazy'/>
                                Выйти
                            </Button>
                        </div>
                    <main>
                        <Container>
                            <Outlet/>
                        </Container>
                    </main>
                </div>
        </>
    )
}