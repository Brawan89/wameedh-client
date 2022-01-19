import { FaSearch } from "react-icons/fa";
import "./style.css";
const Search = ({ searchpages }) => {
  return (
    <div className="search">
      <div className="searchInputs">
        <div className="searchBar">
          <input
            className="searchQueryInput"
            type="text"
            placeholder="Search"
            onChange={searchpages}
          />
          <button className="searchQuerySubmit" type="submit">
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
