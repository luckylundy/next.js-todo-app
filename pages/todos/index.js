import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {
  inputTitleState,
  inputContentState,
  statusState,
  todosState,
  todoDetailState,
} from "../../components/atoms";

export default function Todos() {
  //入力したタイトルの値を可変にする
  const [inputTitle, setInputTitle] = useRecoilState(inputTitleState);
  //入力したコンテントの値を可変にする
  const [inputContent, setInputContent] = useRecoilState(inputContentState);
  //選択したプルダウンの値を可変にする
  // const [status, setStatus] = useRecoilState(statusState);
  //入力した値を貯めていくtodoの配列
  const [todos, setTodos] = useRecoilState(todosState);
  //useRouterを利用して特定のクエリパラメータを取得
  const router = useRouter();
  //詳細ページに遷移するためのtodoの情報を設定するstate
  const [todoDetail, setTodoDetail] = useRecoilState(todoDetailState);
  const newTodos = todos.map((todo) => ({ ...todo }));
  //タイミングを待ってrouter.queryを取得する
  useEffect(() => {
    if (!router.isReady) return;
    router.query;
    console.log(router.query);
  }, [router.isReady]);
  //statusの値をプルダウンで選択した値に変更
  const handleTodoStatus = ({ id }, e) => {
    //todoのオブジェクトを全て展開した上で配列に並べ直してnewTodosに代入
    const newTodos = todos.map((todo) => ({ ...todo }));
    //newTodosをsetTodosに入れて引数のidと一致するtodoのstatusを更新
    setTodos(
      newTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: e.target.value,
            }
          : todo
      )
    );
    console.log(todos);
  };

  const onClickDetail = (todo) => {
    //handleTodoStatus()でtodoは変更済みなので、router.pushで詳細ページへ遷移
    const query = todo.id;
    router.push("/todos/[id]", `/todos/${todo.id}`);
    console.log(router.pathname, router.query);
  };

  return (
    <>
      <h1>TODO一覧</h1>
      <div>
        <ul>
          {/* {console.log(todos)}
          {console.log(newTodos)} */}
          {todos.map((todo) => (
            <li key={todo.id}>
              <p>
                ステータス：
                <select onChange={(e) => handleTodoStatus(todo, e)}>
                  <option value="incomplete">未完了</option>
                  <option value="inProgress">途中</option>
                  <option value="complete">完了</option>
                </select>
              </p>
              <p>
                タイトル：
                {todo.title}
              </p>
              <p>
                内容：
                {todo.content}
              </p>
              <a onClick={() => onClickDetail({ todo })}>TODO詳細に行く</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
