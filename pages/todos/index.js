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
  //入力した値を貯めていくtodoの配列
  const [todos, setTodos] = useRecoilState(todosState);
  //useRouterを利用して特定のクエリパラメータを取得
  const router = useRouter();
  //タイミングを待ってrouter.queryを取得する
  // useEffect(() => {
  //   if (!router.isReady) return;
  //   router.query;
  //   console.log(router.query);
  // }, [router.isReady]);
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

  return (
    <>
      <h1>TODO一覧</h1>
      <div>
        <ul>
          {todos.map((todo) => (
            const todoInfo = {
              id: todo.id,
              status: todo.status,
              title: todo.title,
              content: todo.content,}
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
              <Link
                href={{
                  pathname: `/todos/${todo.id}`,
                  query: todoInfo,
                }}
                as={`/todos/${todo.id}`}
              >
                <a>TODO詳細に行く</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
