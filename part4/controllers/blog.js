const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { nonExistingId } = require('../tests/test_helper')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.user)
  console.log(user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const params = request.params.id

  await Blog.findByIdAndUpdate(request.params.id, body, {new:true})
  response.status(200).end()
  console.log(body)
  console.log(params)
})

module.exports = blogsRouter