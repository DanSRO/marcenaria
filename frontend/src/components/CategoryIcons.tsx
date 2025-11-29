import { Link } from "react-router-dom";

interface CategoryItem{
    name:string;
    icon:React.ReactNode;
    link:string;
}

interface CategoryIconsProps{
    categories: CategoryItem[];
    className?: string;
}

export const CategoryIcons = ({categories, className = ""}: CategoryIconsProps) =>{
    return(
        <div className={`category-icons-container ${className}`}>
            <div
                style={{
                    display:"flex",
                    justifyContent:"center",
                    flexWrap:"wrap",
                    gap:"24px",
                    padding:"20px 0"
                }}            
            >
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.link}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: "8px",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              className="category-icon"
            >
              {category.icon}
            </div>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
