import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          Welcome to Workcity CRM
        </h1>
        <p className="text-gray-700 mb-6">
          Manage your clients and projects effortlessly. Keep track of important
          details, stay organized, and improve your workflow.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg shadow transition"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
