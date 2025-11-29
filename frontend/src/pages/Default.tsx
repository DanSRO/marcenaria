import { Link } from "react-router-dom";

export const Default = () => {
    return(
        <>
            <h1>Ops! Página não encontrada!</h1>
            <Link to="/">
                <button
                    style={{
                        width:'114px', 
                        height:'40px', 
                        borderRadius:'4px', 
                        color:'white', 
                        fontSize:'14px', 
                        marginBottom:'10px',
                        backgroundColor:'var(--error)'
                    }}
                    >Voltar</button>
            </Link>
        </>
    );
}