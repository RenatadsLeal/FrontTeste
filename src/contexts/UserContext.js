import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
    
    const storage = JSON.parse(localStorage.getItem('signed'));
    const [user, setUser] = useState(storage);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export function useUserContext() {

    const context = useContext(UserContext);

    const { user, setUser } = context;

    return { user, setUser };
}