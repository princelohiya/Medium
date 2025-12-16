import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { sign, verify, decode } from "hono/jwt";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

//@ts-ignore // to ignore the error of next line

const prisma = new PrismaClient().$extends(withAccelerate());

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Add CORS middleware first - covers all API routes
app.use(cors()); // Enable CORS for all routes by default

app.get("/", (c) => {
  return c.text("Hello Hono");
});
app.route("/api/v1/user", userRouter);
app.route("api/v1/blog", blogRouter);

export default app;
