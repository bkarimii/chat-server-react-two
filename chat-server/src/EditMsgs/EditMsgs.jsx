import { Reacct, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function EditMsgs({ text, msgId }) {
  const [visibleEditing, setVisibleEditing] = useState(false);
  const [textForEdit, setTextForEdit] = useState(text);
  const [editMsgId, seteditMsgId] = useState(msgId);
  const [putFetchText, setPutFetchText] = useState({ text: "" });

  const runkitLinkEdit = `https://chat-server-behrouz-karimi-5l4glcbel8q1.runkit.sh/messages/edit/${editMsgId}`;
  const localLink = `http://localhost:9090/messages/edit/${editMsgId}`;

  const putFetch = async (url, body) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    return response.json();
  };

  const handleClickEditIcon = () => {
    setVisibleEditing(!visibleEditing);
  };

  const handleEdit = () => {
    setVisibleEditing(!visibleEditing);

    // Update state with the text to be edited
    setPutFetchText({ text: textForEdit });
    console.log(msgId, "this is msgid");
    console.log({ text: textForEdit }, "textofr edit put fetch");

    putFetch(localLink, { text: textForEdit })
      .then((response) => {
        if (!response.ok) {
          console.log(response.ok);
          alert("Something went wrong!");
          console.error(response.statusText); // Log the error message
        } else {
          return response.json();

          // Handle successful edit (e.g., display confirmation message)
        }
      })
      .then((data) => console.log(data), "this is data inside put fetch")
      .catch((error) => console.error("Error during edit:", error)); // Handle any errors
  };

  const handleInput = (e) => {
    setTextForEdit(e.target.value);
  };

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
