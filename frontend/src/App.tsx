import { Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />

      {/* Protected routes */}
      <Route
        path="/blogs"
        element={
          <ProtectedRoute>
            <Blogs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/blog/:id"
        element={
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/publish"
        element={
          <ProtectedRoute>
            <Publish />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
