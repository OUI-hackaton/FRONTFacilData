import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Chatbot POC</h1>
      <Link
        to="/scan"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Scan QR
      </Link>
    </div>
  );
};

export default Home;
