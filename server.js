const express=require("express");
const connectDB=require('./config/db');
const app=express();
const cors=require('cors')
//connect db
connectDB();

// Enable CORS with all origins allowed
app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


// middleware
app.use(express.json({extended:false}))
const PORT=process.env.PORT || 5000
app.get('/',(req,res)=>{
    res.send("API is running");
});

// using routes

app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
});