import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserProvider from "./Contexts/User.jsx";

import PositionProvider from "./Contexts/Position.jsx";

import Home from "./Pages/Home";
import Panel from "./Pages/Panel";
import PositionRegister from "./Pages/PositionRegister";
import UserRegister from "./Pages/UserRegister";
import Profile from "./Pages/Profile";
import Schedule from "./Pages/Schedule/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PositionProvider>
          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<Home />} />
              <Route path="/panel" element={<Panel />} />
              <Route path="/positionregister" element={<PositionRegister />} />
              <Route path="/userregister" element={<UserRegister />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/schedule" element={<Schedule />} />
            </Route>
          </Routes>
        </PositionProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
