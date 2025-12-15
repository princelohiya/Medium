import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/BlogCard";

interface User {
  name: string | null;
  email: string;
  createdAt: string;
}

export const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <>
        <Appbar />
        <div className="flex justify-center mt-20 text-slate-500">
          Loading profile…
        </div>
      </>
    );
  }

  if (!user) return null;

  return (
    <div>
      <Appbar />

      <div className="flex justify-center">
        <div className="w-full max-w-screen-md px-4 pt-16">
          <div className="flex items-center gap-6">
            <Avatar size="big" name={user.name || "A"} />

            <div>
              <h1 className="text-2xl font-bold">{user.name || "Anonymous"}</h1>
              <p className="text-slate-600">{user.email}</p>
            </div>
          </div>

          <hr className="my-8 border-slate-200" />

          <div className="text-slate-600 text-sm">
            Member since{" "}
            <span className="font-medium">{formatDate(user.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
