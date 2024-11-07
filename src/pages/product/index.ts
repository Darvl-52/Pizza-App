import {lazy} from "react";

export const ProductPage = lazy(() => import('./Product').then(module => ({default: module.ProductPage})));