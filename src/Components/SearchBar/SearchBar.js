import React, { useState } from "react";
import "./SearchBar.css";
import { useHistory } from "react-router-dom";

const SearchBar = ({ placeholder, data, setDestination }) => {
  const history = useHistory();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.city.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="w-full relative">
      <div className="border-b-2 border-gray-400">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        {/* <div className="searchIcon">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div> */}
      </div>
      {filteredData.length != 0 && (
        <div className="absolute left-0 mt-4 min-w-[150px] max-w-[320px] min-h-[120px] z-[10] p-2 bg-white max-h-[320px] result-shadow rounded-xl">
          {filteredData.slice(0, 15).map((ele, index) => {
            return (
              <p
                className="dataItem"
                onClick={() => {
                  setWordEntered(ele.city);
                  setDestination(ele.city.toLowerCase());
                  setFilteredData([]);
                }}
                key="index"
              >
                {/* <p className="dataItem"> */}
                <img src={ele.img} alt="" className="img-search"/>
                <p>{ele.city} </p>
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
