import { json, Request, Response } from "express";
import { submitService } from "../service/submitService";

export const submitRouter = async(req:Request ,res:Response) =>{
    try {
        const newForm = await submitService(req.body)
        res.status(201)
        res.json(newForm)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}