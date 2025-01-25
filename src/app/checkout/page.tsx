import {CheckoutForm} from "@/components/checkoutForm/checkoutForm";
import {auth} from "@/app/api/auth/[...nextauth]/route";

export default async function Checkout(){
    const session = await auth();

    return(
        <div className={"mt-9"}>
            <CheckoutForm userEmail={session?.user?.email || ""}/>
        </div>
    )
}