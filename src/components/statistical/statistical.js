import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getResultStatistical, clearData } from "../../redux/question/question";
import ClearIcon from "@mui/icons-material/Clear";
const StatisticalStyles = styled.div`
  height: 100vh;
  & > .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    & > .modal {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
      padding: 15px 1.5rem;
      background-color: #ffffff;
      border-radius: 1rem;
      font-family: "Open Sans", sans-serif;
      font-weight: none;
      & > .logo > img {
        width: 100px;
      }
      & > .status {
        margin: 0;
        font-size: 1.25rem;
      }
      & > span {
        font-size: 0.8rem;
      }
      & > .button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        & > button {
          padding: 10px 1rem;
          cursor: pointer;
          border-radius: 2rem;
          color: #ffffff;
          transition: all 0.25s ease-in-out;
        }
        & > .btn-review {
          background-color: #03008e;
        }
        & > .btn-play-again {
          background-color: #8e0e00;
        }
        & > .btn-review:hover {
          background-color: #03008edb;
        }
        & > .btn-play-again:hover {
          background-color: #8e0e00cc;
        }
      }
      & > .btn-exits {
        position: absolute;
        top: -12px;
        right: -12px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #b01c0c;
        cursor: pointer;
        color: #ffffff;
        transition: all 0.25s ease-in-out;
      }
      & > .btn-exits:hover {
        background-color: #ffffff;
        color: #b01c0c;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
    }
  }
`;
const StatisticalUi = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { score, time } = useSelector((state) => state.question);
  useEffect(() => {
    dispatch(getResultStatistical());
  }, [dispatch]);
  const handleClickPlayAgain = () => {
    localStorage.clear("userAnswer");
    dispatch(clearData());
    setTimeout(() => {
      navigate("/home/question");
    }, 1500);
  };
  const handleClickExit = () => {
    localStorage.clear("userAnswer");
    dispatch(clearData());
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };
  const handleClickReview = () => {
    dispatch(getResultStatistical());
    navigate(-1);
  };
  return (
    <StatisticalStyles className="statistical">
      <div className="container">
        <div className="modal">
          <div className="logo">
            {score !== 0 && score >= 5 ? (
              <img
                src="https://media.istockphoto.com/id/1446385772/vi/vec-to/huy-ch%C6%B0%C6%A1ng-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-vector-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-m%E1%BA%ABu-thi%E1%BA%BFt-k%E1%BA%BF.jpg?s=612x612&w=0&k=20&c=MzEVMJZkrugehyuMffrXmM7yPSluLIopz7UgZYjpSdk="
                alt=""
              />
            ) : (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjXXFMuLaSvqlbDSVQb6ZqF7_40zkh_9p6_g&usqp=CAU"
                alt=""
              />
            )}
          </div>
          <h3 className="status">
            {score !== 0 && score >= 5 ? "Congratulation!!" : "Completed!"}
          </h3>
          <span className="description">
            {score !== 0 && score >= 5
              ? "You are amazing!!"
              : "Better luck next time!"}
          </span>
          <span className="answer-correct-completion-time">
            {score}/10 correct answer in {time !== 0 && time} Seconds
          </span>
          <div className="button">
            <button
              className="btn-review"
              onClick={() => {
                handleClickReview();
              }}
            >
              Review
            </button>
            <button
              className="btn-play-again"
              onClick={() => {
                handleClickPlayAgain();
              }}
            >
              Play Again
            </button>
          </div>

          <div className="btn-exits" onClick={handleClickExit}>
            <ClearIcon />
          </div>
        </div>
      </div>
    </StatisticalStyles>
  );
};
export default StatisticalUi;
