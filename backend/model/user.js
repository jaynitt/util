import mongoose  from "mongoose";

const userschema=new mongoose.Schema({
    name:{type:String,required:true},
    password:{type:String ,required:true},
    email:{type:String,required:true,unique:true}
})


const user=mongoose.model("user",userschema)

export default user;