import { useRecoilState, useRecoilValue } from "recoil";
import {
  inputTitleState,
  inputContentState,
  statusState,
  todosState,
  todoDetailState,
} from "../../components/atoms";

export default function detail() {
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
  const todoDetail = useRecoilValue(todoDetailState);

  return (
    <>
      <h1>TODO詳細</h1>
      <p>{console.log({ todoDetail })}</p>
    </>
  );
}
