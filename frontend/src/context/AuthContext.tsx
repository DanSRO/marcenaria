import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api/api";
interface AuthContextType{
    token:string|null;
    login:(email:string, password:string) => Promise<void>;
    logout:() => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const VALIDATION_ENDPOINT = '/user'; 

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    // 1. Adicionar um estado para rastrear se o carregamento inicial terminou
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState(true); // Novo estado

    const login = async(email:string, password:string) =>{
        // ... (login funciona como antes)
        const {data} = await api.post("/login", {email, password});
        localStorage.setItem("token", data.token);
        setToken(data.token);
    };

    const logout = async () => {
        // ... (logout funciona como antes)
        try {
            await api.post("/logout");
        } catch (error) {
            // Ignorar erro se o token já era inválido/expirado
        } finally {
            localStorage.removeItem("token");
            setToken(null);
        }
    };
    
    // 2. Efeito para verificar o token ao carregar a aplicação
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        
        // Se não houver token, terminamos o carregamento.
        if (!storedToken) {
            setIsLoading(false);
            return;
        }

        // Função para verificar o token no backend
        const validateToken = async () => {
            try {
                // Tenta fazer uma requisição a uma rota protegida (ex: /api/user)
                // O middleware 'auth:sanctum' do Laravel irá verificar se o token é válido e não expirou.
                await api.get(VALIDATION_ENDPOINT); 
                
                // Se a requisição for bem-sucedida (status 200), o token é válido.
                setToken(storedToken); 
            } catch (error) {
                // Se a requisição falhar (status 401 Unauthorized, 419 Page Expired, etc.),
                // o token é inválido, expirado, ou a sessão não existe mais.
                console.log("Token inválido ou expirado. Sessão limpa.");
                await logout(); // Limpa o token do estado e do localStorage
            } finally {
                // Independentemente do resultado, a inicialização terminou.
                setIsLoading(false);
            }
        };

        validateToken();
    }, []); // Executa apenas na montagem

    // 3. Renderização Condicional (Tratamento do estado de carregamento)
    // Se ainda estiver validando o token, renderize um loading/spinner.
    if (isLoading) {
        return <div>Carregando sessão...</div>;
    }
    
    // 4. Renderiza o Context Provider quando o carregamento terminar.
    return(
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);