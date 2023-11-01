import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";

export default function WelcomeBar() {
    const { user, createPopup, logout } = useContext(AuthContext)!;
    return (
        <header className="flex items-center justify-between h-16 bg-neutral-800 px-4">
            <ul className="flex gap-4">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/">Shop</a>
                </li>
            </ul>
            <div>
                {user ? (
                    <>
                        <a href="/cart">Cart</a>
                        <h1>Hello, {user.displayName}</h1>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <button
                        onClick={createPopup}
                        className="px-4 py-2 bg-emerald-400 rounded-sm text-black font-bold hover:bg-emerald-300 transition-colors active:scale-[99%]"
                    >
                        Log In With Google
                    </button>
                )}
            </div>
        </header>
    );
}
