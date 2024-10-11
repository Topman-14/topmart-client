import qs from "query-string";
import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    billboardId?: string;
    isFeatured?: boolean
}

const getProducts = async (query: Query): Promise<Product[]> => {

    const url = qs.stringifyUrl({
        url: URL,
        query: {
            colorId: query.colorId,
            sizeId: query.sizeId,
            categoryId: query.categoryId,
            isFeatured: query.isFeatured,
            billboardId: query.billboardId
        }
    })
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export default getProducts;