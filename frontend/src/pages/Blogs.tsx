import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

function formatDate(dateString?: string) {
  if (!dateString) return "Unknown date";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <div>
      <Appbar />

      <div className="flex justify-center">
        <div className="w-full max-w-screen-md px-4 py-8">
          {loading && (
            <>
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
            </>
          )}

          {!loading && blogs.length === 0 && (
            <div className="text-center text-slate-500 mt-20">
              No blogs published yet.
            </div>
          )}

          {!loading &&
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorname={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={formatDate(blog.createdAt)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
