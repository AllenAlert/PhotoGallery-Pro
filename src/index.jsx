import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";

// Load third-party Rocket analytics only in production to avoid dev fetch errors
if (import.meta.env && import.meta.env.PROD) {
  const script = document.createElement("script");
  script.type = "module";
  script.src = "https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fphotogalle9026back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.8";
  document.head.appendChild(script);
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
