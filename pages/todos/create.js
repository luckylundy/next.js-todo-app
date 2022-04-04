import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {
  inputTitleState,
  inputContentState,
  statusState,
  todosState,
} from "../../components/atoms";

export default function Create() {
  //入力したタイトルの値を可変にする
  const [inputTitle, setInputTitle] = useRecoilState(inputTitleState);
  //入力したコンテントの値を可変にする
  const [inputContent, setInputContent] = useRecoilState(inputContentState);
  //選択したプルダウンの値を可変にする
  // const [status, setStatus] = useRecoilState(statusState);
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
    //コンテントの中身が空の場合はボタン押下時にイベントが発火しない
    if (inputContent === "") return;
    //変数todoにid, status, title, contentのプロパティを設定する
    //statusは「未完了」を初期値として設定
    const todo = {
      id: todos.length + 1,
      status: "incomplete",
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
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <p>
              ステータス：
              <select
                onChange={(e) => setStatus(e.target.selectedOptions[0].text)}
              >
                {filterOptions.map((filterOption, index) => (
                  <option key={index} name="status" value={filterOption.value}>
                    {filterOption.label}
                  </option>
                ))}
              </select>
            </p>
            {todo.title}
            {todo.content}
          </li>
        ))}
      </ul>
    </>
  );
}
