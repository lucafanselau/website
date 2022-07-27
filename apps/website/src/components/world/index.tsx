/** @jsxImportSource react */
import { FC, lazy, ReactNode, Suspense } from "react";
const WorldImpl = lazy(() => import("./world"));

export const World: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        /* <div className="absolute left-0 top-0 w-full h-full -z-10">
         *     <div className="sticky left-0 top-0 w-full aspect-square box-content"> */
        <div className="w-full h-full">
            <Suspense fallback={<p>loading</p>}>
                <WorldImpl>{children}</WorldImpl>
            </Suspense>
        </div>
        /* </div>
    </div> */
    );
};
