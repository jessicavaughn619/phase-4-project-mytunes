import React from "react";
import "../stylesheets/Search.scss";

function Search({ search, onSearch }) {
    return (
        <div className="search-component">
            <input 
            type="text"
            className="search-input"
            placeholder="Search by artist..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}></input>
        </div>
    )
}

export default Search;