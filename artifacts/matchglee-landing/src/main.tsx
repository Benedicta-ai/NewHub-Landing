import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Unable to find the root application element.");
}

createRoot(rootElement).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
