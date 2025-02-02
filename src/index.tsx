import { createRoot } from "react-dom/client";
import { Root } from "./Root";

import "./main.css";

const container = document.querySelector("#root");
if (!container) throw new Error("Root element not found");

const root = createRoot(container);
root.render(<Root />);
