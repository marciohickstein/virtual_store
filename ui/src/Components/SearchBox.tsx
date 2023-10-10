import { useState } from "react";
import ResultList from "./ResultList";

function SearchBox() {

    const [ list, setList ] = useState([]);

    async function search() {
        const response = await fetch('http://localhost:3000/product');
        const result = await response.json();

        setList(result);
        console.log(result);
    }

    return (
        <div className="text-center">
        <img src="../../public/logo.png"/>
        <br/><br/>
        <div>
            <label htmlFor="searchBox"></label>
            <input type="text" name="searchBox" id="searchBox" /><br/><br/>
            <input type="button" onClick={search} name="searchButton" id="searchButton" value="Search" />
            <ResultList list={list}></ResultList>
        </div>
        </div>
    )
}

export default SearchBox;