import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {
  inputTitleState,
  inputContentState,
  statusState,
  todosState,
} from "../../components/atoms";

export default function Todos() {
  //入力したタイトルの値を可変にする
  const [inputTitle, setInputTitle] = useRecoilState(inputTitleState);
  //入力したコンテントの値を可変にする
  const [inputContent, setInputContent] = useRecoilState(inputContentState);
  //選択したプルダウンの値を可変にする
  const [status, setStatus] = useRecoilState(statusState);
  //入力した値を貯めていくtodoの配列
  const [todos, setTodos] = useRecoilState(todosState);
  //ステータス変更用プルダウンの値の定義
  const filterOptions = [
    { value: "incomplete", label: "未完了" },
    { value: "inProgress", label: "途中" },
    { value: "complete", label: "完了" },
  ];
  //useRouterを利用してボタンクリック時に画面遷移する
  const router = useRouter();

  return (
    <>
      <h1>TODO一覧</h1>
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <p>
                ステータス：
                <select
                  onChange={(e) => setStatus(e.target.selectedOptions[0].text)}
                >
                  {filterOptions.map((filterOption, index) => (
                    <option
                      key={index}
                      name="status"
                      value={filterOption.value}
                    >
                      {filterOption.label}
                    </option>
                  ))}
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
                  pathname: "/pages/[id]",
                  query: `id: ${todo.id}`,
                }}
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
