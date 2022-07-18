/** @jsxImportSource react */
import { FC, lazy, Suspense } from "react";
const WorldImpl = lazy(() => import("./world"));

export const World: FC = () => {
    return (
        <div className="fixed left-0 top-0 w-full h-full box-content -z-10">
            <Suspense fallback={<p>loading</p>}>
                <WorldImpl />
            </Suspense>
        </div>
    );
};
