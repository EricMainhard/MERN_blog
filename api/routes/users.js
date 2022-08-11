const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

//UPDATE
router.put("/:id", async (req,res) => {
    if(req.body.userId === req.params.id){
        if (req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,{
                    $set: req.body
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch(e){
            res.json(e);
        }
    } else {
        res.status(401).json("You can only update you're account!");
    }

})

//DELETE

router.delete("/:id", async (req,res) => {
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.body.userId);
        } catch(e){
            res.status(404).json('No user found!');
        }
        try {
            await Post.deleteMany({ username: user.username });
            await User.findByIdAndDelete( req.params.id );
            res.status(200).json(`User with username: ${user.username} was deleted`);
        } catch(e){
            res.json(e);
        }
    } else {
        res.status(401).json("You can only delete you're account!");
    }
})


//GET USER

router.get("/:id", async (req,res) => {

    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.json(others);
    }
    catch(e){
        res.json('User not found');
    }

})

module.exports = router;