"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("express");
const db_1 = require("./config/db");
const submitController_1 = __importDefault(require("./controller/submitController"));
const router = (0, express_2.Router)();
exports.app = (0, express_1.default)();
const port = 5000;
(0, db_1.conectToMongo)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use("/api", submitController_1.default);
exports.app.use("/", router.get("/ping", (req, res) => {
    res.send('pong');
}));
exports.app.listen(port, () => {
    console.log("server run on port " + port);
});
