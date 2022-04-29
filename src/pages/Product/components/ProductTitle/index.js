import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { createBrowserHistory } from "history";
import { useProductContext } from '../../../../contexts/ProductContext';

const ProductTitle = () => {

    const { product } = useProductContext();

    const history = createBrowserHistory();

    return (
        <div id="productTitle">

            <button onClick={() => history.goBack()} id="previousButton">
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div id="informationsTitle">
                <p>{product.category?.title}</p>
                <h3>{product.name}</h3>
            </div>
        </div>
    );
};

export default ProductTitle;