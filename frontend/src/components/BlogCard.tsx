import { Link } from "react-router-dom";

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-400" />;
}

export function Avatar({
  name,
  size = "small",
}: {
  name?: string;
  size?: "small" | "big";
}) {
  const initials = name
    ? name
        .trim()
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("")
    : "?";

  const sizeClasses =
    size === "small" ? "w-6 h-6 text-xs" : "w-10 h-10 text-sm";

  return (
    <div
      title={name || "Anonymous"}
      aria-label={name || "Anonymous user"}
      className={`inline-flex shrink-0 items-center justify-center 
        rounded-full bg-slate-700 text-white font-semibold select-none ${sizeClasses}`}
    >
      {initials}
    </div>
  );
}

interface BlogCardProps {
  authorname: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  authorname,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  const readingTime = Math.max(1, Math.ceil(content.length / 200));

  return (
    <Link to={`/blog/${id}`}>
      <article className="border-b border-slate-200 py-6 cursor-pointer hover:bg-slate-50 transition">
        {/* Meta */}
        <div className="flex items-center text-sm text-slate-600 gap-2">
          <Avatar size="small" name={authorname} />
          <span className="font-medium text-slate-800">{authorname}</span>
          <Circle />
          <span>{publishedDate}</span>
        </div>

        {/* Title */}
        <h2 className="mt-2 text-2xl font-semibold leading-snug text-slate-900">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="mt-2 text-slate-700 leading-relaxed">
          {content.slice(0, 140)}…
        </p>

        {/* Footer */}
        <div className="mt-4 text-sm text-slate-500">
          {readingTime} min read
        </div>
      </article>
    </Link>
  );
};
