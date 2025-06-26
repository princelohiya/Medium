import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import dotenv from 'dotenv';
import {sign , verify, decode} from 'hono/jwt';
import { constSelector } from 'recoil';

//@ts-ignore // to ignore the error of next line

dotenv.config();

const prisma = new PrismaClient().$extends(withAccelerate());

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()

app.get('/', (c) => {
  
console.log();


  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
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


app.post('/api/v1/user/signin', async (c) => {

  const body =  await c.req.json()

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate()) 

  try {
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password : body.email
    },
  })

  if(!user){
    c.status(403)
    return c.json({
      myError : "User doesn't exist"
    })
  }
  if (user.password != body.password) {
    c.status(401)
    return c.json({
      myError : "Given password didn't matched"
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

app.post('/api/v1/blog', (c) =>{
 return c.json({
    message : "blogs are here"
  })
})

app.put('/api/v1/blog', (c)=>{
  return c.text("blog put end point")
})

app.get('/api/v1/blog/:id', (c)=>{
  const id = c.req.param('id')
  return c.text("blog get end point")
})

app.get('/api/v1/blog/bulk' , (c)=>{
 return c.text("bulk end point")  
})


export default app
