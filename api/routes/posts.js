const router = require('express').Router();
const { query } = require('express');
const Post = require('../models/Post');

//CREATE POST

router.post("/", async (req,res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch(e){
        res.status(500).json('Error while creating new post!');
    }
})

//UPDATE POST

router.put("/:id", async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.username == req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id, 
                {
                    $set: req.body
                },
                { new: true }
                );
                res.status(200).json(updatedPost);
            }
            catch(e){
                res.status(500).json(e);
            }
        } else {
            res.status(401).json("You can only update you're posts");
        }
    }
    catch(e){
        res.status(404).json('No posts founded!');
    }
})

//DELETE POST

router.delete("/:id", async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.username == req.body.username){
            try{
                await post.delete();
                res.status(200).json('Post has been deleted');
            }
            catch(e){
                res.status(500).json(e);
            }
        } else {
            res.status(401).json("You can only delete you're posts");
        }
    }
    catch(e){
        res.status(404).json('No posts founded!');
    }
})

//GET POST

router.get("/:id", async (req,res) => {

    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    }
    catch(e){
        res.json('Post not found');
    }

})

//GET ALL POSTS

router.get("/", async (req,res) => {

    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username){
            posts = await Post.find({username})
        } else if (catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }
    catch(e){
        res.status(500).json(e);
    }

})

module.exports = router;