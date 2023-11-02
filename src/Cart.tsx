import { ICart } from "./types/cart";
import { BsCartFill } from 'react-icons/bs'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Cart({ cart }: { cart: ICart }) {
    const showCart = () => {
        return Object.keys(cart).map((pId, index) => (
            <p key={index}>
                {cart[pId].name} x{cart[pId].qty}
            </p>
        ));
    };
    const createInputTags = () => {
        return Object.keys(cart).map((pId, index) => (
            <input hidden key={`input${index}`} name={cart[pId].default_price} value={cart[pId].qty}/>
        ));
    };

    return (
        <div>
            <h2>My Cart <BsCartFill/>:</h2>
            <div className="container">{showCart()}</div>
            {
                Object.keys(cart).length !== 0
                    ?
                    <form action={BACKEND_URL + "/api/checkout"} method="POST">
                        {createInputTags()}
                        <button type="submit">Check Out</button>
                    </form>
                    :
                    <></>}
        </div>
    );
}
