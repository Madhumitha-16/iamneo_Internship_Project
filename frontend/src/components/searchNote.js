import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaEdit } from 'react-icons/fa'
const SearchNotes = () => {
const [note, setNote] = useState([]);

useEffect(() => {
    fetchNotes();
  }, []);

const fetchNotes = () =>{
axios({
    method: "POST",
    url: "http://localhost:5000/search",
  }).then(res => {
    setNote(res.data);
    console.log(res.data);
})
.catch((err) => {
    console.log(err);
  });
};

function onDelete(id,title) {
  console.log(id+title+" ondel works");
  axios({
    method: "GET",
    url: "http://localhost:5000/notedel",
    params: {
      title:title
  },

  })
  setNote((preValue) => {
    return [...preValue.filter((note, index) => index !==id)];
  });
}
  return (
    <div>
      <div className='item-container'>
        {note.map((notes) => (
          <div className='card' key={notes.id}>
            <h2 style={{fontFamily: "sans-serif",fontSize:"20px"}}>{notes.title}</h2>
            <p style={{color:"black"}}>{notes.content}</p><br></br>
            <button onClick={() => onDelete(notes.id,notes.title)}>
        <MdDelete size={25} />
      </button>
      <button >
        <FaEdit size={20}  style={{marginTop:"3px"}} />
      </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchNotes;