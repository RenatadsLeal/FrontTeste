import './style.css';
import { useUserContext } from '../../contexts/UserContext';
import Rating from '../../components/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faSink, faSnowflake, faCar, faWifi, faPaw, faTv, faPersonSwimming } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { createBrowserHistory } from "history";
import { Helmet } from 'react-helmet-async';

const MyReservations = () => {

    const { user } = useUserContext();

    const history = createBrowserHistory();

    const reservations = useAxios(`/reservation/user/${user.id}`);

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
                <title>Minhas Reservas</title>
            </Helmet>
            <div id="productTitle">

                <button onClick={() => history.goBack()} id="previousButton">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <div id="informationsTitle">
                    <h3>Minhas Reservas</h3>
                </div>
            </div>
            <div id="reservations">

                <div id="recommendationsList">

                    {reservations.map(reservation =>

                        <div key={reservation.product.id} id={`recommendation${reservation.product.id}`} className="recommendation">

                            <img src={reservation.product.images[0]?.original} alt="" />

                            <div className="recommendationInfo">
                                <div className='productInfo'>
                                    <div>
                                        <div className="recommendationTitle">
                                            <p>{reservation.product.category.title}</p>
                                            <Rating />
                                        </div>

                                        <h4>{reservation.product.name}</h4>
                                    </div>

                                    <div className="grade">
                                        <h6>8</h6>
                                        <p>Muito bom</p>
                                    </div>
                                </div>

                                <div className="location">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    <p>{reservation.product.city?.country}, {reservation.product.city.name} </p>
                                </div>

                                <div className="characteristics">
                                    {reservation.product.characteristics?.map(({ id, url }) =>
                                        <div key={id}>
                                            <div className='characteristic'><FontAwesomeIcon className="charIcons" icon={convert(url)} size="lg" /></div>
                                        </div>)
                                    }
                                </div>
                                <div id='reservationDetails'>
                                    <div className='reservationTimeDetails'><h6>Check-in</h6><p>: {(new Date(reservation.startDate)).toLocaleDateString('pt-BR')}</p></div>
                                    <div className='reservationTimeDetails'><h6>Check-out</h6><p>: {(new Date(reservation.endDate)).toLocaleDateString('pt-BR')}</p></div>
                                    <div className='reservationTimeDetails'><h6>Hora da chegada</h6><p>: {reservation.entryTime}:00 hora(s)</p></div>
                                </div>
                                <Link to={`/produto/${reservation.product.id}`}><button>Ver detalhes</button></Link>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default MyReservations;