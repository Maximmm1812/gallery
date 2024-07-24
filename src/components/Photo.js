import React from "react";

const Photo = ({ photo, openModal }) => {
  console.log(photo);
  return (
    <div className="photo" onClick={() => openModal(photo.id)}>
      <img src={photo.image} alt={photo.title} />
      <h3>{photo.title}</h3>
    </div>
  );
};

export default Photo;
