const express = require("express")
const { getAllBlogs, addBlog, updateBlog, getBlogById, deleteBlog, getBlogByUserId } = require("../controllers/blog-controller")

const blogRouter = express.Router()

blogRouter.get('/', getAllBlogs)
blogRouter.get('/:id', getBlogById)
blogRouter.post('/add', addBlog )
blogRouter.put('/update/:id', updateBlog)
blogRouter.delete('/:id', deleteBlog)
blogRouter.get('/user/:id', getBlogByUserId)

module.exports = blogRouter