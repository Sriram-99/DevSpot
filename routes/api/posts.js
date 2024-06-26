const express=require("express");
const router=express.Router();
const {check,validationResult}=require('express-validator');
const auth =require('../../middleware/auth');

const Profile =require("../../models/Profile")
const User=require("../../models/User")
const Post=require("../../models/Post");

// post  api/post
router.post('/',[auth,[
    check('text',"Text is required").not().isEmpty(),

]],async(req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({error:errors.array()});
   }
   
   try{
    const user=await User.findById(req.user.id).select('-password');
   const newPost=new Post({
    text:req.body.text,
    name:user.name,
    avatar:user.avatar,
    user:req.user.id
   }) 
   const post=await newPost.save();
   res.json(post);

   }catch(err){
        console.log(err);
        res.status(500).send("server error");
   }
})

// get api/posts  all post 
// private

router.get('/',auth,async(req,res)=>{
    try {
        const posts=await Post.find().sort({date:-1});
        res.json(posts)

    } catch (err) {
        console.log(err);
        res.status(500).send("server error");
    }
})


// get api/posts/:id
// get post by id (post id)

router.get('/:id',auth,async(req,res)=>{
    try {
        const post =await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg:"Post not found"});
        res.json(post)
    } catch (err) {
        console.log(err);
        if(err.kind=='ObjectId') return res.status(404).json({msg:"Post not found"});
        res.status(500).send("server error");
    }
})

// delete api/posts/:id  
// private

router.delete('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }
  
      await Post.deleteOne({ _id: req.params.id });
      res.json({ msg: "Post removed" });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });
  
  // put api/posts/like/:id


router.put('/like/:id',auth,async(req,res)=>{
    try {
      console.log("hello in update likes")
        const post =await Post.findById(req.params.id);

        // check if post is already liked
        if(post.likes.filter(like=>like.user.toString() ===req.user.id).length>0){
                return res.status(400).json({msg:'Post already liked'});
        }
        post.likes.unshift({user:req.user.id});
        await post.save();
         return res.json(post.likes);
        
    } catch (err) {
        console.log(err);
        // if(err.kind=='ObjectId') return res.status(404).json({msg:"Post not found"});
        return res.status(500).send("server error");
    }
})
  
        // unlike
// put api/posts/unlike/:id


router.put('/unlike/:id',auth,async(req,res)=>{
  try {
      const post =await Post.findById(req.params.id);

      if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
      }
  
      // remove the like
      post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );
  
      await post.save();
  
      return res.json(post.likes);
  } catch (err) {
      console.log(err);
      // if(err.kind=='ObjectId') return res.status(404).json({msg:"Post not found"});
      return res.status(500).send("server error");
  }
})

// post  api/post/comment/:id
// comment on post
router.post('/comment/:id',[auth,[
    check('text',"Text is required").not().isEmpty(),

]],async(req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({error:errors.array()});
   }
   
   try{
    const user=await User.findById(req.user.id).select('-password');
    const post=await Post.findById(req.params.id);

   const newComment={
    text:req.body.text,
    name:user.name,
    avatar:user.avatar,
    user:req.user.id
   };
   post.comments.unshift(newComment);

    await post.save();
    res.json(post.comments);
   }catch(err){
        console.log(err);
        res.status(500).send("server error");
   }
})
//  delete   api/posts/comment/:id/:comment_id
// post id and comment id
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id);

    if (!comment) {
      return res.status(404).json({ msg: "Comment doesn't exist" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);
    post.comments.splice(removeIndex, 1);
    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Server error" });
  }
});

  
module.exports=router;