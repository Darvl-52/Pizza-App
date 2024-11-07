import {Title} from "../../shared/title/Title.tsx";
import {CardCartList} from "../../widgets/cartCardList/CardCartList.tsx";
export function Cart () {
    return (
        <>
            <Title style={{marginBottom: '40px'}}>
                Корзина
            </Title>
            <CardCartList/>
        </>
    )
}