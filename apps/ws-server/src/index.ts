
import { WebSocket, WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/common-backend/config";
import jwt from "jsonwebtoken"
import {prismaClient} from "@repo/db/config"
const wss = new WebSocketServer({ port: 3030 })

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users: User[] = []

function checkUser(token: string): string | null {



    try {
        const decoded = jwt.verify(token, JWT_SECRET)


        if (typeof decoded == "string") {
            return null
        }

        if (!decoded || !decoded.userId) {
            return null
        }

        return decoded.userId
    } catch (e) {
        return null
    }
    return null
}
wss.on('connection', function connection(ws, request) {
    const url = request.url
    if (!url) {
        return
    }
    const query = new URLSearchParams(url.split('?')[1])
    const token = query.get('token') || ""
    const userId = checkUser(token)

    if (userId == null) {
        ws.close()
        return
    }

    users.push({
        userId,
        rooms: [],
        ws

    })

    ws.on('message', async function message(data) {
        const parseData = JSON.parse(data as unknown as string)
        if (parseData.type === "join_room") {
            const user = users.find(x => x.ws === ws)
            user?.rooms.push(parseData.roomId)
        }

        if (parseData.type === "leave_room") {
            const user = users.find(x => x.ws === ws)
            if (!user) {
                return
            }
            user.rooms = user?.rooms.filter(x => x === parseData.room)
        }

        if (parseData.type === "chat") {
            const roomId = parseData.roomId
            const message = parseData.message

          await prismaClient.chat.create({
            data:{
                roomId,
                message,
                userId
            }
           })

            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            })
        }
    })
})