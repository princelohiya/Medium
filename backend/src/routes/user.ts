import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@princelohia/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.get("/", (c) => {
  return c.text("Hello hono");
});

userRouter.get("/me", async (c) => {
  const authHeader =
    c.req.header("Authorization")?.replace("Bearer ", "") || "";
  const user = await verify(authHeader, c.env.JWT_SECRET);

  if (!user) {
    c.status(401);
    return c.json({ msg: "Unauthorized" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id as string },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      posts: {
        orderBy: {
          createdAt: "desc", // Newest posts first
        },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
        },
      },
    },
  });

  return c.json({ user: dbUser });
});
// --------------------- SIGNUP ---------------------
userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const parsed = signupInput.safeParse(body);
  if (!parsed.success) {
    c.status(403);
    return c.json({ msg: "invalid signup inputs" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const findUser = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (findUser) {
    c.status(403);
    return c.json({ msg: "User already exists" });
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    message: "User created successfully",
    token,
  });
});

// --------------------- SIGNIN ---------------------
userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  const parsed = signinInput.safeParse(body);
  if (!parsed.success) {
    c.status(403);
    return c.json({ msg: "invalid credentials" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ msg: "User not found" });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({ token });
});
