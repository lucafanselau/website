/** @jsxImportSource react */
import { FC, lazy, Suspense } from "react";

export const World: FC = () => {
    const WorldImpl = lazy(() => import("./world"));
    return (
        <>
            <Suspense fallback={<p>loading</p>}>
                <WorldImpl />
            </Suspense>
        </>
    );
};
