import Link from "next/link";

export default function ProductList() {
    const productId = 100
    return (<>
        <Link href={"/"}>Home</Link>
        <h1>Product</h1>
        <h2><Link href={'/products/1'}>Product 1</Link> </h2>
        <h2>Product 2</h2>
        <h2><Link href={`/products/${productId}`}>Product {productId}</Link></h2>

    </>);
}