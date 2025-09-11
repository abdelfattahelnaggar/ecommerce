import axios from "axios";

export default async function AddToCart(productId: string, token: string) {
    // Client-side code needs NEXT_PUBLIC_ prefix or fallback
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;
             
    const { data } = await axios.post(`${API_BASE_URL}/cart`, {
        productId: productId,
    }, {
        headers: {
            token: token,
        },
    });
    return data;
}