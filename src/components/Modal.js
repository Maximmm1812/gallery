import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css"; // Импортируем стили для Modal

const Modal = ({ active, setActive, photoId }) => {
  const [imageData, setImageData] = useState(null);
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchImageData = async () => {
      if (photoId) {
        try {
          const response = await axios.get(
            `http://test-backend.itdelta.agency/api/image/${photoId}`
          );
          setImageData(response.data);
          setComments(response.data.comments);
        } catch (error) {
          console.error("Ошибка при получении данных изображения:", error);
        }
      }
    };

    fetchImageData();
  }, [photoId]);

  const addComment = async (e) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    const newComment = { author, text };

    try {
      await axios.post(
        `http://test-backend.itdelta.agency/api/image/${photoId}/comments`,
        newComment
      );
      setComments([...comments, newComment]);
      setAuthor("");
      setText("");
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
    }
  };

  if (!active || !imageData) return null;

  return (
    <div className={`modal ${active ? "active" : ""}`} onClick={setActive}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageData.largeImage} alt={imageData.title} />
        <h2>{imageData.title}</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.author}</strong>: {comment.text}
            </li>
          ))}
        </ul>
        <form onSubmit={addComment}>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Автор"
          />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Комментарий"
          />
          <button type="submit">Добавить комментарий</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
