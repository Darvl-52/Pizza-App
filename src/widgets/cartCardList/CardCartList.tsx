import {CartCard} from "../cartCard/CartCard.tsx";
import {useEffect, useState} from "react";
import {PREFIX, Product} from "../../shared/api/api.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import axios from "axios";
import {Checkout} from "../checkout/Checkout.tsx";

export type CartItem = {
    id: number;
    count: number;
}

export function CardCartList () {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items) as CartItem[];

    const getItem = async (id: number) => {
        const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`)
        return data
    }

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCartProducts(res);
    }

    useEffect(() => {
        loadAllItems();
    }, [items]);

    return (
        <>
            {items.map(item => {
                const product = cartProducts.find(p => p.id === item.id);
                if (!product) {
                    return null;
                }
                return (
                    <CartCard
                        id={product.id}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                        count={item.count}
                        key={item.id}
                    />
                )
            })}
            <Checkout items={items} cartProducts={cartProducts}/>
        </>
    )
}