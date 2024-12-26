import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoverPg from "./components/cover";
import AIChat from "./components/chatbot";

// Setting up routes and rendering the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CoverPg />} />
      <Route path="/chat" element={<AIChat />} />
    </Routes>
  </BrowserRouter>
);
