import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Send } from "lucide-react";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!title.trim() || !description.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate(`/blog/${response.data.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Appbar />

      <div className="flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-slate-200">
          {/* Header */}
          <div className="border-b px-6 py-4">
            <h1 className="text-xl font-semibold text-slate-800">
              Create a new post
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Write clearly. Publish only when it’s worth reading.
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="A clear, specific headline"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <div className="text-xs text-slate-400 mt-1">
                {title.length}/120
              </div>
            </div>

            {/* Editor */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Content
              </label>
              <TextEditor onChange={(e) => setDescription(e.target.value)} />
              <div className="text-xs text-slate-400 mt-1">
                Be concise. Long content should still earn its length.
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t px-6 py-4 bg-slate-50 rounded-b-2xl">
            <span className="text-xs text-slate-500">
              Draft autosaved locally
            </span>
            <button
              onClick={handlePublish}
              disabled={loading || !title || !description}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <textarea
      onChange={onChange}
      rows={12}
      placeholder="Write your story…"
      className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-slate-900"
    />
  );
}
