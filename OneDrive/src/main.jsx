import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./ui/modal/ModalProvider";
import { GlobalModal } from "./ui/modal/GlobalModal";
import App from "./App";
import "./index.css";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <App />
        <GlobalModal />
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
