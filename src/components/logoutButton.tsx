import { signOut } from "next-auth/react";

export default function LogoutButton() {
    const handleLogout = async () => {
        await signOut();
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}
        >
            Logout
        </button>
    );
}
