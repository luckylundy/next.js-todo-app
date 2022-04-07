import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { todosState } from "../../components/atoms";

export default function detail() {
  //渡されたqueryの値を取得するためにuseRouterを使用
  const router = useRouter();
  const query = router.query;
  //todoの配列の読み取りのみ
  const todos = useRecoilValue(todosState);

  return (
    <>
      <h1>TODO詳細</h1>
      <p>
        ID:
        {query.id}
      </p>
      <p>
        タイトル：
        {query.title}
      </p>
      <p>
        内容：
        {query.content}
      </p>
      <p className="todoList-link-p">
        <Link href="/todos">
          <a className="todoList-link">一覧に戻る</a>
        </Link>
      </p>

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
