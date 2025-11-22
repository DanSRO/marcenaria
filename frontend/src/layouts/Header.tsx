import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
export const Header = () => {
    const { token, login, logout } = useAuth();    
    // const isLogged = token !== null;
    const navigate = useNavigate();
    // const handleUserAuth = async() =>{
    //     if(isLogged){
    //         await login("usuario@teste.com","senha123");
    //     }else{
    //         await logout();
    //     }
    // };
    const handleLogout = async() => {
        await logout();
        navigate("/login");
    } 
    return(
        <header style={{backgroundColor:"navy"}}>
            <div style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                maxWidth:"1240px", margin:"0 auto", padding:"0 2rem", height:"60px"
            }}>
                <h1 style={{color:"white", fontSize:"1.6rem", fontWeight:"500"}}>Cabeçalho</h1>
                
                <ul style={{display:"flex", gap:"2rem", listStyle:"none"}}>
                    <li><Link to="/projects">Projetos</Link></li>
                    <li><Link to="/posts">Postagens</Link></li>
                    <li><Link to="/services">Serviços</Link></li>
                    <div style={{display:"flex", gap:"1rem"}}>
                        {/* {isLogged ? ( */}
                        {token ? (
                            <button onClick={handleLogout}>Logout</button>
                        ):(
                            // <button onClick={handleUserAuth}>Login</button>
                            <button><Link to="/login">Login</Link></button>
                        )}
                    </div>
                </ul>
            </div>
        </header>
    );
}