import bread from "../../public/bread.jpg";
import {StaticImageData} from "next/image";

export const urls = {
    home: "/home",
    blog: "/blog",
    cart: "/cart",
    pricing: "/pricing",
    contact: "/contact",
    products: "/products",
    checkout: "/checkout",
}

export const noImg = "https://via.placeholder.com/150"

export const breadImage = bread;

interface NavItemData {
    href: string;
    label: string;
    isActive?: boolean;
}

export type Slide = {
    image: StaticImageData;
    title: string;
}

export type boxContent = {
    title: string;
    description: string;
}



export const navItems: NavItemData[] = [
    { href: '/home', label: 'Home' },
    { href: '/cart', label: 'Cart' },
    { href: '/pricing', label: 'Pricing' },
];

export const siteTitle: string = "Bakery App";

export const slides: Slide[] = [
    { image: bread, title: '' },
    { image: bread, title: '' },
    { image: bread, title: '' },
]

export const boxContent: boxContent[] = [
    {
        title: "Fresh Ingredients",
        description: "We use only the freshest, high-quality ingredients to make our baked goods delicious and wholesome.",
    },
    {
        title: "Artisan Craftsmanship",
        description: "Our bakers are passionate about perfecting every recipe, bringing artisanal expertise to every loaf and pastry.",
    },
    {
        title: "Local and Organic",
        description: "We prioritize locally sourced and organic ingredients, supporting our community and creating healthier options.",
    },
    {
        title: "Handmade with Love",
        description: "Every item is handmade with love and care, bringing a touch of warmth and homestyle goodness to every bite.",
    },
];

type Product = {
    imageUrl: StaticImageData;
    productUrl: string;
    productName: string;
    productPrice: string;

}

export const products: Product[] = [
    { imageUrl: breadImage, productUrl: `${urls.products}/1`, productName: "Bread", productPrice: "12" },
    { imageUrl: breadImage, productUrl: `${urls.products}/2`, productName: "Bagel", productPrice: "8" },
    { imageUrl: breadImage, productUrl: `${urls.products}/3`, productName: "Croissant", productPrice: "10" },
    { imageUrl: breadImage, productUrl: `${urls.products}/4`, productName: "Baguette", productPrice: "15" },
];

