import { useState } from "react";
import ResultCard from "./ResultCard";
import productServiceApi from "../services/serviceApi";

function SearchBox() {
    const [ text, setText ] = useState('');
    const [ list, setList ] = useState([]);

    function handleTextChange(event: any) {
        setText(event.target.value);
    }

    function handleEnter(event) {
        if (event.key == 'Enter') {
            search();
        }

    }
    async function search() {
        const result = await productServiceApi.getListOfProductsAndImages(text);
        setList(result);
    }

    return (
        <div className="text-center">
            <img src="../../public/logo.png" />
            <br /><br />
            <div className="m-5">
                <label htmlFor="searchBox"></label>
                <input type="text" onKeyDown={handleEnter} onChange={handleTextChange} name="searchBox" id="searchBox" /><br /><br />
                <input type="button" onClick={search} name="searchButton" id="searchButton" value="Search" />
            </div>
            <ResultCard list={list}></ResultCard>
        </div>
    )
}

export default SearchBox;