function ResultList(props) {

    return (
        <div className="text-left">
            <table className="table ">
                <thead>
                    <tr>
                    {
                        props.list && props.list.length > 0 ? 
                        Object.keys(props.list[0]).map((key) => (
                            <th key={key + "_"} scope="col">{key}</th>
                            
                            )) : ""
                        }
                    </tr>
                </thead>
                <tbody>
                    {props.list.map((item) => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.manufacturerId}</td>
                            <td>{item.manufacturer.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ResultList;

{/* <tr>
<th scope="col">Id</th>
<th scope="col">Title</th>
<th scope="col">Description</th>
<th scope="col">Manufacturer</th>
</tr> */}
