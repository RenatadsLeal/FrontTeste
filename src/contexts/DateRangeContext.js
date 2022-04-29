import { createContext, useContext, useState } from "react";

const DateReservationContext = createContext();

export default function DateReservationProvider({ children }) {

    const [dateReservation, setDateReservation] = useState([]);

    return <DateReservationContext.Provider value={{ dateReservation, setDateReservation }}>{children}</DateReservationContext.Provider>;
}

export function useDateRangeContext() {

    const { dateReservation, setDateReservation } = useContext(DateReservationContext);

    return { dateReservation, setDateReservation };
}