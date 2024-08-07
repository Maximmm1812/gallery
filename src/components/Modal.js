import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";

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

    try {
      const newComment = {
        id: Date.now(),
        author: author,
        text: text,
      };
      const response = await axios.post(
        `http://test-backend.itdelta.agency/api/image/${photoId}`,
        {
          comments: [...comments, newComment],
        }
      );

      if (response.status === 204) {
        console.log("Комментарий успешно отправлен, но не сохраняется.");

        setAuthor("");
        setText("");
      }
    } catch (error) {
      console.error("Ошибка при отправке комментария:", error);
      if (error.response) {
        console.error("Ошибка ответа:", error.response.data);
        console.error("Статус код:", error.response.status);
      }
    }
  };

  if (!active || !imageData) return null;

  console.log(comments);

  return (
    <div className={`modal ${active ? "active" : ""}`} onClick={setActive}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageData.largeImage} alt={imageData.title} />
        <form onSubmit={addComment}>
          {/* <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Автор"
          /> */}
          <h5 style={{ textAlign: "left", marginBottom: "0" }}>Comment</h5>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button type="submit">Save</button>
        </form>

        <ul className="comments">
          <h6 style={{ textAlign: "left", fontSize: "14px" }}>Comments</h6>
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>
                {comment.id}: {comment.author}
              </strong>
              : {comment.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
