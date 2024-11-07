import {Button} from "../../shared/button/Button.tsx";
import {useNavigate} from "react-router-dom";
import styles from './success.module.css';

export function Success () {
    const navigate = useNavigate();

    return (
        <div className={styles.success}>
            <img src="/pizza.jpg" alt="Картинка пиццы" width='626' height='626'/>
            <h1 className={styles.text}>Ваш заказ успешно оформлен !</h1>
            <Button appearance='big' onClick={() => navigate('/')}>
                Сделать новый
            </Button>
        </div>
    )
}