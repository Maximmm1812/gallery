import React from "react";
import PhotoList from "./components/PhotoList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 style={{ color: "white" }}>Фото Галерея</h1>
      <PhotoList />
    </div>
  );
}

export default App;
