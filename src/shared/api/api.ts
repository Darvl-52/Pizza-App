import axios from "axios";

export const PREFIX = 'https://purpleschool.ru/pizza-api-demo';

export interface Product {
    id: number;
    name: string;
    price: number;
    ingredients: string[];
    image: string;
    rating: number;
}

export const getMenu = async (name?: string | undefined) => {
    try {
        const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
            params: {name}
        });
        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
}