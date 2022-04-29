import './style.css';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useMediaQuery } from 'react-responsive';
import "react-datepicker/dist/react-datepicker.css";
import { useProductContext } from '../../../../contexts/ProductContext';
import { useDateRangeContext } from '../../../../contexts/DateRangeContext';
import Swal from "sweetalert2";

const CalendarAvailability2 = () => {

    const { product } = useProductContext();

    const { setDateReservation } = useDateRangeContext();

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const mediaQuery = useMediaQuery({ minWidth: 750 });

    const selectedDates = [];

    let dateInterval = new Date(startDate);

    while (dateInterval < endDate) {

        dateInterval.setDate(dateInterval.getDate() + 1);

        let resultOfDates = dateInterval.toLocaleDateString();

        selectedDates.push(resultOfDates, startDate.toLocaleDateString());
    }

    const confirmedReservations = [];

    for (let i = 0; i < product.reservations.length; i++) {

        let entryDate = new Date(product.reservations[i].startDate)
        let exitDate = new Date(product.reservations[i].endDate)

        let reservationInterval = new Date(entryDate);

        while (reservationInterval <= exitDate) {

            reservationInterval.setDate(reservationInterval.getDate() + 1);

            let resultOfIntervals = reservationInterval.toLocaleDateString();

            confirmedReservations.push(resultOfIntervals);
        }
    }

    for (let i = 0; i < selectedDates.length; i++) {

        confirmedReservations.includes(selectedDates[i])

        if (confirmedReservations.includes(selectedDates[i])) {
            Swal.fire({
                icon: 'error',
                title: 'Ops!',
                text: 'Por favor, escolha datas disponíveis no calendário',
                confirmButtonColor: 'var(--primary-color)',
                imageWidth: 100,
                width: 400,
            })

            setDateRange("");
            setDateReservation("");
        }
    }

    function reserveDate(product) {

        const reservationsDate = [];

        for (let i = 0; i < product.reservations?.length; i++) {

            let entryDate = new Date(product.reservations[i].startDate)
            let exitDate = new Date(product.reservations[i].endDate)

            let dates = [
                {
                    start: entryDate.setDate(entryDate.getDate()),
                    end: exitDate.setDate(exitDate.getDate() + 1),
                }
            ]
            reservationsDate.push(dates);
        }
        return reservationsDate
   }

    const productReservations = (reserveDate(product)).flat()

    return (
        <div className="calendar2">
            <DatePicker
                selectsRange={true}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                startDate={startDate}
                endDate={endDate}
                monthsShown={mediaQuery ? 2 : 1}
                onChange={(update) => {
                    setDateRange(update);
                    setDateReservation(update)
                }}
                locale="ptBr"
                inline
               excludeDateIntervals={productReservations}
            />
        </div>
    )
}

export default CalendarAvailability2;