import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />

      <div className="flex justify-center">
        <div className="w-full max-w-screen-xl px-4 md:px-6 pt-10 md:pt-7">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            {/* ===== MAIN CONTENT ===== */}
            <div className="md:col-span-8">
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                {blog.title}
              </h1>

              <div className="text-slate-600 mt-3 text-sm">
                Published on {formatDate(blog.createdAt)}
              </div>

              <hr className="my-2.5 border-slate-200" />

              <div className="text-base md:text-lg leading-relaxed text-slate-800 whitespace-pre-line ">
                {blog.content}
              </div>
            </div>

            {/* ===== DIVIDER (DESKTOP ONLY) ===== */}
            <div className="hidden md:flex md:col-span-1 justify-center">
              <div className="w-[1px] bg-slate-300 h-full" />
            </div>

            {/* ===== AUTHOR SECTION ===== */}
            <div className="md:col-span-3">
              <div className="border-t md:border-none pt-6 md:pt-0">
                <div className="text-slate-600 text-xs font-semibold mb-4 uppercase tracking-wide">
                  Author
                </div>

                <div className="flex items-start gap-4">
                  <Avatar size="small" name={blog.author.name || "Anonymous"} />

                  <div>
                    <div className="text-base font-bold">
                      {blog.author.name || "Anonymous"}
                    </div>

                    <div className="mt-2 text-slate-500 text-sm leading-relaxed">
                      Writes thoughtful articles focused on clarity,
                      fundamentals, and real-world understanding.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
