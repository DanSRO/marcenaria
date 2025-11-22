import { Footer } from "../layouts/Footer";
import { Header } from "../layouts/Header";
type HomeProps = {
    children : React.ReactNode;
}
export const HomePage = ({children}: HomeProps) => {
    return(
        <>
        <Header />
        {children}
        <Footer/>
        </>
    );
}