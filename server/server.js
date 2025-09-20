const express= require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/Task");
dotenv.config();

const app = express();
app.use(cors());

// Middleware
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// create a new task [save()]
app.post("/api/tasks",async (req,res)=>{
  try{
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  }catch(err){
    res.status(400).json({error: err.message});
  }
});

// Get all tasks [find()]
app.get("/api/tasks",async (req,res)=>{
  try{
    const tasks = await Task.find();
    res.json(tasks);
  }catch(err){
    res.status(500).json({error:err.message});
  }
});
// get Task by their id [findById()]
app.get("/api/tasks/:id",async (req,res)=>{
  try{
    const task = await Task.findById(req.params.id);
    if(!task)return res.status(404).json({error:"Task not found"});
    res.json(task);
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

// update task by their id[findByIdAndUpdate]
app.put("/api/tasks/:id", async (req,res)=>{
  try{
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
    {new: true,runValiddators:true}
  );
  if(!task)return res.status(404).json({error:"Task not found"});
  res.json(task);

  }catch{
    res.status(400).json({error:err.message});
  }
});

// find by id and delete[findByIdAndDelete()]
app.delete("/api/tasks/:id", async (req,res)=>{
  try{
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!Task)return res.status(404).json({error:"Task not found"});
    res.json({message:"Task deleted successfully",task});
  }catch{
    res.status(400).json({error:err.message});
  }
});

