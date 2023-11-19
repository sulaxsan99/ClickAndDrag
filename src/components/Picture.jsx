/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useDrag } from "react-dnd";
import '../App.css'
function Picture({ id, url }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <img
    className="showimage"
      ref={drag}
      src={url}
      width="150px"
      height="150px"
      style={{ border: isDragging ? "5px solid pink" : "2px solid black",margin:'5px' }}
    />
  );
}

export default Picture;
