import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { todosState } from "../../components/atoms";

export default function Create() {
  //入力したタイトルの値を可変にする
  const [inputTitle, setInputTitle] = useState("");
  //入力したコンテントの値を可変にする
  const [inputContent, setInputContent] = useState("");
  //入力した値を貯めていくtodoの配列
  const [todos, setTodos] = useRecoilState(todosState);
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
    // 空欄が一か所でもあればonClickイベントを発火させない
    if (!inputTitle || !inputContent) return;
    //変数todoにid, status, title, contentのプロパティを設定する
    //statusは「未完了」を初期値として設定
    const todo = {
      id: todos.length + 1,
      status: "未着手",
      title: inputTitle,
      content: inputContent,
    };
    console.log(todo);
    setTodos((todos) => [...todos, todo]);
    setInputTitle("");
    setInputContent("");
    router.push("/todos");
  };

  return (
    <>
      <h1>入力画面</h1>
      <div className="form">
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
        <button onClick={addTodo}>追加</button>
        <p className="todoList-link-p">
          <Link href="/todos">
            <a className="todoList-link">一覧に戻る</a>
          </Link>
        </p>
      </div>

      <style jsx>
        {`
          .todoList-link-p {
            margin: 40px 0 0;
          }
          .todoList-link {
            font-weight: bold;
          }
        `}
      </style>
    </>
  );
}
