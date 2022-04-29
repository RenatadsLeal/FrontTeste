import './style.css';
import { useProductContext } from '../../contexts/ProductContext';
import ProductTitle from '../Product/components/ProductTitle';
import { Helmet } from 'react-helmet-async';
import PersonalData from './components/PersonalData';
import CalendarAvailability2 from './components/CalendarAvailability2';
import Details from './components/Details';
import Policy from '../Product/components/Policy';
import CheckinTime from './components/CheckinTime';

const Booking = () => {

    const { product } = useProductContext();


    return (
        <>
            <Helmet>
                <title>{`${product.name} | Reserva`}</title>
            </Helmet>
            <ProductTitle />
            <div id="bookingContainer">
            <div id='bookingWrapper'>
                <h4 id='bookingWrapperTitle'>Complete seus dados</h4>


                <div id="bookingInfo">
                    <div id="leftColumn">
                        <PersonalData />

                        <div>
                            <h4>Selecione sua data de reserva</h4>
                            <div id="calendarAvailabilityBooking">
                                <CalendarAvailability2 />
                            </div>
                        </div>

                        <CheckinTime />
                    </div>

                    <Details />
                </div>

                <Policy />
            </div>
            </div>
        </>
    );
}

export default Booking;