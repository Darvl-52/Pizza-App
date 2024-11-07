import styles from './productCard.module.css';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {cartAction} from "../../features/cart/cart.slice.ts";
import * as React from "react";

export function ProductCard
({
     id,
     price,
     title,
     description,
     image,
     rating,
 }:
     {
         id: number;
         price:number;
         title: string;
         description: string;
         image: string;
         rating: number;
         key: React.Key;
     }) {

    const dispatch = useDispatch<AppDispatch>();

    const add = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(cartAction.add(id));
    }

    return (
        <div className={styles.card}>
            <div className={styles.header} style={ {backgroundImage:`url('${image}')`, backgroundRepeat:'no-repeat'} }>
                <div className={styles.price}>
                    {price}&nbsp;
                    <span className={styles.currency}>₽</span>
                </div>
                <button className={styles['add-to-cart']} onClick={add}>
                    <img src="/basket.svg" alt="Иконка корзины" width='17' height='17' loading='lazy'/>
                </button>
                <div className={styles.rating}>
                    {rating}&nbsp;
                    <img src="/star.svg" alt="Иконка звезды" width='10' height='10' loading='lazy'/>
                </div>
            </div>
            <div className={styles.footer}>
                <Link to={`/product/${id}`} className={styles.title}>
                    {title}
                </Link>
                <p className={styles.description}>
                    {description}
                </p>
            </div>
        </div>
    )
}