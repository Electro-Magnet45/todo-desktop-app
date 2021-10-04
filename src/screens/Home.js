import React, { useEffect, useState } from "react";
import "./Home.css";
import Todo from "../Todo";
import TodoViewer from "../TodoViewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSortDown } from "@fortawesome/free-solid-svg-icons";
import FlipMove from "react-flip-move";
import { Helmet } from "react-helmet";
import {
  syncChanges,
  getTodos,
  addDoc,
  deleteDoc,
  docStatusUpdate,
} from "../db";

const Home = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todoStatus, setTodoStatus] = useState("all");
  const [todos, setTodos] = useState([]);
  const [newChange, setNewChange] = useState(false);
  const [focusedTodo, setFocusedTodo] = useState("");

  const submitTodo = () => {
    if (!newTodo || newTodo.trim() === "") return;
    addDoc(newTodo).then((res) => {
      if (res.ok) setNewTodo("");
    });
  };

  const deleteTodo = (event) =>
    deleteDoc(event.target.parentElement.parentElement.innerText);

  const statusTrigger = (event) => {
    const parentElement = event.target.parentElement.parentElement;
    docStatusUpdate(parentElement.innerText).then(() => {
      parentElement.classList.toggle("completed");
    });
  };

  useEffect(() => {
    syncChanges(setNewChange);
  }, []);

  useEffect(async () => {
    const fetchedTodos = await getTodos(todoStatus);
    setTodos(fetchedTodos);
  }, [todoStatus]);

  useEffect(async () => {
    if (!newChange) return;
    const fetchedTodos = await getTodos(todoStatus);
    setTodos(fetchedTodos);
    setNewChange((prev) => !prev);
  }, [newChange]);

  return (
    <div className="home">
      <Helmet>
        <title>Home - Todo</title>
      </Helmet>
      {focusedTodo && (
        <TodoViewer focusedTodo={focusedTodo} setFocusedTodo={setFocusedTodo} />
      )}
      <div className="home_container">
        <div className="home-cont_title">
          <h1>TODO</h1>
        </div>
        <div className="home-cont-1_form">
          <div className="home-cont-1-form_1">
            <input
              type="text"
              placeholder="Add Todo"
              autoFocus
              spellCheck={false}
              value={newTodo}
              onInput={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") submitTodo();
              }}
            />
            <FontAwesomeIcon
              icon={faPlus}
              className="home-cont-1-form_icon"
              onClick={submitTodo}
            />
          </div>
          <div className="home-cont-1-form_1">
            <select
              value={todoStatus}
              onChange={(e) => setTodoStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="uncompleted">Uncompleted</option>
              <option value="completed">Completed</option>
            </select>
            <FontAwesomeIcon
              icon={faSortDown}
              className="home-cont-1-form_icon add_icon"
            />
          </div>
        </div>

        <FlipMove className="home-cont_todos" enterAnimation="elevator">
          {!todos[0] && <h1>Nothing Yet!</h1>}
          {todos.map((todo) => {
            return (
              <Todo
                key={todo._id}
                todo_title={todo.name}
                deleteTodo={deleteTodo}
                statusTrigger={statusTrigger}
                status={todo.status}
                setFocusedTodo={setFocusedTodo}
              />
            );
          })}
        </FlipMove>
      </div>
    </div>
  );
};

export default Home;
