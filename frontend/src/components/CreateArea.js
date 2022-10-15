import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";
function CreateArea({ onAdd }) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  function handleExpanded() {
    setExpanded(true);
  }

  function submitButton(event) {
    onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();

    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    console.log(title);
    axios({
      method: "POST",
      url: "http://localhost:5000/save",
      params: {
        title:title,
        content:content,
    },

    }).then(res => {
      console.log("Note created");
    });
  }

  return (
    <div>
      <form action="/save" method="post">
        {isExpanded && (
          <input
            id="title"
            value={note.title}
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
        )}
        <p>
          <textarea
            id="content"
            value={note.content}
            onClick={handleExpanded}
            name="content"
            placeholder="Take a note..."
            onChange={handleChange}
            rows={isExpanded ? 3 : 1}
          ></textarea>
        </p>
        <button onClick={submitButton}>
          <IoIosAdd size={35} />
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
