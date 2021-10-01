import React, { useEffect, useState } from "react";
import "./Home.css";
import Todo from "../Todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSortDown } from "@fortawesome/free-solid-svg-icons";
import FlipMove from "react-flip-move";
import { Helmet } from "react-helmet";
import { getAllTodos, addDoc, deleteDoc } from "../db";

const Home = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const submitTodo = () => {
    if (!newTodo) return;
    addDoc(newTodo).then((res) => {
      if (res.ok)
        setTodos([
          ...todos,
          {
            doc: { _id: res.id, name: newTodo },
          },
        ]);
      setNewTodo("");
    });
  };

  const deleteTodo = (e) => {
    deleteDoc(e.target.parentElement.parentElement.innerText).then((docId) => {
      const newTodoList = todos.filter((e) => e.doc._id !== docId);
      setTodos(newTodoList);
    });
  };

  useEffect(async () => {
    const fetchedTodos = await getAllTodos();
    setTodos(fetchedTodos.rows);
  }, []);

  return (
    <div className="home">
      <Helmet>
        <title>Home - Todo</title>
      </Helmet>
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
            <select>
              <option value="todo">Todo</option>
              <option value="progress">In Progress</option>
              <option value="done">Done</option>
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
                key={todo.doc._id}
                todo_title={todo.doc.name}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </FlipMove>
      </div>
    </div>
  );
};

export default Home;
