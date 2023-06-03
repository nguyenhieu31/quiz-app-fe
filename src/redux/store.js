import { configureStore } from "@reduxjs/toolkit";
import QuestionReducer from "./question/question";
export const store = configureStore({
  reducer: {
    question: QuestionReducer,
  },
});
