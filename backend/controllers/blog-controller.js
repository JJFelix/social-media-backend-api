const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')
const User  =require('../models/user')

const getAllBlogs = async(req,res,next)=>{
    let blogs
    try {
        blogs = await Blog.find()
    } catch (err) {
        return console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message: "No blogs found"})
    }
    return res.status(200).json({blogs})
}

const addBlog = async (req,res,next)=>{
    const {title, description, image, user}=req.body

    let existingUser
    try {
        existingUser = await User.findById(user)
    } catch (err) {
        return console.log(err)
    }
    if (!existingUser){
        return res.status(400).json({message: "Unable to find user by this id"})
    }

    const blog = new Blog({
        title, description, image, user
    })
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({session})
        existingUser.blogs.push(blog)
        await existingUser.save({session})
        await session.commitTransaction()
    } catch (err) {
        console.log(err)
        return res.status(500).json({message:err})
    }
    return res.status(200).json({blog})
}

const updateBlog = async (req,res, next)=>{
    const {title, description}  = req.body
    const blogID = req.params.id
    let blog
    try {
        blog = await Blog.findByIdAndUpdate(blogID, {
            title, description
        })        
    } catch (error) {
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message: "Unable to update blog"})
    }
    return res.status(200).json({blog})

}

const getBlogById = async (req,res,next)=>{
    const blogID = req.params.id
    let blog
    try {
        blog = await Blog.findById(blogID)
    } catch (err) {
        return console.log(err)        
    }
    if(!blog){
        return res.status(404).json({message: "No blog found"})
    }
    return res.status(200).json({blog})
}

const deleteBlog = async (req,res,next)=>{
    const blogID = req.params.id
    let blog
    try {
        blog = await Blog.findByIdAndRemove(blogID).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    } catch (err) {
        return console.log(err)
    }
    if (!blog){
        return res.status(400).json({message: "Unable to delete"})
    }
    return res.status(200).json({message: "Successfully deleted"})
}

const getBlogByUserId = async (req,res,next)=>{
    const userID = req.params.id
    let userBlogs
    try {
        userBlogs = await User.findById(userID).populate("blogs")
    } catch (err) {
        return console.log(err)
    }
    if(!userBlogs){
        return res.status(404).json({message: "No blogs found"})
    }
    return res.status(200).json({blogs:userBlogs})
}
module.exports = {getAllBlogs, addBlog, updateBlog, getBlogById, deleteBlog, getBlogByUserId}