import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#090979] to-[#00d4ff]">
          404
        </h1>
        <h2 className="text-2xl text-white mt-4">Page Not Found</h2>
        <p className="text-gray-400 mt-2 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-[#090979] to-[#00d4ff] rounded-lg text-white hover:opacity-90 transition-all duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
