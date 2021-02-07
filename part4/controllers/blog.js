const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { nonExistingId } = require('../tests/test_helper')
const jwt = require('jsonwebtoken')
const { find } = require('../models/user')
const { getTokenFrom, validateToken , tokenLog } = require('../utils/utils')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const firstUser = await User.find({})
  const userForToken = {
    username: firstUser[0].username,
    id: firstUser[0]._id
  }

  const signToken = jwt.sign(userForToken, process.env.SECRET)
  
  const tokenFromHeader = getTokenFrom(request)
  const token = tokenFromHeader === null
   ? signToken 
   : tokenFromHeader
  
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
    comments: body.comments
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const token = getTokenFrom(request)
  const userFromTokem = jwt.verify(token, process.env.SECRET)
  console.log('Token user', userFromTokem,'\n','Blog user:', blog.user)
/*  
  const userForToken = {
    username: blog.user,
    id: blog.user.id
  }

  const signToken = jwt.sign(userForToken, process.env.SECRET)

  const isTokenValid = token === signToken
  ? true
  : false
  */

  if ( blog.user.toString() === userFromTokem.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  response.status(404).json({error:"User aren't logged in with the blog account"})
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const params = request.params.id

  await Blog.findByIdAndUpdate(request.params.id, body, {new:true})
  response.status(200).end()
  console.log(body)
  console.log(params)
})


blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  
  validateToken(request)

  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(body.comments)  

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog.comments)
})


module.exports = blogsRouter