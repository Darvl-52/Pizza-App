import styles from './productCardList.module.css';
import {ProductCard} from "../productCard/ProductCard.tsx";
import {useEffect, useState} from "react";
import {getMenu, Product} from "../../shared/api/api.ts";
import {Loader} from "../../shared/loader/Loader.tsx";
import {Search} from "../../shared/search/Search.tsx";
import * as React from 'react'

export function ProductCardList () {

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>();

    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            const data = await getMenu(filter);

            setProducts(data);
            setIsLoading(false);
        };

        fetchData();
    },[filter]);

    const updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }

    return (
        <>
            <Search placeholder='Введите блюдо или состав' onChange={updateFilter}/>
        <div className={styles.list}>
            {!isLoading && products.length > 0 && products.map(product =>
                <ProductCard
                    key={product.id}
                    id={product.id}
                    price={product.price}
                    title={product.name}
                    description={product.ingredients.join(', ')}
                    image={product.image}
                    rating={product.rating}/>
            )}
            {!isLoading && products.length === 0 && <div>Таких товаров нет :(</div>}
            {isLoading && <Loader/>}
        </div>
        </>
    )
}