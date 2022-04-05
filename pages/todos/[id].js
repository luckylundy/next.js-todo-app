import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { todosState } from "../../components/atoms";

export default function detail() {
  //渡されたquery.idを取得するためにuseRouterを使用
  const router = useRouter();
  const query = router.query;
  //入力した値を貯めていくtodoの配列
  const [todos, setTodos] = useRecoilState(todosState);
  //特定のtodoに絞り込むためのstateを設定
  // const [todoDetail, setTodoDetail] = useState({});
  //渡されたidと一致するidを持つtodo(最初に一致したもの)を取得、idが渡されていなければ一覧ページに遷移
  // useEffect(() => {
  //   if (router.query.id) {
  //     setTodoDetail(todos.find((todo) => todo.id === router.query.id));
  //   } else {
  //     router.push("/");
  //   }
  //   console.log(todoDetail);
  // }, []);

  return (
    <>
      <h1>TODO詳細</h1>
      <p>
        ID:
        {query.id}
      </p>
      <p>
        ステータス：
        {query.status}
      </p>
      <p>
        タイトル：
        {query.title}
      </p>
      <p>
        内容：
        {query.content}
      </p>
    </>
  );
}
