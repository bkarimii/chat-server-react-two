import { Reacct, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function EditMsgs({ text }) {
  const [visibleEditing, setVisibleEditing] = useState(false);
  const [textForEdit, setTextForEdit] = useState(text);
  const [putFetchText, setPutFetchText] = useState({ text: "" });

  const putFetch = () => {};

  const handleClickEdit = () => {
    setVisibleEditing(!visibleEditing);
  };

  const handleEdit = () => {
    setVisibleEditing(!visibleEditing);
    console.log(textForEdit, "this is edit text");
  };
  const handleInput = (e) => {
    setTextForEdit(e.target.value);
  };

  return (
    <>
      <FontAwesomeIcon onClick={handleClickEdit} icon={faEdit} className="fa" />
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
