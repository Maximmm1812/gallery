import React, { useEffect, useState } from "react";
import axios from "axios";
import Photo from "./Photo";
import Modal from "./Modal";
import "./PhotoList.css";

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          "http://test-backend.itdelta.agency/api/images"
        );
        setPhotos(response.data);
      } catch (error) {
        console.error("Ошибка при получении списка фотографий:", error);
      }
    };

    fetchPhotos();
  }, []);

  const openModal = (id) => {
    setSelectedPhotoId(id);
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
    setSelectedPhotoId(null);
  };

  return (
    <div>
      <div className="photo-list">
        {photos.map((photo) => (
          <Photo key={photo.id} photo={photo} openModal={openModal} />
        ))}
      </div>
      <Modal
        active={modalActive}
        setActive={closeModal}
        photoId={selectedPhotoId}
      />
    </div>
  );
};

export default PhotoList;
