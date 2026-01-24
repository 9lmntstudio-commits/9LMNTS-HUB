import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app"; // 1. Capitalized 'App' to match the component below
import "./index.css";

// 2. Used the 'createRoot' variable directly as imported above
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
