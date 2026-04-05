import { JWT_SECRET } from "@repo/common-backend/config";
import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken"

export const userMiddlewear=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers["authorization"] ||""
    const decoded=jwt.verify(token,JWT_SECRET)
    if(!decoded){
        return
    }
    //@ts-ignore
    req.userId=decoded.userId
    next()

}