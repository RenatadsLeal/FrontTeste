import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ConfirmedNewProduct = () => {

    return (
        <div id='confirmedNewProductWrapper'>
        <div id='confirmedNewProduct'>
            <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
            <h3>Muito obrigado!</h3>
            <h5>Seu produto foi criado com sucesso</h5>
            <Link to={'/'}><button className='confirmBtn'>Ok</button></Link>
        </div>
        </div>
    )
}

export default ConfirmedNewProduct;