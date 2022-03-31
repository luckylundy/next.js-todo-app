import { atom } from "recoil";

//入力したタイトルの値
export const inputTitleState = atom({
  key: "inputTitle",
  default: "",
});

//入力したコンテントの値
export const inputContentState = atom({
  key: "inputContent",
  default: "",
});

//選択したプルダウンの値
export const statusState = atom({
  key: "status",
  default: "",
});

//入力したtodoの配列
export const todosState = atom({
  key: "todos",
  default: [],
});

//詳細ページに遷移するためのtodoの情報を取得
export const todoDetailState = atom({
  key: "todoDetail",
  default: {},
});
