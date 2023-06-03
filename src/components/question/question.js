/* eslint-disable no-unused-vars */
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import styled from "styled-components";
import { useState, useEffect } from "react";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import {
  sendAnswer,
  getAllQuestion,
  submitAnswer,
  clearData,
} from "../../redux/question/question";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const QuestionStyles = styled.div`
  height: 100vh;
  & > .container {
    height: 100%;
    & > .header {
      display: flex;
      justify-content: flex-end;
      padding: 10px;
      & > button {
        transition: all 0.25s ease-in-out;
        & > svg {
          color: #ffffff;
        }
      }
      & > button:hover {
        background-color: #ff0000d9;
      }
    }
    & > .body {
      display: none;
    }
    & > .body.active {
      text-align: center;
      display: block;
      & > .title > h3 {
        margin: 0;
        color: #ffffff;
        font-weight: none;
        font-size: 1.25rem;
        font-family: "Montserrat", sans-serif;
        font-family: "Open Sans", sans-serif;
      }
      & > .box-question {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 4rem;
        & > p {
          width: 70%;
          margin: 0;
          color: #ffffff;
          font-weight: none;
          font-size: 1rem;
          font-family: "Montserrat", sans-serif;
          font-family: "Open Sans", sans-serif;
        }
      }
      & > .list-answers {
        margin-top: 4rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        & > .item-answer {
          display: flex;
          align-items: center;
          justify-content: center;
          & > .box {
            width: 70%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
            color: #ffffff;
            border: 1px solid #ffffff;
            border-radius: 2rem;
            cursor: pointer;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            transition: all 0.25s ease-in-out;
            & > span {
              padding-left: 1rem;
            }
            & > svg {
              padding-right: 1rem;
            }
          }
          & > .box:hover {
            background-color: #0d820d;
          }
        }
        & > .item-answer.active > .box {
          background-color: #0d820d;
        }
        & > .item-answer.incorrect > .box {
          background-color: #8e0e00;
        }
      }
      & > .btn-submit-answer {
        margin-top: 2rem;
        & > button {
          width: 30%;
          padding: 10px;
          cursor: ${(props) =>
            props.activeIndex || props.activeIndex === 0
              ? "pointer"
              : "no-drop"};
          background-color: ${(props) =>
            props.activeIndex || props.activeIndex === 0
              ? "#8e0e00"
              : "#cccccca8"};
          border-radius: 2rem;
          & > span {
            color: #ffffff;
            font-family: "Open Sans", sans-serif;
            font-weight: bold;
          }
        }
        & > .answered {
          background-color: #8e0e00;
          cursor: pointer;
        }
      }
    }
  }
  @media screen and (max-width: 544px) {
    &
      > .container
      > .body
      > .list-answers
      > .item-answer
      > .box
      > .text-answer {
      font-size: 0.75rem;
    }
    & > .container > .body > .btn-submit-answer > button > span {
      font-size: 0.75rem;
    }
  }
`;
const QuestionUi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, answers, loading, answerIncorrect, review } = useSelector(
    (state) => state.question
  );
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [answerUser, setAnswerUser] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(getAllQuestion());
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem("userAnswer", JSON.stringify(answers));
  }, [answers]);
  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem("userAnswer"));
    if (savedAnswers && savedAnswers.length > 0) {
      setAnswerUser(savedAnswers);
    }
  }, []);
  useEffect(() => {
    const startTime = Date.now();
    setStartTime(startTime);
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = Math.floor((currentTime - startTime) / 1000);
      setElapsedTime(elapsed);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleClickNextQuestion = (index, answerIndex, answer) => {
    if (!review) {
      const data = {
        keyIndex: index,
        answerIndex,
        answer,
      };
      dispatch(sendAnswer(data));
    }
    setActiveQuestion(index + 1);
    setActiveIndex(null);
  };
  const handleSubmitAnswer = (index, answerIndex, answer) => {
    if (!review) {
      const data = {
        keyIndex: index,
        answerIndex,
        answer,
        time: elapsedTime,
      };
      dispatch(submitAnswer(data));
    }

    setTimeout(() => {
      setActiveQuestion(0);
      setActiveIndex(null);
      navigate("/home/statistical");
    }, 1500);
  };
  const handleClickExit = () => {
    localStorage.clear("userAnswer");
    dispatch(clearData());
    navigate("/home");
  };
  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress style={{ color: "#ffffff" }} />
        </div>
      ) : (
        <QuestionStyles className="question" activeIndex={activeIndex}>
          <div className="container">
            <header className="header">
              <IconButton onClick={handleOpen}>
                <ClearIcon />
              </IconButton>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Do you want to exit?
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: "1.5rem",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      style={{
                        width: "30%",
                        padding: "10px",
                        cursor: "pointer",
                        borderRadius: "1rem",
                        backgroundColor: "#3f077e",
                        color: "#ffffff",
                      }}
                      onClick={handleClose}
                    >
                      Back
                    </button>
                    <button
                      style={{
                        width: "30%",
                        padding: "10px",
                        cursor: "pointer",
                        borderRadius: "1rem",
                        backgroundColor: "#8e0e00",
                        color: "#ffffff",
                      }}
                      onClick={handleClickExit}
                    >
                      Exit
                    </button>
                  </Box>
                </Box>
              </Modal>
            </header>
            {questions.length > 0 &&
              questions.map((item, index) => {
                const { question, list_answer } = item;
                const isAnswered =
                  answers.length > 0 &&
                  answers.find((answer) => {
                    return answer.keyIndex === index;
                  });
                return (
                  <div
                    className={
                      activeQuestion === index ? "body active" : "body"
                    }
                    key={index}
                  >
                    <div className="title">
                      <h3>
                        Question {index + 1}/{questions.length}
                      </h3>
                    </div>
                    <div className="box-question">
                      <p>{question}</p>
                    </div>
                    <div className="list-answers">
                      {list_answer.length > 0 &&
                        list_answer.map((answer, index) => {
                          const answered =
                            answers.length > 0 &&
                            answers.find(
                              (item) =>
                                item.answerIndex === index &&
                                item.keyIndex === activeQuestion
                            );
                          const findAnsIncorrect =
                            answerIncorrect.length > 0 &&
                            answerIncorrect.find((answerIn) => {
                              return (
                                answerIn.answerIndex ===
                                  answered?.answerIndex &&
                                answerIn.keyIndex === answered?.keyIndex
                              );
                            });
                          return (
                            <div
                              className={
                                findAnsIncorrect
                                  ? "item-answer incorrect"
                                  : answered && activeIndex === null
                                  ? "item-answer active"
                                  : activeIndex === index
                                  ? "item-answer active"
                                  : "item-answer"
                              }
                              key={index}
                            >
                              <div
                                className="box"
                                onClick={() => {
                                  if (!review) {
                                    setActiveIndex(index);
                                  }
                                }}
                              >
                                <span className="text-answer">{answer}</span>
                                {findAnsIncorrect ? (
                                  <HighlightOffRoundedIcon />
                                ) : (activeIndex !== null &&
                                    activeIndex === index) ||
                                  (answered && activeIndex === null) ? (
                                  <CheckCircleOutlineRoundedIcon />
                                ) : (
                                  <RadioButtonUncheckedOutlinedIcon />
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="btn-submit-answer">
                      {activeQuestion === questions.length - 1 ? (
                        <button
                          className={isAnswered ? "answered" : ""}
                          onClick={() => {
                            if (
                              (isAnswered && activeIndex === null) ||
                              activeIndex ||
                              activeIndex === 0
                            ) {
                              handleSubmitAnswer(
                                index,
                                activeIndex,
                                list_answer[activeIndex]
                              );
                            }
                          }}
                        >
                          <span>Submit Answer</span>
                        </button>
                      ) : (
                        <button
                          className={isAnswered ? "answered" : ""}
                          onClick={() => {
                            if (
                              (isAnswered && activeIndex === null) ||
                              activeIndex ||
                              activeIndex === 0
                            ) {
                              handleClickNextQuestion(
                                index,
                                activeIndex,
                                list_answer[activeIndex]
                              );
                            }
                          }}
                        >
                          <span>Next</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </QuestionStyles>
      )}
    </>
  );
};
export default QuestionUi;
