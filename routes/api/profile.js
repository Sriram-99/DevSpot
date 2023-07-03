const express=require("express");
const router=express.Router();
const request=require('request');
const config=require('config');


const auth=require("../../middleware/auth")
const Profile =require("../../models/Profile")
const User=require("../../models/User")
const {check,validationResult}=require('express-validator');
//  git request api/profile/me
// this page is private
router.get('/me',auth,async(req,res)=>{
   
   try {
    console.log("hello in server ")
    const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);

    if(!profile){
        // even if you have name and avatar added if you don't have profile it won't it shows empty
        return res.status(400).json({msg:"There is no profile for this user"});
    }
    res.json(profile);
   } 
   catch (err) {
    console.log(err);
    res.status(500).send('server error')
   }
});


// post api/profile

// when there are two middlewers use []
router.post('/',[auth,[
    check('status',"Status is required").not().isEmpty(),
    check('skills','Skills is required').not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req);
    console.log("hello in post profile");
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {company,website,location,bio,status,githubusername,skills,youtube,facebook,twitter,instagram,linkedin}=req.body;

    // build profile object
    const profileFields={};
    profileFields.user=req.user.id;
    if(company) profileFields.company=company;
    if(website) profileFields.website=website;
    if(location) profileFields.location=location;
    if(bio) profileFields.bio=bio;
    if(status) profileFields.status=status;
    if(githubusername) profileFields.githubusername=githubusername;
    console.log(skills);
    // if(skills) profileFields.skills=skills.split(',').map(skill=>skill.trim());
    if (typeof skills === 'string') {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
      } else {
        profileFields.skills = skills;
      }
      
    // buil social object
    profileFields.social={};
    if(youtube) profileFields.social.youtube=youtube;
    if(twitter) profileFields.social.twitter=twitter;
    if(facebook) profileFields.social.facebook=facebook;
    if(linkedin) profileFields.social.linkedin=linkedin;
    if(instagram) profileFields.social.instagram=instagram;
     try {
        let profile= await Profile.findOne({user:req.user.id});
        if(profile){
            // update
            profile=await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true});
            return res.json(profile);
        }
        //create
        profile=new Profile(profileFields);
        await profile.save();        //
        res.json(profile)
        
     } 
     catch (err) {
        
        console.log(err);
        res.status(500).send('Server Error')
     }
})

// get api/router

router.get('/',async(req,res)=>{
    try{
        const profiles=await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    }
    catch(err){
        console.log(err);
        res.status(500).send('server Error');
    }
})

// get api/profile/user/user_id
// profile by user id

router.get('/user/:user_id',async(req,res)=>{
    try{
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({ msg: 'Profile not found' });

        }
         return  res.json(profile);
    }
    catch(err){
        console.log(err);
        if(err.kind=='ObjectId'){
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('server Error');
    }
})

// delete  api/profile/user
// profile by user id

router.delete('/',auth,async(req,res)=>{
    try{
        // remove profile
       
        await Profile.findOneAndRemove({ user: req.user_id });
        // Remove user
        await User.findOneAndRemove({_id:req.user.id});
       res.json({msg:'User deleted'});
    }
    catch(err){
        console.log(err);
        if(err.kind=='ObjectId'){
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('server Error');
    }
})

// put  api/profile/experience
// add profile experience

router.put('/experience',[auth,[
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','From is required').not().isEmpty()
    
]],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    console.log(req.body);
    const {title,company,location,from,to,current,description}=req.body;
    const newExp={title,company,location,from,to,current,description};
    try {
        const profile= await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
})

// delete   api/profile/experience/:exp_id
// delete  experience
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
      profile.experience.splice(removeIndex, 1);
  
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  });

                                        // education
 
// put  api/profile/education
// add profile education

router.put('/education',[auth,[
    check('school','school is required').not().isEmpty(),
    check('degree','Degree is required').not().isEmpty(),
    check('fieldofstudy','field of study is required').not().isEmpty(),
    check('from','From is required').not().isEmpty()
    
]],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {school,degree,fieldofstudy,from,to,current,description}=req.body;
    const newEdu={school,degree,fieldofstudy,from,to,current,description};
    try {
        const profile= await Profile.findOne({user:req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
})


// delete   api/profile/education/:exp_id
// delete  experience
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
      profile.education.splice(removeIndex, 1);
  
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  }); 

   // get   api/profile/github/:username
   // get   get user repos from github

   router.get('/github/:username', (req, res) => {
    try {
      const options = {
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
        method: 'GET',
        headers: { 'user-agent': 'node.js' }
      };
      request(options, (err, response, body) => {
        if (err) console.log(err);
        if (response.statusCode != 200) {
          return res.status(404).json({ msg: "No GitHub profile found" });
        }
        res.json(JSON.parse(body));
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  });
  


module.exports=router;