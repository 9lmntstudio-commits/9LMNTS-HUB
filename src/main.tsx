import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app"; // Match the lowercase 'a' in your app.tsx
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element. Check your index.html for id='root'");
} else {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
