import Link from "next/link";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todosState, editTodoState } from "../../components/atoms";

export default function Todos() {
  //入力した値を貯めていくtodoの配列
  const [todos, setTodos] = useRecoilState(todosState);
  //atom.jsで定義したeditTodoの状態を更新するための関数を呼び出す
  const setEditTodo = useSetRecoilState(editTodoState);
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
  //編集ページで使用するeditTodoの値を取得
  const handleClickEdit = (todo) => {
    setEditTodo(todo);
  };

  return (
    <>
      <h1>TODO一覧</h1>
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <select onChange={(e) => handleTodoStatus(todo, e)}>
                <option value="未着手">未着手</option>
                <option value="途中">途中</option>
                <option value="完了">完了</option>
              </select>
              <p>
                ステータス：
                {todo.status}
              </p>
              <p>
                タイトル：
                {todo.title}
              </p>
              <Link
                href={{
                  pathname: `/todos/${todo.id}`,
                  query: {
                    id: todo.id,
                    status: todo.status,
                    title: todo.title,
                    content: todo.content,
                  },
                }}
                as={`/todos/${todo.id}`}
              >
                <a className="detail-link">TODO詳細に行く</a>
              </Link>
              <Link
                href={{
                  pathname: "/todos/edit",
                  query: {
                    id: todo.id,
                    status: todo.status,
                    title: todo.title,
                    content: todo.content,
                  },
                }}
                as="/todos/edit"
              >
                <a className="edit-link" onClick={() => handleClickEdit(todo)}>
                  編集する
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <p className="create-link-p">
          <Link href="/todos/create">
            <a className="create-link">新しいTODOを作成する</a>
          </Link>
        </p>
      </div>

      <style jsx>
        {`
          li {
            margin-top: 20px;
          }
          li > p {
            margin: 5px 0;
          }
          a {
            margin-left: 15px;
          }
          .detail-link {
            color: green;
          }
          .edit-link {
            color: blue;
          }
          .create-link-p {
            margin-top: 40px;
          }
          .create-link {
            font-weight: bold;
            border: ridge thick gold;
          }
        `}
      </style>
    </>
  );
}
