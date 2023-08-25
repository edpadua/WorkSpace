import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Panel from "./Pages/Panel";
import PositionRegister from "./Pages/PositionRegister";
import UserRegister from "./Pages/UserRegister";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/positionregister" element={<PositionRegister />} />
          <Route path="/userregister" element={<UserRegister />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
