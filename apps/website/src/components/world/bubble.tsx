import * as React from "react";
import { SVGProps } from "react";

const SvgBubble = (props: SVGProps<SVGSVGElement>) => (
    <svg width={557} height={330} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M0 16C0 7.163 7.163 0 16 0h525c8.837 0 16 7.163 16 16v255c0 8.837-7.163 16-16 16h-27.25c-8.837 0-16 7.163-16 16v10.824c0 13.483-15.654 20.921-26.107 12.404l-43.729-35.632A16.002 16.002 0 0 0 417.807 287H16c-8.837 0-16-7.163-16-16V16Z"
            fill="#fff"
        />
    </svg>
);

export default SvgBubble;

