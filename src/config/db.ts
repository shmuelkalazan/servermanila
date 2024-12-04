import { connect } from "mongoose";
import "dotenv/config"
export const conectToMongo = async ()=> {
    try {
        connect('mongodb+srv://semikalazan:2rvubmrA6okOG0b5@cluster0.6xklg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log("connect To mongo")
        
    } catch (error) {
        console.log("can't conect to mongo " ,error)
    }
}