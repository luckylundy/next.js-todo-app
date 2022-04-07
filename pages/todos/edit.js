import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { todosState, editTodoState } from "../../components/atoms";

export default function Edit() {
  //渡されたqueryの値を取得するためにuseRouterを使用
  const router = useRouter();
  const query = router.query;
  //atom.jsで設定したeditTodoのstateを呼び出す
  const editTodo = useRecoilValue(editTodoState);
  console.log(editTodo);
  const [todos, setTodos] = useRecoilState(todosState);
  //todoのtitleとcontentのstateをローカルに定義
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  //更新ボタン押下時にtodoのtitleとcontentを編集したものに更新
  const updateTodo = () => {
    // 空欄が一か所でもあればonClickイベントを発火させない
    if (!editTitle || !editContent) return;
    //更新前のtodo一覧情報をスプレッド構文でupdateTodosにコピーして代入
    const updateTodos = [...todos];
    //editTodoから編集前のオブジェクトを取得し、編集したtitleとcontentを更新する
    const newTodo = {
      ...editTodo,
      title: editTitle,
      content: editContent,
    };
    //更新対象のidを特定、対象idのオブジェクトをnewTodoに更新する
    updateTodos.map((todo, index) => {
      //idが合致したindex番目のtodoをnewTodoに差し替える
      todo.id === editTodo.id && updateTodos.splice(index, 1, newTodo);
    });
    //todosを編集内容に更新する
    setTodos(updateTodos);
    //一覧ページへ遷移する
    router.push("/todos");
  };

  //編集ページを初回ロードした時のみ、編集したいtodoの値をローカルなstateに保持させる
  useEffect(() => {
    setEditTitle(query.title);
    setEditContent(query.content);
  }, []);
  return (
    <>
      <h1>TODO編集ページ</h1>
      <div className="edit-form">
        <p>
          タイトル：
          <input
            type="text"
            value={editTitle}
            //編集したtitleの値を更新する
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </p>
        <p>
          内容：
          <textarea
            value={editContent}
            //編集したcontentの値を更新する
            onChange={(e) => setEditContent(e.target.value)}
          />
        </p>
        <button onClick={updateTodo}>更新</button>
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
