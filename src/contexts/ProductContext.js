import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export default function ProductProvider({children}) {
    const storage = JSON.parse(localStorage.getItem('product'));
    const [ product, setProduct ] = useState(storage ? storage : []);

    return <ProductContext.Provider value={{ product, setProduct }}>{children}</ProductContext.Provider>;
};

export function useProductContext() {
    const context = useContext(ProductContext);

    const { product, setProduct } = context;

    return { product, setProduct };
};