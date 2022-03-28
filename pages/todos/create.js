import { useState } from "react";
import { useRouter } from "next/router";

export default function Create() {
  //入力したタイトルの値を可変にする
  const [inputTitle, setInputTitle] = useState("");
  //入力した内容の値を可変にする
  const [inputContent, setInputContent] = useState("");
  //入力した値を貯めていくtodoの配列
  const [todos, setTodos] = useState([]);
  //ステータス変更用プルダウンの値の定義
  const filterOptions = [
    { value: "incomplete", label: "未完了" },
    { value: "inProgress", label: "途中" },
    { value: "complete", label: "完了" },
  ];
  //useRouterを利用してボタンクリック時に画面遷移する
  const router = useRouter();

  const handleInputTitle = (e) => {
    e.preventDefault();
    setInputTitle(e.target.value);
  };

  const handleInputContent = (e) => {
    e.preventDefault();
    setInputContent(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (inputTitle || inputContent === "") return;
    // 変数todoにid, status, title, contentのプロパティを設定する;
    const todo = {
      id: todos.length + 1,
      status: { filterOptions: label },
      title: inputTitle,
      content: inputContent,
    };
    setTodos((todos) => [...todos, todo]);
    setInputTitle("");
    setInputContent("");
  };

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   if (title || content === "") return;
  //   //変数todoを定義してid,status,title,contentのプロパティを設定する
  //   const todo = {
  //     id: todos.length + 1,
  //     status: { filterOptions: value },
  //     title: inputTitle,
  //     content: inputContent,
  //   };
  //   setTodos((todos) => [...todos, todo]);
  //   setInputTitle("");
  //   setInputContent("");
  //   router.push("/todos");
  // };

  return (
    <>
      <h1>入力画面</h1>
      <div className="form">
        <p>
          ステータス：
          <select>
            {filterOptions.map(({ value, label }) => (
              <option name="status" value={value}>
                {label}
              </option>
            ))}
          </select>
        </p>
        <p>
          タイトル：
          <input
            type="text"
            name="title"
            value={inputTitle}
            onChange={handleInputTitle}
          />
        </p>
        <p>
          内容：
          <textarea
            name="content"
            value={inputContent}
            onChange={handleInputContent}
          />
        </p>
        {/* ボタンを押すことでtodo一覧ページに遷移＆遷移先でも値を保持したままにする */}
        {/* <button onClick={handleClick}>追加</button> */}
        <button onClick={addTodo}>追加</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.status}
            {todo.title}
            {todo.content}
          </li>
        ))}
      </ul>
    </>
  );
}
