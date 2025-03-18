import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import TechFile from "./pages/TechFile";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <div className="app min-h-screen flex flex-col bg-gray-100 p-4 mx-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/file" element={<TechFile />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
