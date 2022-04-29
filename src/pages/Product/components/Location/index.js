import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useProductContext } from '../../../../contexts/ProductContext';
import Rating from '../../../../components/Rating'

const Location = () => {

    const { product } = useProductContext();

    return (
        <div id="locationProduct">
            <div id="locationInfo">
                <FontAwesomeIcon icon={faLocationDot} />

                <div id="adress">
                    <p>{ product.city?.name }, { product.city?.country }</p>
                    <p>Cidade de { product.city?.name }</p>
                    <p>{ product.address }</p>
                </div>
            </div>

            <div id="ratingInfo">
                <div className="rating">
                    <p>Muito bom</p>
                    <Rating />
                </div> 

                <div id="grade">
                    <h5>8</h5>
                </div>

            </div>
        </div>
    );
};

export default Location;