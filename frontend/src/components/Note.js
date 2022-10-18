import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from 'react-icons/fa'
function Note({ title, content, onDelete, id ,onEdit}) {

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const showTime = current.getHours()%12 
  + ':' + current.getMinutes() 
  + ":" + current.getSeconds();
  
  return (
    
    <div className="note">
    
      <h2 style={{fontFamily: "sans-serif",fontSize:"28px"}}>{title}</h2>
      <p style={{color:"black"}}>{content}</p>
      <p style={{fontSize:"12px"}}>created at:{showTime} - {date}</p>
      <button onClick={() => onDelete(id,title)}>
        <MdDelete size={25} />
      </button>
      <button onClick={() => onEdit(id) }>
        <FaEdit size={20}  style={{marginTop:"3px",}} />
      </button>
    </div>
  );
}

export default Note;
