import { React, useState, useEffect } from "react";
import EditMsgs from "../EditMsgs/EditMsgs";
import "./MsgForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUser, faEdit } from "@fortawesome/free-solid-svg-icons";

// import { send } from "vite";

export default function MsgForm() {
  const [msgText, setMsgText] = useState("");
  const [sender, setSender] = useState("");
  const [latestMsgs, setLatestMsgs] = useState([]);
  const [msgId, setMsgId] = useState(null);
  const [hideChat, setHideChat] = useState(false);

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
    postData(runkitLink, postingObject)
      .then((response) => {
        if (response.error) {
          return alert(response.error);
        } else {
          return response;
        }
      })
      .then(() => {
        fetchLatestmsgs(runkitLinkLatest);
      })
      .catch((error) => {
        console.error(error);
      });
    setMsgText("");
    setSender("");
  }

  const handleInputMsg = (e) => {
    setMsgText(e.target.value);
  };
  const handleInputSender = (e) => {
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
      setLatestMsgs(data);
    } catch (error) {
      console.error(error);
    }
  };

  function updateLatestMsgs(id, newText) {
    const updatedMsgs = [];
    latestMsgs.forEach((msg) => {
      if (msg.id === id) {
        updatedMsgs.push({ ...msg, text: newText });
      } else {
        updatedMsgs.push(msg);
      }
    });
    setLatestMsgs(updatedMsgs);
  }

  useEffect(() => {
    fetchLatestmsgs(runkitLinkLatest);
    const interval = setInterval(() => {
      fetchLatestmsgs(runkitLinkLatest);
      console.log("hi");
    }, 30000);

    // return clearInterval(interval);
  }, []);

  const chatDisplay = (arr) => {
    return arr.map((item, index) => {
      return (
        <li key={item.id} id="chat-history">
          <div>
            <span>
              <FontAwesomeIcon icon={faUser} className="fa" />
            </span>
            <span id="users-name"> {item.from}</span>

            <p>
              {item.text}{" "}
              <EditMsgs
                text={item.text}
                msgId={item.id}
                update={updateLatestMsgs}
              />
            </p>
            <span>{item.sentTime}</span>
          </div>
          <span>
            <FontAwesomeIcon
              className="fa"
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
      if (msgId >= 0) {
        const response = await fetch(`${runkitLink}/${msgId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          //update latest messages locallly as well
          //setLatestMsgs((prevMsg) => prevMsg.filter((msg) => msg.id !== msgId));
          // Fetch the latest messages from the server after deletion
          // const latestResponse = await fetch(linkLatest);
          // const latestData = await latestResponse.json();
          // setLatestMsgs(latestData);
          fetchLatestmsgs(runkitLinkLatest);

          const data = await response.text();
        } else {
          const data = await response.text();
        }
      }
    } catch (error) {
      console.error(error, "error happenede deleting");
    }
  };
  /////////////////////////////////////////////////////////////////////////

  const toggleVisibility = () => {
    setHideChat(!hideChat);
  };

  return (
    <>
      <div id="chat-holder">
        <form onSubmit={chatInfo}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Name"
              id="name"
              value={sender}
              onChange={handleInputSender}
            />
          </div>
          <div>
            <label htmlFor="message"> Message</label>
            <input
              placeholder="Your message"
              type="text"
              id="message"
              value={msgText}
              onChange={handleInputMsg}
            />
          </div>
          <button type="submit">Send</button>
        </form>
        <button id="latest-button" onClick={toggleVisibility}>
          {hideChat ? "Show Chat" : "Hide chat"}
        </button>
        <div style={{ display: hideChat ? "none" : "block" }}>
          {chatDisplay(latestMsgs)}
        </div>
      </div>
    </>
  );
}

// import { React, useState, useEffect } from "react";
// import EditMsgs from "../EditMsgs/EditMsgs";
// import "./MsgForm.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

// export default function MsgForm() {
//   const [msgText, setMsgText] = useState("");
//   const [sender, setSender] = useState("");
//   const [latestMsgs, setLatestMsgs] = useState([]);
//   const [hideChat, setHideChat] = useState(false);

//   const runkitLink =
//     "https://chat-server-behrouz-karimi-5l4glcbel8q1.runkit.sh/messages";
//   const runkitLinkLatest =
//     "https://chat-server-behrouz-karimi-5l4glcbel8q1.runkit.sh/messages/latest";

//   async function postData(url = "", data = {}) {
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         mode: "cors",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         redirect: "follow",
//         body: JSON.stringify(data),
//       });
//       return response.json();
//     } catch (error) {
//       console.error("Error posting data:", error);
//     }
//   }

//   function chatInfo(e) {
//     e.preventDefault();
//     const postingObject = {
//       from: sender,
//       text: msgText,
//     };
//     postData(runkitLink, postingObject)
//       .then((response) => {
//         if (response.error) {
//           alert(response.error);
//         } else {
//           fetchLatestmsgs(runkitLinkLatest);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     setMsgText("");
//     setSender("");
//   }

//   const handleInputMsg = (e) => {
//     setMsgText(e.target.value);
//   };

//   const handleInputSender = (e) => {
//     setSender(e.target.value);
//   };

//   const fetchLatestmsgs = async (url) => {
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setLatestMsgs(data);
//     } catch (error) {
//       console.error("Error fetching latest messages:", error);
//     }
//   };

//   function updateLatestMsgs(id, newText) {
//     const updatedMsgs = latestMsgs.map((msg) =>
//       msg.id === id ? { ...msg, text: newText } : msg
//     );
//     setLatestMsgs(updatedMsgs);
//   }

//   useEffect(() => {
//     fetchLatestmsgs(runkitLinkLatest);
//     const interval = setInterval(() => {
//       fetchLatestmsgs(runkitLinkLatest);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   const chatDisplay = (arr) => {
//     return arr.map((item) => (
//       <li key={item.id} id="chat-history">
//         <div>
//           <span>
//             <FontAwesomeIcon icon={faUser} className="fa" />
//           </span>
//           <span id="users-name"> {item.from}</span>
//           <p>
//             {item.text}{" "}
//             <EditMsgs
//               text={item.text}
//               msgId={item.id}
//               update={updateLatestMsgs}
//             />
//           </p>
//           <span>{item.sentTime}</span>
//         </div>
//         <span>
//           <FontAwesomeIcon
//             className="fa"
//             icon={faTrash}
//             onClick={() => handleDeleteClick(item.id)}
//           />
//         </span>
//       </li>
//     ));
//   };

//   const handleDeleteClick = async (msgId) => {
//     try {
//       const response = await fetch(`${runkitLink}/${msgId}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         fetchLatestmsgs(runkitLinkLatest);
//       } else {
//         console.error("Failed to delete message");
//       }
//     } catch (error) {
//       console.error("Error deleting message:", error);
//     }
//   };

//   const toggleVisibility = () => {
//     setHideChat(!hideChat);
//   };

//   return (
//     <>
//       <div id="chat-holder">
//         <form onSubmit={chatInfo}>
//           <div>
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               placeholder="Name"
//               id="name"
//               value={sender}
//               onChange={handleInputSender}
//             />
//           </div>
//           <div>
//             <label htmlFor="message"> Message</label>
//             <input
//               placeholder="Your message"
//               type="text"
//               id="message"
//               value={msgText}
//               onChange={handleInputMsg}
//             />
//           </div>
//           <button type="submit">Send</button>
//         </form>
//         <button id="latest-button" onClick={toggleVisibility}>
//           {hideChat ? "Show Chat" : "Hide chat"}
//         </button>
//         <div style={{ display: hideChat ? "none" : "block" }}>
//           {chatDisplay(latestMsgs)}
//         </div>
//       </div>
//     </>
//   );
// }
