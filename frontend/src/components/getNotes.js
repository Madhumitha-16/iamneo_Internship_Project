import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const GetNotes = ({ searchNotes }) => {
const [note, setNote] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);


  const fetchNotes = () => {
    axios({
      method: "GET",
      url: "http://localhost:5000/notes",
    })
      .then((res) => {
        setNote(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function onDelete(id, title) {
    console.log(id + title + " ondel works");
    axios({
      method: "GET",
      url: "http://localhost:5000/notedel",
      params: {
        title: title,
      },
    });
    setNote((preValue) => {
      return [...preValue.filter((note, index) => index !== id)];
    });
  }
  return (
    <div>
      <div className="item-container">
        {searchNotes.length !== 0
          ? searchNotes.map((notes) => (
              <div className="card" key={notes.id}>
                <h2 style={{ fontFamily: "sans-serif", fontSize: "20px" }}>
                  {notes.title}
                </h2>
                <p style={{ color: "black" }}>{notes.content}</p>
                <br></br>
                <p style={{ color: "black" }}>{notes.createdAt}</p>
                <button onClick={() => onDelete(notes.id, notes.title)}>
                  <MdDelete size={25} />
                </button>
                <button>
                  <FaEdit size={20} style={{ marginTop: "3px" }} />
                </button>
              </div>
            ))
          : note.map((notes) => (
              <div className="card" key={notes.id}>
                <h2 style={{ fontFamily: "sans-serif", fontSize: "25px" }}>
                  {notes.title}
                </h2>
                <h4 style={{ color: "black",fontFamily: "sans-serif", fontSize: "18px" }}>{notes.content}</h4>
                <p style={{ color: "#6f212b",fontSize:"14px" }}>created at : {notes.updatedAt.slice(0,10) }</p>
                <p style={{ color: "#6f212b",fontSize:"14px" }}> {notes.updatedAt.slice(11,19)}</p>
                <br></br>
                <button onClick={() => onDelete(notes.id, notes.title)}>
                  <MdDelete size={25} />
                </button>
                <button>
                  <FaEdit size={20} style={{ marginTop: "3px" }} />
                </button>
              </div>
            ))}
      </div>
    </div>
  );
};
export default GetNotes;
