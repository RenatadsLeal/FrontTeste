import './style.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faSink, faSnowflake, faCar, faWifi, faPaw, faTv, faPersonSwimming } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import Rating from '../../components/Rating';
import api from '../../services/api';

const Products = () => {

    const { productsBy, startDate, endDate, title } = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() => {

        if (productsBy && endDate)
            api.get(`/product/city/${productsBy}/${startDate}/${endDate}`)
                .then((response) => { setProducts(response.data) })
                .catch((error) => { console.error(error) })
        else if (productsBy)
            api.get(`/product/city/${productsBy}`)
                .then((response) => { setProducts(response.data) })
                .catch((error) => { console.error(error) })
        else if (endDate)
            api.get(`/product/dates/${startDate}/${endDate}`)
                .then((response) => { setProducts(response.data) })
                .catch((error) => { console.error(error) })
        else
            api.get(`/product/category/${title}`)
                .then((response) => { setProducts(response.data) })
                .catch((error) => { console.error(error) })
        return;
    }, [productsBy, startDate, endDate, title])

    const convert = (url) => {
        switch (url) {
            case 'faSink':
                return faSink;
            case 'faSnowflake':
                return faSnowflake;
            case 'faCar':
                return faCar;
            case 'faWifi':
                return faWifi;
            case 'faPaw':
                return faPaw;
            case 'faTv':
                return faTv;
            case 'faPersonSwimming':
                return faPersonSwimming;
            default:
                return "";
        }
    }

    return (
        <>
            <Helmet>
                <title>{productsBy || title}</title>
            </Helmet>
            <div id="productsTitle">
                <Link to="/">
                    <button id="homeButton">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                </Link>

                <div id="informationsTitle">
                    <h3>{productsBy || title || "Hospedagens disponíveis"}</h3>
                </div>
            </div>

            <div id="products">
                <div id="recommendationsList">

                    {products.map(product =>

                        <div key={product.id} id={`recommendation${product.id}`} className="recommendation">

                            <img src={product.images[0]?.original} alt="" width={300} height={310} />

                            <div className="recommendationInfo">
                                <div className='productInfo'>
                                    <div>
                                        <div className="recommendationTitle">
                                            <p>{product.category.title}</p>
                                            <Rating />
                                        </div>

                                        <h4>{product.name}</h4>
                                    </div>

                                    <div className="grade">
                                        <h6>8</h6>
                                        <p>Muito bom</p>
                                    </div>
                                </div>

                                <div className="location">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    <p>{product.city?.name}, {product.city?.country}</p>
                                </div>

                                <div className="characteristics">
                                    {product.characteristics?.map(({ id, url }) =>
                                        <div key={id}>
                                            <div className='characteristic'><FontAwesomeIcon className="charIcons" icon={convert(url)} size="lg" /></div>
                                        </div>)
                                    }
                                </div>

                                <p className="description">{product.description}</p>

                                <Link to={`/produto/${product.id}`}><button>Ver detalhes</button></Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Products;