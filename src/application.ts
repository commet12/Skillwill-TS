interface Todo {
    id: number;
    text: string;
    done: boolean;
  }

  
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

function addTodo(text: string): { type: string; payload: Todo } {
  return { type: ADD_TODO, payload: { id: Date.now(), text, done: false } };
}

function deleteTodo(id: number): { type: string; payload: number } {
  return { type: DELETE_TODO, payload: id };
}

function toggleTodo(id: number): { type: string; payload: number } {
  return { type: TOGGLE_TODO, payload: id };
}
  



interface Action {
    type: string;
    payload: any;
  }
  
  interface State {
    todos: Todo[];
  }
  
  function reducer(state: State = { todos: [] }, action: Action): State {
    switch (action.type) {
      case ADD_TODO:
        return { todos: [...state.todos, action.payload] };
      case DELETE_TODO:
        return { todos: state.todos.filter((todo) => todo.id !== action.payload) };
      case TOGGLE_TODO:
        return {
          todos: state.todos.map((todo) =>
            todo.id === action.payload ? { ...todo, done: !todo.done } : todo
          ),
        };
      default:
        return state;
    }
  }






  import React, { useState } from "react";
  import { useSelector, useDispatch } from "react-redux";
  
  function AddTodo() {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
  
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      dispatch(addTodo(text));
      setText("");
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    );
  }
  
  function TodoList() {
    const todos = useSelector((state: State) => state.todos);
    const dispatch = useDispatch();
  
    function handleDelete(id: number) {
      dispatch(deleteTodo(id));
    }
  
    function handleToggle(id: number) {
      dispatch(toggleTodo(id));
    }
  
    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.done ? "line-through" : "none" }}
              onClick={() => handleToggle(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }
  
  function DoneList() {
    const todos = useSelector((state: State) => state.todos);
  
    const doneTodos = todos.filter((todo) => todo.done);
  
    return (
      <>
        {doneTodos.map((todo) => (
          <div key={todo.id}>
            <span style={{ textDecoration: "line-through" }}>{todo.text}</span>
          </div>
        ))}
      </>
    );
  }
  

  


  