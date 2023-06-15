import styled from "styled-components";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestion, accessHome } from "../../redux/question/question";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
const HomeStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  & > .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & > .logo > svg {
      font-size: 10rem;
      color: #8e0e00;
    }
    & > .start-quiz > .btn-start {
      width: 100%;
      padding: 10px 0;
      border-radius: 2rem;
      background-image: linear-gradient(
        to right,
        #d31027 0%,
        #ea384d 51%,
        #d31027 100%
      );
      cursor: pointer;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px,
        rgb(51, 51, 51) 0px 0px 0px 3px;
      font-family: "Open Sans", sans-serif;
      & > span {
        color: #ffffff;
      }
    }
  }
`;
const HomeUi = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openLoading, setOpenLoading] = useState(false);
  const HandleClickStartQuiz = () => {
    dispatch(getAllQuestion());
    setOpenLoading(true);
    setTimeout(() => {
      setOpenLoading(false);
      navigate("/home/question");
    }, 1500);
  };
  useEffect(() => {
    dispatch(accessHome());
  }, [dispatch]);
  const { loading } = useSelector((state) => state.question);
  return (
    <>
      {openLoading ? (
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
            <HomeStyles className="home">
              <div className="container">
                <div className="logo">
                  <QuizRoundedIcon />
                </div>
                <div className="start-quiz">
                  <button className="btn-start" onClick={HandleClickStartQuiz}>
                    <span>Start Quiz!</span>
                  </button>
                </div>
              </div>
            </HomeStyles>
          )}
        </>
      )}
    </>
  );
};
export default HomeUi;
