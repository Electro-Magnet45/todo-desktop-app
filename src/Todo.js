import React, { forwardRef } from "react";
import "./Todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const Todo = forwardRef(
  ({ todo_title, deleteTodo, statusTrigger, status, setFocusedTodo }, ref) => {
    return (
      <div className={`todo ${status === "completed" && status}`} ref={ref}>
        <div className="todo_container">
          <div className="todo-cont_content">
            <h4 onClick={() => setFocusedTodo(todo_title)}>{todo_title}</h4>
          </div>
          <div className="todo-cont_icons">
            <div className="todo-icons-core check" onClick={statusTrigger}>
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className="todo-icons-core trash" onClick={deleteTodo}>
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Todo;
