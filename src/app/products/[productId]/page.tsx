import {Metadata} from "next";

type Props = {
    params: {
        productId: string
    }
}
export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const title = await new Promise<string>(resolve => {
        setTimeout(() => {
            resolve(`Iphone ${params.productId}`)
        }, 200)
    })
    return {
        title: `Product ${title}`
    }
}
export default function ProductDetail({params}: {
    params: {productId: string}
}) {
    return (<>
        <h1>Product {params.productId}</h1>
    </>);
}