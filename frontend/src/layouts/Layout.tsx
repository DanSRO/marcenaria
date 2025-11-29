import { Footer } from "../layouts/Footer";
import { Header } from "../layouts/Header";

export const Layout = ({children}:{children:React.ReactNode}) => {
    return(
        <>
            <Header />
            {children}
            <Footer/>
        </>
    );
};