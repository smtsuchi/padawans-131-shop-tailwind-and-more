import { IProduct } from "./types/product";

function ProductCard({ product, addToCart }: { product: IProduct; addToCart: (item: IProduct) => void }) {
    return (
        <div className="w-96 max-h-96 bg-neutral-600 mx-auto rounded-md">
            <img src={product.images[0]} alt={product.name} className="object-contain block max-w-full" />
            <button
                onClick={() => {
                    addToCart(product);
                }}
            >
                +
            </button>
        </div>
    );
}

export default function Shop({ products, addToCart }: { products?: IProduct[]; addToCart: (item: IProduct) => void }) {
    return (
        <div>
            <h1>Products:</h1>
            <div className="flex flex-wrap gap-6">
                {products && products.map((p) => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
            </div>
        </div>
    );
}
