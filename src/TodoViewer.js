import React, { useEffect } from "react";
import "./TodoViewer.css";

const TodoViewer = ({ focusedTodo, setFocusedTodo }) => {
  useEffect(() => {
    document.getElementById("todoViewer_container").classList.add("show_anime");
  }, []);

  return (
    <div className="todoViewer" onClick={() => setFocusedTodo(null)}>
      <div id="todoViewer_container">
        <h1>{focusedTodo}</h1>
      </div>
    </div>
  );
};

export default TodoViewer;
