import {OrdersList} from "@/components/orders/orders";
import {auth} from "@/app/api/auth/[...nextauth]/route";


export default async function Orders(){

    const session = await auth();

    return(
        <div className={"mt-9 mx-24"}>
            <OrdersList email={session?.user?.email || ""}/>
        </div>
    )
}