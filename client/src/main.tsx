import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AnimatedCursor from "react-animated-cursor";
import AppContext from "./utils/AppContext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="hidden lg:block z-[999]">
      <AnimatedCursor
        innerSize={10}
        outerSize={40}
        color="0, 255, 255"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={1.5}
        clickables={[
          "a",
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'input[type="embed"]',
          "label[for]",
          "select",
          "textarea",
          "button",
          ".link",
        ]}
      />
    </div>
    <AppContext>
    <BrowserRouter>
      <App /></BrowserRouter>
    </AppContext>
  </StrictMode>
);
