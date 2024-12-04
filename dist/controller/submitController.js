"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const submitRout_1 = require("../routers/submitRout");
const router = (0, express_1.Router)();
router.post("/", submitRout_1.submitRouter);
exports.default = router;
