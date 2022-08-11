const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//REGISTER
router.post("/register", async (req,res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass  
        })

        const user = await newUser.save();
        res.json(user);
    } catch(e){
        res.status(500).json(e);
    }
})

//LOGIN

router.post("/login", async (req,res) => {
    try {
        const user = await User.findOne({
            username : req.body.username
        })
        !user && res.status(400).json("User doesn't exist");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials");

        const {password, ...rest} = user._doc;
        res.json(rest);
    } catch(e){
        res.json(e);
    }
})


module.exports = router;