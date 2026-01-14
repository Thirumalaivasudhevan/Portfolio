import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force redirect to home on initial load if not at root
if (window.location.pathname !== '/') {
    window.location.replace('/');
}


createRoot(document.getElementById("root")!).render(<App />);
