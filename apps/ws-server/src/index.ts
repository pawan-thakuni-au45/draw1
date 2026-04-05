
import { WebSocket, WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/common-backend/config";
import jwt from "jsonwebtoken"
const wss = new WebSocketServer({ port: 3000 })
wss.on('connection', function connection(ws, Request) {
    const url = Request.url
    if (!url) {
        return
    }
    const query = new URLSearchParams(url.split('?')[1])
    const token = query.get('token')
    const decoded = jwt.verify(token, JWT_SECRET)
    ws.on('message', (data) => {
        wss.send()
    })
})