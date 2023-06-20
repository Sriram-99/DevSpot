const express=require("express");
const router=express.Router();

//register user
router.post('/',(req,res)=>{
    console.log(req.body);
    res.send('user route');
})

module.exports=router;