import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { ReactNode, createContext, useState } from "react";
import { IUser } from "../types/user";

export interface IAuthContext {
    children: ReactNode;
}

export interface AuthContextValues {
    getUser: () => void;
    user?: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
    createPopup: () => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValues | undefined>(undefined);

export const AuthProvider = ({ children }: IAuthContext) => {
    const getUser = () => {
        const foundUser = localStorage.getItem("shop_user");
        if (foundUser) {
            return JSON.parse(foundUser);
        } else {
            return;
        }
    };

    const [user, setUser] = useState<IUser | undefined>(getUser);

    const createPopup = async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user);
        const localUser: IUser = {
            imgUrl: user.photoURL ?? "https://picsum.photos/32/32",
            displayName: user.displayName ?? "user",
            uid: user.uid,
        };
        setUser(localUser);
        // TODO CREATE DATA CONTEXT
        // getCartFromDB(localUser);
        localStorage.setItem("shop_user", JSON.stringify(localUser));
    };

    const logout = () => {
        setUser(undefined);
        localStorage.removeItem("shop_user");
        // TODO data context
        // setCart({});
    };

    const value = {
        getUser,
        user,
        setUser,
        createPopup,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
