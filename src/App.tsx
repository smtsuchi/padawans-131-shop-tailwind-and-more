import { child, get, getDatabase, ref, set } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import Cart from "./Cart";
import Shop from "./Shop";
import WelcomeBar from "./WelcomeBar";
import { AuthContext } from "./context/AuthProvider";
import { ICart } from "./types/cart";
import { IProduct } from "./types/product";
import { IUser } from "./types/user";
import toast, { Toaster } from 'react-hot-toast';

const STRIPE_KEY = import.meta.env.VITE_STRIPE_API_KEY;

export default function App() {
    const { user } = useContext(AuthContext)!;
    const [products, setProducts] = useState<IProduct[] | undefined>(undefined);
    const [cart, setCart] = useState<ICart>({});

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
    
        if (query.get("payment")=='success') {
          toast.success("Order placed! You will receive an email confirmation.");
          setCart({})
          updateCartDB({})
        }
    
        else if (query.get("payment")=='cancelled') {
          toast.error("Order canceled -- continue to shop around and checkout when you're ready.");
        }
      }, []);

    const getProducts = async () => {
        const url = "https://api.stripe.com/v1/products";
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${STRIPE_KEY}`,
            },
        };
        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data);
        setProducts(data.data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (user) {
            getCartFromDB(user);
        }
    }, [user]);

    const updateCartDB = async (cart: ICart) => {
        const db = getDatabase();
        set(ref(db, `/cart/${user?.uid}`), cart);
    };

    const addToCart = (item: IProduct) => {
        const copy = { ...cart } as ICart;
        if (item.id in copy) {
            copy[item.id].qty += 1;
        } else {
            copy[item.id] = { ...item, qty: 0 };
            copy[item.id].qty = 1;
        }
        toast.success(`Added ${item.name} to your cart.`)
        setCart(copy);
        if (user) {
            updateCartDB(copy);
        }
    };

    const getCartFromDB = async (user: IUser) => {
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, `/cart/${user?.uid}`));
        if (snapshot.exists()) {
            setCart(snapshot.val());
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Toaster />

            <WelcomeBar />

            <Shop products={products} addToCart={addToCart} />

            <Cart cart={cart} />
        </div>
    );
}
