import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSink, faSnowflake, faCar, faWifi, faPaw, faTv, faPersonSwimming } from '@fortawesome/free-solid-svg-icons';
import { useProductContext } from '../../../../contexts/ProductContext';

const Characteristic = () => {

    const { product } = useProductContext();

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
            <div id="charTitle">
                <h4>O que este lugar oferece?</h4>
            </div>
            
            <div id="characteristics">
                {product.characteristics?.map(({ id, url, name }) =>
                    <div key={id}>
                        <div className='characteristic'><FontAwesomeIcon className="charIcons" icon={convert(url)} size="lg" /><p>{name}</p></div>
                    </div>)
                }
            </div>
        </>
    );
};

export default Characteristic;