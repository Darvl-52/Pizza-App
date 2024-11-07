import styles from './cartCard.module.css';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import * as React from "react";
import {cartAction} from "../../features/cart/cart.slice.ts";

export function CartCard
({
    id,
    name,
    image,
    price,
    count
 } :
     {
         id: number;
         name: string;
         image: string;
         price: number;
         count: number;
         key: React.Key;
     }) {

    const dispatch = useDispatch<AppDispatch>();

    const increase = () => {
        dispatch(cartAction.add(id));
    }

    const remove = () => {
        dispatch(cartAction.remove(id));
    }

    const clear = () => {
        dispatch(cartAction.delete(id));
    }

    return (
        <div className={styles.item}>
                <div className={styles.image} style={{backgroundImage: `url('${image}')`, backgroundRepeat: 'no-repeat'}}></div>
                <div className={styles.description}>
                    <p className={styles.name}>{name}</p>
                    <div className={styles.price}>{price}&nbsp; ₽</div>
                </div>
            <div className={styles.actions}>
                <button className={styles.minus} onClick={remove}>
                    <img src="/minus.svg" alt="Удалить из корзины" width='17' height='17' loading='lazy'/>
                </button>
                <p className={styles.number}>{count}</p>
                <button className={styles.plus} onClick={increase}>
                    <img src="/plus.svg" alt="Добавить в корзину" width='17' height='17' loading='lazy'/>
                </button>
                <button className={styles.remove} onClick={clear}>
                    <img src="/close.svg" alt="Удалить товар" width='17' height='17' loading='lazy'/>
                </button>
            </div>
        </div>
    )
}