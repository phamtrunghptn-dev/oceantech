import React from "react";
import App from "./app/App";
import "./index.css";
import "./index.scss"

import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
