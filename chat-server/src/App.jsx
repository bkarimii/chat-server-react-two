import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MsgForm from "./MsgForm/MsgForm";
import SearchMsgs from "./SearchMsgs/SearchMsgs";

function App() {
  return (
    <>
      <div id="main-div">
        <div>
          <MsgForm />
        </div>
        <div>
          <SearchMsgs />
        </div>
      </div>
    </>
  );
}

export default App;
