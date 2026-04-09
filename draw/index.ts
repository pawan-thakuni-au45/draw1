// import { HTTP_BACKEND } from "@/config";
// import { start } from "repl";
// import axios from "axios"
// import { json } from "stream/consumers";


// type Shape = {
//     type: "rect",
//     x: number,
//     y: number,
//     width: number,
//     height: number
// } | {
//     type: "circle",
//     centerX: number,
//     centerY: number,
//     radius: number
// }
// export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {

//     const ctx = canvas.getContext("2d");

//     let existingShapes: Shape[] = await getExistingShapes(roomId)

//     if (!ctx) {
//         return
//     }
//     socket.onmessage = (event) => {  //"{type:chat,',message':''"
//         const message = JSON.parse(event.data)

//         if (message.type == "chat") {
//             const parseData = JSON.parse(message.message)
//             existingShapes.push(parseData)
//             clearCanvas(existingShapes, canvas, ctx)

//         }
//     }
//     clearCanvas(existingShapes, canvas, ctx)


//     ctx.fillStyle = "rgba(0,0,0)"
//     ctx.fillRect(0, 0, canvas.width, canvas.height)

//     let clicked = false
//     let startX = 0
//     let startY = 0
//     canvas.addEventListener("mousedown", (e) => {
//         clicked = true
//         startX = e.clientX,
//             startY = e.clientY
//     })

//     canvas.addEventListener("mouseup", (e) => {
//         clicked = false
//         const width = e.clientX - startX
//         const height = e.clientY - startY
//         const shape: Shape = {
//             ///@ts-ignore
//             type: window.selectedTool,
//             x: startX,
//             y: startY,
//             height,
//             width
//         }
//         existingShapes.push(shape)

//         socket.send(JSON.stringify({
//             type: "chat",
//             message: JSON.stringify({
//                 shape
//             }), roomId
//         })
//         )
//     })

//     canvas.addEventListener("mousemove", (e) => {
//         if (clicked) {
//             const width = e.clientX - startX
//             const height = e.clientY - startY

//             clearCanvas(existingShapes, canvas, ctx)
//             ctx.strokeStyle = "rgba(255,255,255)"
//             //@ts-ignore
//             const selectedTool = window.selectedTool;
//             if (selectedTool === "rect") {
//                 ctx.strokeRect(startX, startY, width, height)
//             } else if (selectedTool === "circle") {
                
//                 const radius = Math.max(width, height) / 2
//                 ctx.beginPath()
//                 ctx.arc(centerX, centerY, radius, 0, Math.PI * 2),
//                 ctx.stroke()
//                 ctx.closePath()
//             }


//         }
//     })
// }

// function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height),
//         ctx.fillStyle = "rgba(0,0,0)",
//         ctx.fillRect(0, 0, canvas.width, canvas.height)

//     existingShapes.map((shape) => {
//         if (shape.type === "rect") {
//             ctx.strokeStyle = "rgba(255,255,255)"
//             ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
//         }else if (selectedTool === "circle") {
//                 shape={

//                 }
//                 const radius = Math.max(width, height) / 2
//                 ctx.beginPath()
//                 ctx.arc(centerX, centerY, radius, 0, Math.PI * 2),
//                 ctx.stroke()
//                 ctx.closePath()
//             }
//     })

// }

// async function getExistingShapes(roomId: string) {
//     const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`)
//     const messages = res.data.messages

//     const shapes = messages.map((x: { message: string }) => {
//         const messagaData = JSON.parse(x.message)
//         return messagaData

//     })
//     return shapes

// }



import { BACKEND_URL } from "@/config";
import axios from "axios"
import { parse } from "path";
import { useState } from "react";

type Shape={
    type:"rect",
    x:number;
    y:number;
    width:number;
    height:number



} | {
    type:"circle",
    centerX:number;
    centerY:number;
    radius:number
}

export async function InitDraw(canvas:HTMLCanvasElement,roomId:string,socket:WebSocket){

    

      
            const ctx=canvas.getContext("2d")

            let existingShpaes:Shape[]=await  getallExistingShapes(roomId)
            console.log(existingShpaes,"shpaes");
            if(!ctx){
                return
            }
            socket.onmessage =(event)=>{
                const message=JSON.parse(event.data)

                if(message.type=="chat"){
                    const parsedShape=JSON.parse(message.message)
                    existingShpaes.push(parsedShape.shape)
            clearCanvas(existingShpaes,canvas,ctx)

                }
            }
            clearCanvas(existingShpaes,canvas,ctx)
           let clicked=false
           let startX=0;
           let startY=0;
            canvas.addEventListener("mousedown",(e)=>{
                clicked=true
                startX=e.clientX
                startY=e.clientY
            })
  
            canvas.addEventListener("mouseup",(e)=>{
                clicked=false
                const width=e.clientX-startX;
                const height=e.clientY-startY
                          //@ts-ignore
const selectedTool=window.selectedTool
let shape:Shape | null=null
if(selectedTool==="rect"){
shape={
                    type:"rect",
                    x:startX,
                    y:startY,
                    width,
                    height
}
         
}
                else if(selectedTool==="circle"){
                    const radius=Math.max(width,height)/2;
                    shape={
                        type:"circle",
                        radius:radius,
                        centerX:startX+radius,
                        centerY:startY+radius
                    }
                

                }
                if(!shape){
                    return 
                }

                existingShpaes.push(shape)


                socket.send(JSON.stringify({
                    type:"chat",
                    message:JSON.stringify({
                        shape
                    }),
                    roomId
                }))

               

        });
        canvas.addEventListener("mousemove",(e)=>{
            if(clicked){
               const width=e.clientX-startX;
               const height=e.clientY-startY;
               
              clearCanvas(existingShpaes,canvas,ctx)
               
               ctx.strokeStyle="rgba(255,255,255)"
               //@ts-ignore
               const selectedTool=window.selectedTool
               if(selectedTool==="rect"){
               ctx.strokeRect(startX,startY,width,height)
               }else if(selectedTool==="circle"){
                const radius=Math.max(width,height)/2;
                 const centerX=startX+radius
                 const centerY=startY+radius
                 
                 ctx.beginPath()
                 ctx.arc(centerX,centerY,radius,0,Math.PI*2)
                 ctx.stroke()
                 ctx.closePath()
               }
            }
})
}

function clearCanvas(existingShapes:Shape[],canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle="rgba(0,0,0)"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    existingShapes.map((Shape)=>{
        if(Shape.type==="rect"){
            ctx.strokeStyle="rgba(255,255,255)"
            ctx.strokeRect(Shape.x,Shape.y,Shape.width,Shape.height)

        } else if(Shape.type==="circle"){
            ctx.beginPath()
            ctx.arc(Shape.centerX,Shape.centerY,Shape.radius,0,Math.PI*2)
            ctx.stroke()
            ctx.closePath()
        }
    })
}


async function getallExistingShapes(roomId:string){
   const res= await axios.get(`${BACKEND_URL}/chats/${roomId}`)
   const messages= res.data.messages

   const shapes=messages.map((x:{message:string})=>{
    const messageData=JSON.parse(x.message)
    return messageData.shape
   })
   return shapes


}