/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import React, { useState, useRef, useEffect } from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import Draggable from "react-draggable";
import { FaDeleteLeft } from "react-icons/fa6";
import TwoChair from '../assests/two.png';
import ThreeChair from '../assests/three.png';
import fourchair from '../assests/four.png'
import fivechair from '../assests/five.png'
import sixchair from '../assests/six.png'
import hall from '../assests/hall.png'
import "../App.css";

const PictureList = [
  {
    id: 1,
    url: TwoChair,
  },
  {
    id: 2,
    url: ThreeChair
  },
  {
    id: 3,
    url: fourchair
  },
  {
    id: 4,
    url: fivechair
  },
  {
    id: 5,
    url: sixchair,
  },
];

function DragDrop() {
  const [board, setBoard] = useState([]);
  const canvasRef = useRef(null);
  const [positions, setPositions] = useState({});

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    setBoard((board) => [...board, pictureList[0]]);

  };
  const DeleteImage = (index) => {
    if (index >= 0 && index < board.length) {
      const newPictureList = [...board.slice(0, index), ...board.slice(index + 1)];
      setBoard(newPictureList);
    }
  };
  const mergeImages = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background (you can customize this color or image)
    context.fillStyle = "lightgray";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw each image on the canvas
    const backgroundImage = new Image();
    backgroundImage.src = hall; // Replace with the path to your background image
    backgroundImage.onload = () => {
      context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      board.forEach((picture, index) => {
        const img = new Image();
        img.src = picture.url;
        const { x, y } = positions[index] || { x: 0, y: 0 };

        // You can customize the position and size of the drawn images
        context.drawImage(img, x, y, 100, 100);
      });
    }

  };
  const downloadImage = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL(); // Get the data URL of the canvas
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "merged_image.png"; // You can customize the filename
    link.click();
  };
  const handleDrag = (index, e, ui) => {
    setPositions((prevPositions) => ({
      ...prevPositions,
      [index]: { x: ui.x, y: ui.y },
    }));
  };
  useEffect(() => {
    mergeImages();
  }, [board, positions]);

  const backgroundImageStyle = {
    backgroundImage: 'url("../assests/hall.png")', // Replace with the path to your background image
    backgroundSize: 'cover',
    width: '700px', // Adjust the width of the Board
    height: '500px', // Adjust the height of the Board
    // position: 'relative',
  };

  return (
    <div className="container">
      <div className="Pictures">
        {PictureList.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />;
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' ,  }}>


        <div className="Board" ref={drop} >
          <img src={hall} width={'100%'} />
          {
            board.map((picture, index) => {
              return <Draggable key={index} onDrag={(e, ui) => handleDrag(index, e, ui)}>

                <div style={{ display: 'flex', position: 'absolute' }}>

                  <img src={picture.url} style={{ width: '100px', height: '100px', margin: '2px' }} />
                  <div>
                    <FaDeleteLeft onClick={() => DeleteImage(index)} size={24} color="black" />
                  </div>

                </div>
              </Draggable>
            })}
        </div>

        <div style={{ width: '50%' }}>
          <canvas ref={canvasRef} height={500} width={'748px'} className="ResultCanvas" />
        </div>
      </div>
      <div style={{ textAlign: 'center', }}>
        <button onClick={downloadImage} >Download Your Design</button>
      </div>
    </div>
  );
}
export default DragDrop;
