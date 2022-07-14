/** @jsxImportSource react */
import { FC, lazy, Suspense } from "react";

export const World: FC = () => {
    const WorldImpl = lazy(() => import("./world"));
    return (
        <>
            <p>Hello from react</p>
            <Suspense fallback={<p>loading</p>}>
                <WorldImpl />
            </Suspense>
        </>
    );
};
