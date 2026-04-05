
import express from "express"
import { JWT_SECRET } from "@repo/common-backend/config"
import jwt from "jsonwebtoken"
import { userMiddlewear } from "./userMiddlewear"
import { prismaClient } from "@repo/db/config"
import { createRoom, createUser, signinUser } from "@repo/common/config"
const app = express()
app.use(express.json())

app.post('/signup',async (req, res) => {

    const dataparser = createUser.safeParse(req.body)
    if (!dataparser.success) {
        res.json({
            message: "unauthorized"
        })
        return
    }
    try {
        const user = await prismaClient.user.create({
            data: {
                email: dataparser.data?.email,
                password: dataparser.data?.password,
                name: dataparser.data?.name
            }
        })
        res.json({
            userId:user.id,
            message:"user signup succesfully"
        })
        

       

    } catch (e) {
        res.json({
            message: "user already exist with this username"
        })

    }



});

app.post('/signin', async(req, res) => {

        const dataparser = signinUser.safeParse(req.body)
    if (!dataparser.success) {
        res.json({
            message: "unauthorized"
        })
        return
    }
    const user=await prismaClient.user.findFirst({
        where:{
            email:dataparser.data?.email
        }
    })
    if(!user){
        res.json({
            message:"user not authorized"
        })
        return
    }
    const token = jwt.sign({
        userId:user?.id
    }, JWT_SECRET)

    res.json({
        token
    })

})

app.post('/room',userMiddlewear,async (req, res) => {
         const dataparser = createRoom.safeParse(req.body)
    if (!dataparser.success) {
        res.json({
            message: "unauthorized"
        })
        return
    } 
//@ts-ignore
    const userId=req.userId
    try{
          const room=await prismaClient.room.create({
        data:{
            slug:dataparser.data.name,
            adminId:userId
        }
    })
    res.json({
        roomId:room.id,
        message:"room created"
    })

    }catch(e){
        res.json({
            message:"error"
        })
    }
  

})
app.listen(3003)