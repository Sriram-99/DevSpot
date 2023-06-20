const mongoose =require("mongoose");
const config=require('config');
const db=config.get('mongoURI');

const connectDB=async ()=>{
    try{
    //    await mongoose.connect(db,{
    //     useNewUrlParser:true,
    //     useCreateIndex:true
    //    });
    mongoose.connect("mongodb://0.0.0.0:27017/devspot");
       console.log("Mongodb is connected")
    }
    catch(err){
     console.error(err.message);
     // exiting process when failure
     process.exit(1);
    }
};
module.exports=connectDB;