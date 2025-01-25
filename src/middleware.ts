import {auth} from "@/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";


export default auth((req) => {
    console.log("auth middleware")
    if (!req.auth && req.nextUrl.pathname !== "/api/auth") {
        const newUrl = new URL("/api/auth", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
    return NextResponse.next();
})

export const config = {
    matcher: ["/checkout", "/orders"],
}
