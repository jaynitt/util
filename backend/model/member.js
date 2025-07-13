import mongoose from "mongoose";
const memberschema=new mongoose.Schema({
    name:{type:String,required:true},
    role:{type:String,required:true},
    type:{type:String,
        enum:["Core", "Manager", "Coordinator"],},
    image:{type:String},
    linkedin:{type:String},
    descripton:{type:String},
})

const membermodel=mongoose.model("member",memberschema)
export default membermodel;