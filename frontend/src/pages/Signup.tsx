import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../components/Auth";
import Quotes from "../components/Quotes";

export const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/blogs", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Auth type="signup" />
      </div>
      <div className="hidden lg:block">
        <Quotes />
      </div>
    </div>
  );
};

export default Signup;
