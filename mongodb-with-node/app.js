const express = require("express");
const colors = require("colors")
require("dotenv").config()
const app =express();
const PORT = process.env.PORT;
const db   = process.env.DATABASE_URL
const mongoose = require("mongoose");
mongoose.connect(db,{ useFindAndModify: false,useUnifiedTopology: true ,useNewUrlParser: true });
mongoose.connection.once("open",err=>{
    if(err){
        console.log(err);
    }else{
        console.log(colors.bgBlue.white("Database connected Successfully"));
    }
})

const courseSchema = new mongoose.Schema({
    courseName:String,
    duration:Number
})

const courseModel =  mongoose.model("course",courseSchema)

// const course = new courseModel({
//     courseName:"Javascript",
//     duration:3
// })

// course.save((err,course)=>{
//     if(err){
//         console.log(err);
        
//     }else{
//         console.log(course);
        
//     }
// })


app.use(express.json())


app.get("/",async(req,res)=>{
    await courseModel.find({},(err,course)=>{
        if(err){
            console.log(err);
        }else{
            res.send(course)
        }
    })

})

app.post ("/course",async( req,res)=>{
    await courseModel.create(await req.body , (err, course)=>{
        if(err){
            console.log(err);
            
        }else{
            // console.log(course);
            res.send(course)
        }
    })
})

app.get("/course/:id",async (req,res)=>{
    await courseModel.findById(req.params.id , (err, course)=>{
        if(err){
            console.log(err);
            
        }else{
            // console.log(course);
            res.send(course)
        }
    })
  
})

app.put("/course/:id",async (req,res)=>{
    await courseModel.findByIdAndUpdate(req.params.id,await req.body , (err, course)=>{
        if(err){
            console.log(err);
            
        }else{
            //  console.log(course);
             res.send(course)
    
            
        }
    })
    

})


app.delete("/course/:id",(req,res)=>{
     courseModel.findByIdAndRemove(req.params.id ,(err , course)=>{
        if(err){
            console.log(err);
        }else{
            res.send(course)
        }
    })
   
})

app.listen(PORT,_=>console.log(colors.bgGreen.white(`server is running on the PORT ${PORT}`)))