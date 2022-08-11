const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const catRoute = require('./routes/categories');

app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")));
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('DB connected');
})

const storage = multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null, 'images');
    }, filename: (req,res,cb)=>{
        cb(null, req.body.name);
    }
})

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
    res.status(200).json("File has been uploaded");
})

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/cats", catRoute);

// --- DEPLOYMENT

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

// --- DEPLOYMENT

app.listen(process.env.PORT || 3000, (req,res)=>{
    console.log('Server running in port 3000');
});