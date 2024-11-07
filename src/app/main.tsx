import {StrictMode, Suspense} from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './normalize.css';
import { Menu } from '../pages/menu/Menu.tsx';
import {createBrowserRouter, defer, RouterProvider} from "react-router-dom";
import { Layout } from "../widgets/layout/Layout.tsx";
import axios from "axios";
import { PREFIX } from "../shared/api/api.ts";
import { Loader } from "../shared/loader/Loader.tsx";
import { CartPage } from "../pages/cart";
import { ProductPage } from "../pages/product";
import { AuthLayout } from "../widgets/authLayout/AuthLayout.tsx";
import { Login } from "../pages/login/Login.tsx";
import { Register } from "../pages/register/Register.tsx";
import {RequireAuth} from "../features/requireAuth/RequireAuth.tsx";
import {Provider} from "react-redux";
import {store} from "./store";
import {Success} from "../pages/success/Success.tsx";

const router = createBrowserRouter([
    {
        path:'/',
        element:<RequireAuth><Layout/></RequireAuth>,
        errorElement: <div>Error</div>,
        children: [
            {
                path:'/',
                element:<Menu/>
            },
            {
                path: '/success',
                element: <Success/>
            },
            {
                path: '/cart',
                element: <Suspense fallback={<Loader/>}> <CartPage/> </Suspense>
            },
            {
                path: '/product/:id',
                element: <Suspense fallback={<Loader/>}> <ProductPage/> </Suspense>,
                loader: async ({ params }) => {
                    return defer({
                        data: await axios.get(`${PREFIX}/products/${params.id}`).then(data => data)
                    });
                }
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
              path: 'login',
              element: <Login/>,
            },
            {
                path: 'register',
                element: <Register/>
            },
        ]
    },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  </StrictMode>,
)
