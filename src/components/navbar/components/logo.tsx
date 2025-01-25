import {siteTitle} from "@/lib/constants";
import React from "react";
import Link from "next/link";


export const Logo = () => {
    return (
        <Link href="/home" className="flex items-center space-x-3">
            <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" className="h-8">
                <circle cx="16" cy="16" r="14" fill="red"/>
            </svg>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-textColor">{siteTitle}</span>
        </Link>
    )
}