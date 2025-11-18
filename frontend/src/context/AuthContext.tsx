import React, { createContext, useState, useContext } from "react";
import api from "../api/api";
interface AuthContextType{
    token:string|null;
    login:(email:string, password:string) => Promise<void>;
    logout:() => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    const login = async(email:string, password:string) =>{
        const {data} = await api.post("/login", {email, password});
        localStorage.setItem("token", data.token);
        setToken(data.token);
    };
    const logout = async () => {
        await api.post("/logout");
        localStorage.removeItem("token");
        setToken(null);
    };
    return(
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);