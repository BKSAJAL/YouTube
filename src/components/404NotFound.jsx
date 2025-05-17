import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();
  return (
    // 404 page not found
    <div className="flex flex-col gap-6 justify-center items-center text-black min-h-screen backdrop-blur-xl bg-gray-200">
      <h1 className="text-4xl sm:text-6xl font-semibold drop-shadow-md text-center p-2">
        😓 Oops! 404 Page Not Found
      </h1>
      <p className="text-lg sm:text-2xl text-center max-w-md">
        The page you're looking for seems to be missing from our collection.
      </p>
      <button
        onClick={() => navigate("/", { replace: true })}
        className="mt-4 px-4 py-2 text-lg bg-black/40 text-white rounded-lg hover:bg-black/50 hover:cursor-pointer"
      >
        🏠 Home Page
      </button>
    </div>
  );
}

export default NotFound;
