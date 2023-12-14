import { useEffect } from "react";
import { formatMoney } from "../utils/money";

function ResultCard(props: any) {

    useEffect(() => {
    })

    return (
        <div className="d-flex justify-content-between">
            {props.list.map((item: any) => (
                <div key={item.id}>
                    <div className="card">
                        <img loading="lazy" height="80" width="80" src={item.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text">{formatMoney(item.price)}</p>
                            <p className="card-text"><small className="text-body-secondary">{item.manufacturer.name}</small></p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ResultCard;
