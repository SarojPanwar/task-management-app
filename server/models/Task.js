const mongoose = require("mongoose");

// define schema fields
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        default:""
    },
    status:{
        type:String,
        enum:["pending","in-progress","completed"],
        default:"pending"
    },
    dueDate:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now  //auto-set current date
    }
});
 //export model
 const Task = mongoose.model("Task",taskSchema);
 module.exports = Task;