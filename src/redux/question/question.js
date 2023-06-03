import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import waiting from "../waiting/waiting";
export const getAllQuestion = createAsyncThunk(
  //action type string
  "question/getAllQuestion",
  // callback function
  async (data) => {
    const url = `http://localhost:8080/api/v1/question`;
    try {
      await waiting(1000);
      const res = await axios.get(url);
      if (res.status === 200) {
        const { questions, answer } = res.data;
        return { questions, answer };
      }
    } catch (err) {
      if (err && err.res.status === 401) {
        console.log(err);
      }
    }
  }
);
export const sendAnswer = createAsyncThunk(
  //action type string
  "question/sendAnswer",
  // callback function
  async (data) => {
    const url = `http://localhost:8080/api/v1/save-answer`;
    try {
      await waiting(1500);
      const res = await axios.post(url, data);
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      if (err && err.res.status === 401) {
        console.log(err);
      }
    }
  }
);
export const submitAnswer = createAsyncThunk(
  //action type string
  "question/submitAnswer",
  // callback function
  async (data) => {
    const url = `http://localhost:8080/api/v1/submit-answer`;
    try {
      await waiting(1500);
      const res = await axios.post(url, data);
      if (res.status === 200) {
        const { answers, score, time, isReview } = res.data;
        localStorage.setItem("userAnswer", JSON.stringify(answers));
        return { answers, score, time, isReview };
      }
    } catch (err) {
      if (err && err.res.status === 401) {
        console.log(err);
      }
    }
  }
);
export const getResultStatistical = createAsyncThunk(
  //action type string
  "question/getResultStatistical",
  // callback function
  async (data) => {
    const url = `http://localhost:8080/api/v1/statistical`;
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        const { answers, score, time, questions, isReview } = res.data;
        return { answers, score, time, questions, isReview };
      }
    } catch (err) {
      if (err && err.res.status === 401) {
        console.log(err);
      }
    }
  }
);
export const clearData = createAsyncThunk(
  //action type string
  "question/clearData",
  // callback function
  async (data) => {
    const url = `http://localhost:8080/api/v1/clear-data`;
    try {
      await waiting(1500);
      const res = await axios.get(url);
      if (res.status === 200) {
        return;
      }
    } catch (err) {
      if (err && err.res.status === 401) {
        console.log(err);
      }
    }
  }
);
const initialState = {
  questions: [],
  answers: [],
  score: 0,
  time: 0,
  review: false,
  answerIncorrect: [],
  loading: false,
  errorMessage: "",
};
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuestion.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendAnswer.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(submitAnswer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getResultStatistical.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(clearData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllQuestion.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.questions = action.payload.questions;
          state.answers = action.payload.answer;
        }
      })
      .addCase(sendAnswer.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.answers = action.payload;
        }
      })
      .addCase(submitAnswer.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.answers = action.payload.answers;
          state.score = action.payload.score;
          state.time = action.payload.time;
          state.review = action.payload.isReview;
        }
      })
      .addCase(getResultStatistical.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.answers = action.payload.answers;
          state.score = action.payload.score;
          state.time = action.payload.time;
          state.review = action.payload.isReview;
          state.questions = action.payload.questions;
        }
        const questions = JSON.parse(JSON.stringify(state.questions));
        const answers = JSON.parse(JSON.stringify(state.answers));
        const checkAnsIncorrect = answers.filter((answer) => {
          return questions.find((question, index) => {
            return (
              answer.answerIndex + 1 !== question.answer_correct &&
              answer.keyIndex === index
            );
          });
        });
        state.answerIncorrect = checkAnsIncorrect;
      })
      .addCase(clearData.fulfilled, (state, action) => {
        localStorage.clear("userAnswer");
        state.loading = false;
        state.review = false;
        state.score = 0;
        state.time = 0;
        state.answers = [];
        state.answerIncorrect = [];
      })
      .addCase(getAllQuestion.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(sendAnswer.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(submitAnswer.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(getResultStatistical.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(clearData.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });
  },
});
export default questionSlice.reducer;
