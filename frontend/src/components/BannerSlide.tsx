import { Link } from "react-router-dom";

import ornamentImage from '/Ornament 11.png';

interface BannerSlideProps{
    title:string;
    subtitle:string;
    imageSrc:string;
    buttonText:string;
    buttonLink:string;
    backgroundColor?:string;
    textColor?:string;    
}

export const BannerSlide:React.FC<BannerSlideProps> = ({    
    title,
    subtitle,
    imageSrc,
    buttonText,
    buttonLink,
    backgroundColor = "#f5f7fa",
    textColor = "#333",    

}) => {
    return(
        <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor,
          display: "flex",
          justifyContent:"space-around",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Conteúdo à esquerda (texto e botão) */}
        <div
          style={{
            flex: "1",
            padding: "60px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 2,
          }}
        >  
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              marginBottom: "16px",
              color: textColor,
            }}
          >
            {title}{" "}
            <span role="img" aria-label="fogo">
              🔥
            </span>
          </h1>
  
          <p
            style={{
              fontSize: "16px",
              marginBottom: "32px",
              maxWidth: "500px",
              color: textColor,
              opacity: 0.8,
            }}
          >
            {subtitle}
          </p>
  
          <Link to={buttonLink}>
            <button
              style={{
                backgroundColor: "#e91e63",
                width:"200px",
                margin:"20px",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1em",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#E91E63")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#E91E67")}
            >
              {buttonText}
            </button>
          </Link>
        </div>
  
        {/* Imagem à direita */}
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              width:"733.51px",
              height:"431.61",
              objectFit: "contain",
              // transform: "rotate(0deg)",
              zIndex: 2,
            }}
          />
  
          {/* Elementos decorativos de fundo */}
          <div
            style={{
              position: "absolute",
              top: "15px",
              right: "25px",
              width: "160px",
              height: "150px",
              borderRadius: "50%",
              background: "rgba(255, 77, 77, 0.1)",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "15%",
              right: "25%",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(255, 77, 77, 0.05)",
              zIndex: 1,
            }}
          />
  
          {/* Padrão de pontos decorativos */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              width: "140px",
              height: "140px",
              backgroundImage: `url(${ornamentImage})`,            
              backgroundSize: "cover",
              zIndex: 3,
              // opacity:0.4
              opacity:1.4
            }}
          />
        </div>
      </div>
    )
}