import './style.css';
import CalendarAvailability from '../../../../components/CalendarAvailability';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../../../contexts/ProductContext';
import { useUserContext } from '../../../../contexts/UserContext';

const Calendar = () => {

    const { product } = useProductContext();

    const { user } = useUserContext();

    return (
        <div className="availableDates">
            <h2>Datas disponíveis</h2>
            <div className="calendarSelection">
                <CalendarAvailability />
                <div className="selection">
                    <p>Adicione as datas da sua viagem para obter preços exatos</p>
                    <Link to={user ? `/produto/${product.id}/reserva` : '/login-obrigatorio'}><button>Iniciar reserva</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Calendar;