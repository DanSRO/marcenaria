interface InfosItem{
    text:string;
    link:string;
}
interface InfosProps{
    title:string;
    informations:InfosItem[];
}

export const Infos = ({title, informations}:InfosProps) => {
    return(
        <div className="footer-column">
            <h4>{title}</h4>
            <ul className="footer-list">
                {informations.map((info:InfosItem, index:number) => {
                    return(
                        <li key={index}>
                            <a href={info.link}>{info.text}</a>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};