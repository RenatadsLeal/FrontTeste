import { createContext, useContext, useState } from "react";

const CheckinTimeContext = createContext();

export default function CheckinTimeProvider({ children }) {

    const [checkinTime, setCheckinTime] = useState('');

    return <CheckinTimeContext.Provider value={{ checkinTime, setCheckinTime }}>{children}</CheckinTimeContext.Provider>;
}

export function useCheckinTimeContext() {

    const { checkinTime, setCheckinTime } = useContext(CheckinTimeContext);

    return { checkinTime, setCheckinTime };
}