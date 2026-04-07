import { useEffect, useState } from "react";
import { WS_url } from "../app/config";



export function useSocket(){
    const [loading,setLoadiing]=useState<boolean>(true)
    const [socket,setSocket]=useState<WebSocket>()

    useEffect(()=>{
        const ws=new WebSocket(`${WS_url}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmM2Y1OGFjZS05NzU2LTQ0NjktOGQ5Zi00MjE4YTdlZWRjYmMiLCJpYXQiOjE3NzU1NTY0NjZ9.r0_r7RR34Mz9UQX-ZRWBXCKdrEHT4ZXPvYxMjU-v9rY`)
        ws.onopen=()=>{
            setLoadiing(false)
            setSocket(ws)
        }
    },[])

    return{
        socket,
        loading
    }

}