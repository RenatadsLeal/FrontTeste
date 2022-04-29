import { createContext, useContext, useState } from "react";

const UserCityContext = createContext();

export default function UserCityProvider({ children }) {

    const [userCity, setUserCity] = useState('');

    return <UserCityContext.Provider value={{ userCity, setUserCity }}>{children}</UserCityContext.Provider>;
}

export function useUserCityContext() {

    const { userCity, setUserCity } = useContext(UserCityContext);

    return { userCity, setUserCity };
}