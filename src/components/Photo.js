import React from "react";

const Photo = ({ photo, openModal }) => {

  return (
    <div className="photo" onClick={() => openModal(photo.id)}>
      <img src={photo.image} alt={photo.title} />
      <h3 className="photo-id">Photo-Id: {photo.id}</h3>
    </div>
  );
};

export default Photo;
