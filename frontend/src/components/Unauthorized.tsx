import { useNavigate } from "react-router-dom";

export const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md text-center p-8 bg-white rounded-xl shadow-sm border">
        <div className="text-6xl font-extrabold text-gray-800">401</div>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">Access Denied</h1>

        <p className="mt-3 text-gray-600">
          You are not logged in or do not have permission to access this
          resource.
        </p>

        <p className="mt-1 text-gray-500 text-sm">
          Please sign in to continue.
        </p>

        <button
          onClick={() => navigate("/signin")}
          className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
