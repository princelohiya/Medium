import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signin = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Auth type="Signin"></Auth>
      </div>
      <div className=" lg:visible">
        <Quote></Quote>
      </div>
    </div>
  );
};
