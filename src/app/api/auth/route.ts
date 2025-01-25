import {signIn} from "@/app/api/auth/[...nextauth]/route";


export async function GET() {
    return signIn("keycloak");
}