import { Hono } from "hono"
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import {sign , verify, decode} from 'hono/jwt';
import zod from "zod"
import { signupInput , signinInput } from "@princelohia/medium-common";

export const userRouter = new Hono<{
    Bindings  : {
        DATABASE_URL : string;
        JWT_SECRET : string;
    }
}>();

userRouter.get('/', (c)=>{
    return c.text("Hello hono")
})

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL, // this env doesn't mean .env file >> this env == wrangler.jsnoc >> env means environment for cloudflare worker it's env variables are present in wrangler.jsonc
}).$extends(withAccelerate())

const body =  await c.req.json()

await prisma.user.create({
  data: {
    name: body.name,
    email: body.email,
    password: body.password,
  },
})

const token = await sign({ id : body.id }, c.env.JWT_SECRET) 

return c.json({
  message: "User created successfully",
  token : token
})

})

userRouter.post('/signin', async (c) => {

  const body =  await c.req.json()
  const success  = signinInput.safeParse(body);

  if(!success){
    c.status(403)
    return c.json({
      msg : "invalid credentials"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate()) 


  try {
    const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password : body.password
    },
  })
  console.log("After db call")

  if(!user){
    c.status(403)
    return c.json({
      myError : "User doesn't exist"
    })
  }

  const jwt = await sign({id : user.id} , c.env.JWT_SECRET)
  return c.json({ jwt });
  }

  catch(e){
	  c.status(403);
		return c.json({ error: "error while signing up" });
  }

})