import { Env, Hono } from "hono"
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import {sign , verify, decode} from 'hono/jwt';
import { createPostInput , updatePostInput } from "@princelohia/medium-common";


export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string;
        JWT_SECRET: string;
    }
    Variables : {
        userId  : string 
    }
}>();

blogRouter.use("/*", async (c,  next)=>{
    const authHeader = c.req.header("Authorization") || ""
    const user = await verify(authHeader, c.env.JWT_SECRET)
    if(user){
        c.set("userId", user.id as string)
        await next()
    }else{ 
        c.status(403)
        return c.json({
            msg : "You are not logged in"
        })
    }
})


blogRouter.post('/', async (c) =>{
    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog  = await prisma.post.create({
        data: {
            title : body.title,
            content : body.content,
            authorId : body.authorId
        }
    })
    return c.json({
        id : blog.id
    })
})

blogRouter.put('/', async (c)=>{
    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
        where : {
            id : body.id
        },
        data: {
            title : body.title,
            content : body.content,
            authorId : "eb50470b-8dbd-451d-abd7-46c3a3bbc564"
        }
    })


  return c.text("blog put end point")

})

blogRouter.get('/:id', async (c)=>{
  const id = c.req.param('id')
  const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.post.findFirst({
            where : {
                id : id
            }
        })
        return c.json({
            blog
        })
    }catch(e){
        c.status(411)
        return c.json({
            msg : "Error while fetchning "
        })
    }
})


// Todo : add pagination
blogRouter.get('/bulk' , async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany();
    return c.json({
        blogs
    })
})

