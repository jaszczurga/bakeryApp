import {ProductPage} from "@/components/admin/product/product";
import {Suspense} from "react";
import Spinner from "@/components/spinner";

export default async function Page({params}: {params: Promise<{productId: string}>}) {
    const { productId } = await params;
    return (
        <div className={"mx-4 md:mx-24 my-24"}>
                <Suspense fallback={<Spinner/>}>
                    <ProductPage productId={productId}/>
                </Suspense>
        </div>
    );
}
