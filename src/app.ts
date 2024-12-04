import express from"express"
import cors from "cors"
import { json, Request, Response } from "express";
import { Router } from "express";
import { conectToMongo } from "./config/db";
import submitController from './controller/submitController'
const router = Router()
export const app = express()

const port = 5000

conectToMongo()

app.use(express.json())
app.use(cors())
app.use("/api" ,submitController)

app.use("/" ,router.get("/ping",(req:Request , res:Response)=>{
    res.send('pong')
}))


app.listen(port , ()=> {
    console.log("server run on port " +port)
})