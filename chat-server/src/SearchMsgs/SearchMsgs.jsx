import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faUser } from "@fortawesome/free-solid-svg-icons";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function SearchMsgs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMsgs, setSearchedMsgs] = useState([]);
  const [displaySearch, setDisplaySearch] = useState(false);

  const runkitLink =
    "https://chat-server-behrouz-karimi-5l4glcbel8q1.runkit.sh/messages/search?text=";
  const link = "http://localhost:9090/messages/search?text=";

  const getSearchedMsgs = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const handleSearch = async () => {
    setDisplaySearch(true);
    const finalSearchTerm = searchTerm;

    if (finalSearchTerm.length !== 0) {
      const data = await getSearchedMsgs(`${runkitLink}${finalSearchTerm}`);
      setSearchedMsgs(data);
      console.log(data, "this is searched msgs");
    } else {
      alert("Please type something then search for!");
    }
  };

  const searchDisplay = (arr) => {
    if (arr.length != 0) {
      return arr.map((item, index) => {
        return (
          <li key={index} id="chat-history">
            <div>
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span id="users-name"> {item.from}</span>

              <p>{item.text}</p>
              <span>{item.sentTime}</span>
            </div>
          </li>
        );
      });
    } else {
      return "No result found for this term";
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setSearchedMsgs([]);
    setDisplaySearch(false);
  };

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <div id="search-holder">
        <input
          type="text"
          placeholder="Search"
          id="search-input"
          onChange={(e) => handleInput(e)}
          value={searchTerm}
        />
        <FontAwesomeIcon icon={faSearch} onClick={handleSearch} />
        {/* <button onClick={}>Search</button> */}
      </div>
      <div>
        {displaySearch && (
          <FontAwesomeIcon icon={faTimes} onClick={handleClear} />
        )}
        <div>{displaySearch && searchDisplay(searchedMsgs)}</div>
      </div>
    </>
  );
}
