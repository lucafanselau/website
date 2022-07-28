/** @jsxImportSource react */
import { FC, lazy, ReactNode, Suspense } from "react";
const WorldImpl = lazy(() => import("./world"));

export const World: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="w-full h-full">
            <Suspense fallback={<p>loading</p>}>
                <WorldImpl>{children}</WorldImpl>
            </Suspense>
        </div>
    );
};
