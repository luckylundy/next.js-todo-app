import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

//入力したtodoの配列
export const todosState = atom({
  key: "todos",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

//編集するtodoの状態を保持
export const editTodoState = atom({
  key: "editTodo",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
