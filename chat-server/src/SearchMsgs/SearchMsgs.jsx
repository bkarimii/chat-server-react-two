import React from "react";
import { useState, useEffect } from "react";

export default function SearchMsgs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMsgs, setSearchedMsgs] = useState([]);

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
    const finalSearchTerm = searchTerm;

    if (finalSearchTerm.length !== 0) {
      const data = await getSearchedMsgs(`${link}${finalSearchTerm}`);
      setSearchedMsgs(data);
      console.log(data, "this is searched msgs");
    } else {
      alert("Please type something then search for!");
    }
  };

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search"
        id="search-input"
        onChange={(e) => handleInput(e)}
      />
      <button onClick={handleSearch}>Search</button>
    </>
  );
}
