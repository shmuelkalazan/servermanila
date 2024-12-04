"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectToMongo = void 0;
const mongoose_1 = require("mongoose");
require("dotenv/config");
const conectToMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, mongoose_1.connect)('mongodb+srv://semikalazan:2rvubmrA6okOG0b5@cluster0.6xklg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("connect To mongo");
    }
    catch (error) {
        console.log("can't conect to mongo ", error);
    }
});
exports.conectToMongo = conectToMongo;
