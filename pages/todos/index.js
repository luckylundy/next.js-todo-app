import Link from "next/link";
import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todosState, editTodoState } from "../../components/atoms";

export default function Todos() {
  //検索フォームに入力した値の保持のためのstateとset関数を設定
  const [searchTitle, setSearchTitle] = useState("");
  //検索用selectボックスの値の保持のためのstateとset関数を設定
  const [selectedStatus, setSelectedStatus] = useState("");
  //検索条件に合うtodoの配列を格納するstateを設定
  const [selectedTodos, setSelectedTodos] = useState([]);
  //検索結果の表示か通常の表示かを判定するstateを設定
  const [isSearched, setIsSearched] = useState(false);
  //入力した値を貯めていくtodoの配列
  const [todos, setTodos] = useRecoilState(todosState);
  //atom.jsで定義したeditTodoの状態を更新するための関数を呼び出す
  const setEditTodo = useSetRecoilState(editTodoState);

  //検索フォームに入力した値でstateを更新
  const onSearchTitle = (e) => {
    e.preventDefault();
    setSearchTitle(e.target.value);
  };
  //selectボックスに選択された値でstateを更新
  const onSearchStatus = (e) => {
    e.preventDefault();
    setSelectedStatus(e.target.value);
  };
  //リセットボタン押下時に検索用のset関数の値を初期化する
  const onClickReset = () => {
    setSearchTitle("");
    setSelectedStatus("");
  };
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
  //todoを削除する
  const onClickDelete = (rtodoId) => {
    //todo内で「押下されたtodoのidがtodoIdとひとしくないもの」を抽出し、定数に代入
    const removedTodos = todos.filter((todo) => {
      if (todo.id !== rtodoId) {
        return true;
      }
    });
    //todosを更新する関数にフィルタリングした定数を代入して更新
    setTodos(removedTodos);
  };
  //検索結果によってその度に表示が変わるよう設定
  useEffect(() => {
    //選択されたstatusを含むtodoを抽出
    if (selectedStatus) {
      setIsSearched(true);
      const searchStatusTodos = todos.filter(
        (todo) => todo.status === selectedStatus
      );
      setSelectedTodos(searchStatusTodos);
      //titleに入力された文字列を含むtodoを抽出
    } else if (searchTitle) {
      setIsSearched(true);
      const searchTitleTodos = todos.filter(
        (todo) => todo.title.indexOf(searchTitle) !== -1
      );
      setSelectedTodos(searchTitleTodos);
      //検索していなかった場合は検索結果の表示はしない
    } else {
      setIsSearched(false);
    }
  }, [selectedStatus, searchTitle]);

  return (
    <>
      <h1>TODO一覧</h1>
      <div>
        <div className="search-form">
          <h4>TODOを検索する</h4>
          <p className="search-title">
            <input
              type="text"
              placeholder="タイトルを検索"
              value={searchTitle}
              onChange={onSearchTitle}
            />
          </p>
          <p className="selected-status">
            <select onChange={onSearchStatus}>
              <option>ステータス選択</option>
              <option value="未着手">未着手</option>
              <option value="途中">途中</option>
              <option value="完了">完了</option>
            </select>
          </p>
          <p>
            <button className="reset-button" onClick={onClickReset}>
              リセット
            </button>
          </p>
        </div>
        <p className="create-link-p">
          <Link href="/todos/create">
            <a className="create-link">新しいTODOを作成する</a>
          </Link>
        </p>
        <ul>
          {isSearched
            ? selectedTodos.map((todo) => (
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
                    <a
                      className="edit-link"
                      onClick={() => handleClickEdit(todo)}
                    >
                      編集する
                    </a>
                  </Link>
                  <a
                    className="delete-link"
                    onClick={() => onClickDelete(todo.id)}
                  >
                    削除する
                  </a>
                </li>
              ))
            : todos.map((todo) => (
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
                    <a
                      className="edit-link"
                      onClick={() => handleClickEdit(todo)}
                    >
                      編集する
                    </a>
                  </Link>
                  <a
                    className="delete-link"
                    onClick={() => onClickDelete(todo.id)}
                  >
                    削除する
                  </a>
                </li>
              ))}
        </ul>
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
          h4 {
            margin-left: 15px;
            margin-right: 20px;
          }
          .detail-link {
            color: green;
          }
          .edit-link {
            color: blue;
          }
          .delete-link {
            color: red;
            cursor: pointer;
          }
          .create-link-p {
            margin-top: 40px;
            margin-bottom: 30px;
          }
          .create-link {
            font-weight: bold;
            border: ridge thick gold;
            background: rgba(255, 215, 0, 0.5);
          }
          .search-form {
            display: flex;
            align-items: center;
          }
          .search-form > p {
            margin-left: 15px;
          }
          .reset-button {
            background-color: gray;
            color: white;
          }
        `}
      </style>
    </>
  );
}
