import {lazy} from "react";

export const CartPage = lazy(() => import('./Cart').then(module => ({default: module.Cart})));