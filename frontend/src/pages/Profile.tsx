import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/BlogCard";

export const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUser(res.data.user))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ProfileSkeleton />;
  if (!user)
    return (
      <div className="p-10 text-center text-slate-500">
        User session not found.
      </div>
    );

  // Derived Stats
  const totalWords = user.posts.reduce(
    (acc: number, post: any) => acc + post.content.split(" ").length,
    0
  );
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      <Appbar />
      <div className="max-w-screen-md mx-auto px-6 py-16">
        {/* Identity Section */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <Avatar size="big" name={user.name || "A"} />
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              {user.name || "Anonymous"}
            </h1>
            <p className="text-slate-500">{user.email}</p>
          </div>
          <button className="text-sm px-5 py-1.5 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
            Edit Profile
          </button>
        </div>

        <hr className="border-slate-200 mb-12" />

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <StatBox label="Stories" value={user.posts.length} />
          <StatBox label="Member Since" value={joinedDate} isText />
          <StatBox label="Word Count" value={totalWords.toLocaleString()} />
        </div>

        {/* Biography / About Section */}
        <div className="mt-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 text-center">
            About Author
          </h2>
          <div className="bg-slate-50 rounded-2xl p-8 text-slate-700 leading-relaxed text-center italic">
            "Writing is the painting of the voice. Passionate about sharing
            thoughts through words and connecting with a global community of
            readers."
          </div>
        </div>

        {/* Quick Footer Stats */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center gap-8 text-xs font-medium text-slate-400">
          <p>VERIFIED ACCOUNT</p>
          <p>•</p>
          <p>{user.posts.length > 5 ? "TOP CONTRIBUTOR" : "WRITER"}</p>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Component
const StatBox = ({
  label,
  value,
  isText = false,
}: {
  label: string;
  value: any;
  isText?: boolean;
}) => (
  <div className="flex flex-col space-y-1">
    <p
      className={`${isText ? "text-lg" : "text-2xl"} font-bold text-slate-900`}
    >
      {value}
    </p>
    <p className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">
      {label}
    </p>
  </div>
);

const ProfileSkeleton = () => (
  <div className="animate-pulse flex flex-col items-center mt-24">
    <div className="w-20 h-20 bg-slate-100 rounded-full mb-4" />
    <div className="h-6 w-32 bg-slate-100 rounded mb-2" />
    <div className="h-4 w-48 bg-slate-50 rounded" />
  </div>
);

export default Profile;
