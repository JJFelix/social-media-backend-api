const express = require('express')
const app = express()
const mongoose = require('mongoose')

const router = require('./routes/user-routes')
const blogRouter = require('./routes/blog-routes')
app.use(express.json())
app.use("/api/user",router)
app.use("/api/blog", blogRouter)


mongoose
    .connect(
        'mongodb+srv://admin:safe96441@cluster0.x72pjbr.mongodb.net/SocialMediaBlog?retryWrites=true&w=majority')
        .then(()=>app.listen(1417))
        .then(()=>console.log("Connected to database. Now listening to localhost 1417"))
        .catch((err)=>console.log(err)
    )

// app.listen(1417)

