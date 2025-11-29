import { BannerSlide } from "../components/BannerSlide";
import { CategoryIcons } from "../components/CategoryIcons";
import { Gallery } from "../components/Gallery";
export const HomePage = () => {
    const bannerSlides = [
        {
            src:"/projetados1.png",
            component:(
                <BannerSlide 
                    title="Móvel projetado"
                    subtitle="O estilo que você esperou de um móvel agora também é uma realização."
                    imageSrc="/projetados1.png"
                    buttonText="Ver ofertas"
                    buttonLink="/ofertas/sala"
                    backgroundColor="#f5f7fa"
                />
            ),
        },
        {
            src:"/projetados2.png",
            component:(
                <BannerSlide 
                    title="Coleção escritório"
                    subtitle="Descubra novos modelos exclusivos para você."
                    imageSrc="/projetados2.png"
                    buttonText="Explorar modelos"
                    buttonLink="/colecao/modelos"
                    backgroundColor="#f0f8ff"
                />
            ),
        },
        {
            src:"/projetados5.png",
            component:(
                <BannerSlide 
                    title="Novo estilo sóbrio"
                    subtitle="A melhor qualidade em design agora com preços imperdíveis. Confira a nossa coleção."
                    imageSrc="/projetados5.png"
                    buttonText="Ver modelos"
                    buttonLink="/produtos/sobrios"
                    backgroundColor="#fff5f5"
                />
            ),
        },
    ]
    const categories = [
        {
            name:"Salas",
            icon:"ícone de salas",
            link:"/categoria/salas"
        },
        {
            name:"Cozinhas",
            icon:"ícone de cozinhas",
            link:"/categoria/cozinhas"
        },
        {
            name:"Jantar",
            icon:"ícone de janta",
            link:"/categoria/jantar"
        },
        {
            name:"Banheiros",
            icon:"ícone de banheiro",
            link:"/categoria/banheiros"
        }
    ]
    return(
        <div style={{maxWidth:'1280px', marginLeft:'auto', marginRight:'auto', paddingLeft:'1rem', paddingRight:'1rem' }}>
            {/* Banner principal com slides personalizados */}
            <div style={{ maxWidth: "100%", overflow: "hidden" }}>
            <Gallery
                width="100%"
                height="681px"
                radius="4px"
                showThumbs={true}
                images={bannerSlides}
                autoPlay={true}
                autoPlayInterval={6000}
            />
            </div>
            <div>
                <CategoryIcons categories={categories}/>
            </div>
        </div>
    );
};