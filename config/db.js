const mongoose =require("mongoose");
const config=require('config');
const db=config.get('mongoURI');

const connectDB=async ()=>{
    try{
    //    await mongoose.connect(db,{
    //     useNewUrlParser:true,
    //      useFindAndModify:false,
    //     useCreateIndex:true
    //    });

    //sriram
    mongoose.connect("mongodb://0.0.0.0:27017/devspot");
       console.log("Mongodb is connected")
    }

    //madhav
    // mongoose.connect("mongodb://localhost:27017/devspot");
    // console.log("Mongodb is connected")
    // }
    catch(err){
     console.error(err.message);
     // exiting process when failure
     process.exit(1);
    }
    
};
module.exports=connectDB;