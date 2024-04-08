import { React, useState, useEffect } from "react";
import "./MsgForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

// import { send } from "vite";

export default function MsgForm() {
  const [msgText, setMsgText] = useState("");
  const [sender, setSender] = useState("");
  const [latestMsgs, setLatestMsgs] = useState([]);
  const [msgId, setMsgId] = useState(null);

  // this function post new messages from input into server
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
      .then((data) => {
        console.log(data);
        fetchLatestmsgs(linkLatest).then((latestMsgs) => {
          setLatestMsgs(latestMsgs);
          console.log(latestMsgs, "this is latest mssg");
        });
      })
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //this function fetch Latest Msgs from server
  const runkitLinkLatest =
    "https://chat-server-behrouz-karimi-5l4glcbel8q1.runkit.sh/messages/latest";

  const linkLatest = "http://localhost:9090/messages/latest";
  const fetchLatestmsgs = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const chatDisplay = (arr) => {
    return arr.map((item, index) => {
      return (
        <li key={index} id="chat-history">
          <div>
            <span>
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span id="users-name"> {item.from}</span>
            {/* <FontAwesomeIcon icon={faEdit} /> */}
            <p>{item.text}</p>
            <span>{item.sentTime}</span>
          </div>
          <span>
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => handleDeleteClick(item.id)}
            />
          </span>
          {/* <DeleteMsg msgId={item.id} /> */}
        </li>
      );
    });
  };
  ///////////////////////////////////////////
  const handleDeleteClick = async (msgId) => {
    try {
      if (msgId) {
        const response = await fetch(
          `http://localhost:9090/messages/${msgId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          //update latest messages locallly as well
          setLatestMsgs((prevMsg) => prevMsg.filter((msg) => msg.id !== msgId));
          const data = await response.text();
          console.log(data);
        } else {
          const data = await response.text();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  /////////////////////////////////////////////////////////////////////////

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
      <div>{chatDisplay(latestMsgs)}</div>
    </>
  );
}
