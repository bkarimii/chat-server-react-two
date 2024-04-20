import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faLocation } from "@fortawesome/free-solid-svg-icons";

export default function EditMsgs({ text, msgId, update }) {
  const [visibleEditing, setVisibleEditing] = useState(false);
  const [textForEdit, setTextForEdit] = useState(text);

  const runkitLinkEdit = `https://chat-server-behrouz-karimi-5l4glcbel8q1.runkit.sh/messages/edit/${msgId}`;
  const localLink = `http://localhost:9090/messages/edit/${msgId}`;

  const putFetch = async (url) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: textForEdit }),
    };

    return fetch(url, requestOptions);
    // const url1 = "http://localhost:9090/messages/latest";
    // const response2 = await fetch(url1);

    // console.log(msgId, "<----msgId", textForEdit, "textForEdit");
    // return response2;
  };

  const handleClickEditIcon = () => {
    setVisibleEditing(!visibleEditing);
  };

  const handleEdit = () => {
    setVisibleEditing(!visibleEditing);

    // Update state with the text to be edited
    // setPutFetchText({ text: textForEdit });

    putFetch(localLink, textForEdit)
      .then((response) => {
        if (!response.ok) {
          alert("Something went wrong!");
          console.error(response.statusText); // Log the error message
        } else {
          update(msgId, textForEdit);
          // return response.json();

          // Handle successful edit (e.g., display confirmation message)
        }
      })
      // .then(() => {
      //   fetchEditedMsg();
      // })
      .catch((error) => console.error("Error during edit:", error)); // Handle any errors
  };

  const handleInput = (e) => {
    setTextForEdit(e.target.value);
  };

  //fetch the edited msgs
  // const fetchEditedMsg = async () => {
  //   const response = await fetch(`http://localhost:9090/messages/${msgId}`);
  //   const data = await response.json();
  //   console.log(data, "data for edited msgs");
  // };
  return (
    <>
      <FontAwesomeIcon
        onClick={handleClickEditIcon}
        icon={faEdit}
        className="fa"
      />
      {visibleEditing && (
        <>
          <input
            type="text"
            value={textForEdit}
            onChange={(e) => handleInput(e)}
          />
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </>
  );
}
