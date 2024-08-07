import React from "react";
import PhotoList from "./components/PhotoList";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <PhotoList />
    </div>
  );
}

export default App;
