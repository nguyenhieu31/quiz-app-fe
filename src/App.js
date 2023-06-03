// import logo from './logo.svg';
import "./App.css";
import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import HomeUi from "./components/home/home";
import QuestionUi from "./components/question/question";
import StatisticalUi from "./components/statistical/statistical";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomeUi />} />
        <Route path="/home/question" element={<QuestionUi />} />
        <Route path="/home/statistical" element={<StatisticalUi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
