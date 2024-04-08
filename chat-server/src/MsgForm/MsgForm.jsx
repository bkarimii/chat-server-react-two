import { React, useState, useEffect } from "react";
import "./MsgForm.css";

// import { send } from "vite";

export default function MsgForm() {
  const [msgText, setMsgText] = useState("");
  const [sender, setSender] = useState("");

  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const runkitLink =
    "https://chat-server-behrouz-karimi-5l4glcbel8q1.runkit.sh/messages";
  const link = "http://localhost:9090/messages";
  function chatInfo(e) {
    e.preventDefault();

    const postingObject = {
      from: sender,
      text: msgText,
    };
    postData(link, postingObject)
      .then((response) => {
        if (response.error) {
          return alert(response.error);
        } else {
          return response;
        }
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error(error);
      });
    setMsgText("");
    setSender("");
    console.log(postingObject);
  }

  const handleInputMsg = (e) => {
    setMsgText(e.target.value);
  };
  const handleInputFrom = (e) => {
    setSender(e.target.value);
  };
  return (
    <>
      <form onSubmit={chatInfo}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={sender}
            onChange={handleInputFrom}
          />
        </div>
        <div>
          <label htmlFor="message"> Message</label>
          <input
            type="text"
            id="message"
            value={msgText}
            onChange={handleInputMsg}
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </>
  );
}
