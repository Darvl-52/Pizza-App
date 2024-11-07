import {Product} from "../../shared/api/api.ts";
import {Await, useLoaderData} from "react-router-dom";
import {Suspense} from "react";
import {Loader} from "../../shared/loader/Loader.tsx";

export function ProductPage () {
    const data = useLoaderData() as {data : Product};

    return (
        <Suspense fallback={<Loader/>}>
            <Await resolve={data.data}>
                {({data}: {data : Product}) => (
                    <div>Product - {data.name}</div>
                )}
            </Await>
        </Suspense>
    )
}