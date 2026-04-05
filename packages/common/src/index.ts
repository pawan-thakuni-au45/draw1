
import {z} from "zod"
export const createUser=z.object({
    email:z.string().min(3).max(20),
    password:z.string().min(3).max(20),
    name:z.string().min(3).max(20)

})

export const signinUser=z.object({
    email:z.string().min(3).max(20)
})

export const createRoom=z.object({
    name:z.string()
})