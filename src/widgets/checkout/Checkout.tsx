import styles from './checkout.module.css';
import {PREFIX, Product} from "../../shared/api/api.ts";
import {AppDispatch, RootState} from "../../app/store";
import {Button} from "../../shared/button/Button.tsx";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {cartAction} from "../../features/cart/cart.slice.ts";

const DELIVERY_FEE = 169;

export function Checkout
({
    items,
    cartProducts,
}: {
    items: RootState;
    cartProducts: Product[];
})
{
    const total =
        items.map(item => {
            const product = cartProducts.find(p => p.id === item.id);
            if (!product) {
                return 0;
            }
            return item.count * product.price;
        }).reduce((acc, i) => acc += i, 0);

    const jwt = useSelector((s:RootState) => s.user.jwt);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const checkout = async () => {
        await axios.post(`${PREFIX}/order`, {
            products: items
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch(cartAction.clean());
        navigate('/success');
    };

    return (
        <>
            {items.length >= 1
                ? <>
                    <div className={styles.line}>
                        <div className={styles.text}>Итог</div>
                        <div className={styles.price}>{total}&nbsp;<span>₽</span></div>
                    </div>
                    <hr className={styles.hr}/>
                    <div className={styles.line}>
                        <div>Доставка</div>
                        <div className={styles.price}>{DELIVERY_FEE}&nbsp;<span>₽</span></div>
                    </div>
                    <hr className={styles.hr}/>
                    <div className={styles.line}>
                        <div className={styles.text}>Итог <span className={styles.total}>({items.length})</span></div>
                        <div className={styles.price}>{total + DELIVERY_FEE}&nbsp;<span>₽</span></div>
                    </div>
                    <div className={styles.checkout}>
                        <Button appearance='big' onClick={checkout}>
                            Оформить
                        </Button>
                    </div>
                </>
                : <div>Корзина пуста :(</div>
            }
        </>
    )
}