import { Router } from "express";
import { submitRouter } from "../routers/submitRout";

const router = Router()
router.post("/" ,submitRouter)

export default router