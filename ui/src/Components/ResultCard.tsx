function ResultCard(props: any) {
    return (
        <div className="d-flex">
                    {props.list.map((item: any) => (
                        <>
                            <div key={item.id} className="card">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text"><small className="text-body-secondary">{item.manufacturer.name}</small></p>
                                </div>
                            </div>

                        </>
                    ))}
            
        </div>            
    )
}

export default ResultCard;
