import './style.css';
import { useParams } from 'react-router-dom';
import { useProductContext } from '../../contexts/ProductContext';
import ProductTitle from './components/ProductTitle';
import Location from './components/Location';
import Image from './components/Image';
import Description from './components/Description';
import Characteristic from './components/Characteristic';
import { Helmet } from 'react-helmet-async';
import Calendar from './components/Calendar';
import Map from './components/Map';
import Policy from './components/Policy';
import { useEffect } from 'react';
import api from '../../services/api';

const Product = () => {
    const { productId } = useParams();

    const { product, setProduct } = useProductContext();

    useEffect(() => {
        api(`/product/${productId}`).then((response) => {
            localStorage.setItem('product', JSON.stringify(response.data));
            setProduct(response.data);
        }).catch((error) => {
            console.error(error)
        });
        }, [setProduct, productId]);

    return (
        <>
            <Helmet>
                <title>{`${product.name ? product.name : ""}`}</title>
            </Helmet>
            <ProductTitle />
            <Location />
            <Image />
            <Description />
            <Characteristic />
            <Calendar />
            <Map />
            <Policy />
        </>
    );
};

export default Product;