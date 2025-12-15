import { useEffect } from "react";
import Auth from "../components/Auth";
import Quotes from "../components/Quotes";
import { useNavigate } from "react-router-dom";
export const Signin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/blogs", { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signin" />
        </div>
        <div className="hidden lg:block">
          <Quotes />
        </div>
      </div>
    </div>
  );
};

export default Signin;
