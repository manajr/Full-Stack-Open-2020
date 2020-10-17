const Blog = require('../models/blog')
const User = require('../models/user')

const initialPost = [
	{
		title:'Hey yo',
		author: 'Manassés',
		url:'babi',
		likes: 0
	},
	{
		title:'Hey yo',
		author: 'Manassés',
		url:'babi',
		likes: 0
	}
]

const nonExistingId = async () => {
	const blog = new Blog({title:'coisinha de jeje', likes:0})
	await blog.save()
	await blog.remove()

	return blug._id.toString()
}

const postInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
	initialPost, nonExistingId, postInDb, usersInDb
}
