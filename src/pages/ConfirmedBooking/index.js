import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ConfirmedBooking = () => {

    return (
        <div id='confirmedWrapper'>
        <div id='confirmedBooking'>
            <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
            <h3>Muito obrigado!</h3>
            <h5>Sua reserva foi feita com sucesso</h5>
            <Link to={'/'}><button className='confirmBtn'>Ok</button></Link>
        </div>
        </div>
    )
}

export default ConfirmedBooking;