import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@princelohia/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// -------------------- AUTH MIDDLEWARE --------------------
blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    c.status(403);
    return c.json({ msg: "Missing or invalid token" });
  }

  const token = header.split(" ")[1];

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    c.set("userId", user.id as string);
    return next();
  } catch (e) {
    c.status(403);
    return c.json({ msg: "Invalid token" });
  }
});

// -------------------- CREATE POST --------------------
blogRouter.post("/", async (c) => {
  const body = await c.req.json();

  const parsed = createPostInput.safeParse(body);
  if (!parsed.success) {
    c.status(411);
    return c.json({ msg: "Invalid blog input" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("userId"),
    },
  });

  return c.json({ id: blog.id });
});

// -------------------- UPDATE POST --------------------
blogRouter.put("/", async (c) => {
  const body = await c.req.json();

  const parsed = updatePostInput.safeParse(body);
  if (!parsed.success) {
    c.status(411);
    return c.json({ msg: "Invalid update input" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Optional: Only allow author to update his post
  const updated = await prisma.post.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({ msg: "Post updated", updated });
});

// -------------------- GET ALL POSTS --------------------
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log("BACKEND BLOG SAMPLE:", blogs[0]);

  return c.json({ blogs });
});

// -------------------- GET SINGLE POST --------------------
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.findFirst({
    where: { id },
    include: { author: true },
  });

  if (!blog) {
    c.status(404);
    return c.json({ msg: "Post not found" });
  }

  return c.json({ blog });
});
