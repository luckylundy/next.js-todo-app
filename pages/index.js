import { useState } from "react";

export default function Home() {
  //フォームに入力したtodoの値
  const [inputTodo, setInputTodo] = useState("");
  //表示するtodoリストの値
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    setTodos([...todos, inputTodo]);
    setInputTodo("");
  };

  return (
    <>
      <h1>TODO一覧</h1>
      <div>
        <input
          type="text"
          name="todo"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button onClick={addTodo}>追加</button>
        <ul>
          {todos.map((todo, index) => {
            return <li key={index}>{todo}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
