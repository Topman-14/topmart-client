export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
}

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
    billboardId?: string;
}
export interface Product {
    id: string;
    name: string;
    quantity: number;
    category: Category;
    price: string;
    isFeatured: boolean;
    size: Size;
    color: Color;
    images: Image[];
    description?: string;
    stock?: number;
}

export interface Image {
    id: string;
    url: string;
}
export interface Size {
    id: string;
    name: string;
    value: string;
}
export interface Color {
    id: string;
    name: string;
    value: string;
}