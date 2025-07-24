import '../css/Search.css'

import { useState } from "react";
import { SearchI } from "../icons/SearchI"

function Search({
  type
}) {

    const [searchValue, setSearchValue] = useState('');

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue)
  };

  return (
    <section className="Search">
        <input
            className="SearchInput"
            type="text"
            placeholder={`Buscar ${type} por su nombre`}
            value={searchValue}
            onChange={handleChange}
         />
        <SearchI className="icon" />
    </section>
  )
}

export default Search;
