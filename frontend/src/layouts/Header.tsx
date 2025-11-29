import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import  mrLogo  from "../assets/mr-moveis.jpeg";
export const Header = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async() => {
        await logout();
        navigate("/login");
    } 
    return(
        <header style={{backgroundColor:"#333333", boxShadow:"0 4px 7px rgba(0,0,0,0.25)"}}>
            <nav style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                maxWidth:"1240px", margin:"0 auto", padding:"0 4rem", height:"80px"
            }}>
                <div style={{ display:"flex", alignItems:"center", gap:"1.1rem"}}>
                    <img style={{maxWidth:"3rem", height:"auto", borderRadius:"50%"}} src={mrLogo} alt="logo marcenaria" className="logo react"/>
                    <h1 style={{color:"white", fontFamily:"'Grenze', serif", fontSize:"2rem", fontWeight:"400"}}>MR - Móveis Projetados</h1>
                </div>
                <style>
                    { `li.navbar{
                        color: #ccc;
                        font-size: 1.1rem;
                        transition: color 0.3s;
                        }
            
                        li.navbar:hover {
                        color: white;
                        }
                    `}
                </style>
                <ul style={{display:"flex", gap:"1rem", listStyle:"none", alignItems:"center", fontFamily:"'roboto', sans-serif"}}>
                    <li className="navbar"><Link to="/">Página inicial</Link></li>
                    <li className="navbar"><Link to="/projects">Projetos</Link></li>
                    <li className="navbar"><Link to="/posts">Postagens</Link></li>
                    <li className="navbar"><Link to="/services">Serviços</Link></li>
                    <div style={{display:"flex", gap:"1rem"}}>                        
                        {token ? (
                            <button onClick={handleLogout}>Logout</button>
                        ):(
                            <li className="navbar">                                
                                <Link to="/login">Login</Link>
                            </li >
                        )}
                    </div>
                </ul>
            </nav>
        </header>
    );
}