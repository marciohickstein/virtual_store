import { useState } from "react";
import ResultCard from "./ResultCard";
import productServiceApi from "../services/serviceApi";

function SearchBox() {
    const [ text, setText ] = useState('');
    const [ list, setList ] = useState([]);
    const [ option, setOption ] = useState('');

    function handleTextChange(event: any) {
        setText(event.target.value);
    }

    function handleEnter(event) {
        if (event.key == 'Enter') {
            search();
        }

    }

    async function search() {
        console.log(`Searching ${option}...`)
        const result = await productServiceApi.getListOfProductsAndImages(text);
        setList(result);
    }

    function handleOptions(event) {
        setOption(event.target.value);
    }

    return (
        <div className="text-center">
            <img src="../../public/logo.png" />
            <br /><br />
            <div className="m-5">
                <label htmlFor="searchBox"></label>
                <input type="text" onKeyDown={handleEnter} onChange={handleTextChange} name="searchBox" id="searchBox" /><br /><br />
                <div>
                    <input onClick={handleOptions} type="radio" id="radioTitle" name="options" value="Title"/>
                    <label htmlFor="radioTitle">Title</label>
                    <input onClick={handleOptions} type="radio" id="radioDescription" name="options" value="Description"/>
                    <label htmlFor="radioDescription">Description</label>
                    <input onClick={handleOptions} type="radio" id="radioManufacturer" name="options"  value="Manufacurer"/>
                    <label htmlFor="radioManufacturer">Manufacurer</label>
                </div>
                <br/>
                <input type="button" onClick={search} name="searchButton" id="searchButton" value="Search" />
            </div>
            <ResultCard list={list}></ResultCard>
        </div>
    )
}

export default SearchBox;