import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
