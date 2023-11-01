import { ICart } from "./types/cart";

export default function Cart({ cart }: { cart: ICart }) {
    const showCart = () => {
        return Object.keys(cart).map((pId, index) => (
            <p key={index}>
                {cart[pId].name} x{cart[pId].qty}
            </p>
        ));
    };

    return (
        <div>
            <h2>My Cart:</h2>
            <div className="container">{showCart()}</div>
            {Object.keys(cart).length !== 0 ? <button>Check Out</button> : <></>}
        </div>
    );
}
