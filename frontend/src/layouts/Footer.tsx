import { Infos } from "./Infos";
import mrLogo from '../assets/mr-moveis.jpeg';

export const Footer = () =>{
    const informacoes = [
        {text: 'Sobre a MR - Marcenaria', link: '/about'},
        {text: 'Lista de desejos', link: '/wishlist'},
        {text: 'Blog', link: '/blog'},
        {text: 'Meus pedidos', link: '/meus-pedidos'},
    ];
    const categorias = [
        {text: 'Cozinha', link: '/cozinha'},
        {text: 'Sala', link: '/sala'},
        {text: 'Banheiro', link: '/banheiro'},
    ];
    return(
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <img src={mrLogo} alt="logo marcenaria" className="logo react"/>
                    <p style={{textAlign:"justify"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure animi ex doloribus facere quibusdam expedita, odio esse.</p>
                    <ul className="box-redes-sociais">
                        <li className="facebook"><a href="https://www.facebook.com"><i className="fab fa-facebook-f icon"></i></a></li>
                        <li className="instagram"><a href="https://istagram.com"><i className="fab fa-instagram icon"></i></a></li>
                        <li className="twitter"><a href="https://twitter.com"><i className="fab fa-twitter icon"></i></a></li>
                    </ul>
                </div>
                <Infos title="Informação" informations={informacoes}/>
                <Infos title="Categorias" informations={categorias}/>

                <div className="footer-column">
                    <h4>Contato</h4>
                    <ul className='footer-list'>
                        <li>Nome da Rua, número</li>
                        <li>Fortaleza-CE, 60000-000</li>
                        <li>(85) 99999-9999</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Daniel Dantas
            </div>
        </footer>
    )
}