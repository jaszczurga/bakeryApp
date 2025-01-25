import { auth } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import React from "react";
import {AdminControls} from "@/components/admin/adminControls";


export default async function Admin() {
    const session = await auth();

    if (!session || session?.user?.role !== "admin") {
        redirect("/");
    }

    return (
        <div className={"mt-9 mx-24"}>
            <AdminControls/>
        </div>
    );
}
