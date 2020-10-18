const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')

jest.setTimeout(100000)

beforeEach(async () => {
  await Blog.deleteMany({})

  const postObject = helper.initialPost.map( (post) => new Blog(post))
  const promiseArray = postObject.map(post => post.save())
  await Promise.all(promiseArray)
})

test('test post quantities', async () => {
  await api
  .get('/api/blogs')
  .expect(200)
  
  const postIDs = await helper.postInDb()
  expect(postIDs).toHaveLength(helper.initialPost.length)
})

test('posts are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a valid post can be added', async () => {
	const newPost = {
		title:'async/await simplifies making async calls',
    author:'author',
    url: 'www.sofazendoconta.cstat-skip',
		likes: 0
	}

	await api
	.post('/api/blogs')
	.send(newPost)
	.expect(201)
	.expect('Content-Type', /application\/json/)

  const postsAtEnd = await helper.postInDb()
  expect(postsAtEnd).toHaveLength(helper.initialPost.length + 1)

	const contents = postsAtEnd.map(r => r.title)
  expect(contents).toContain('async/await simplifies making async calls'
  )
  
  const fullObject = helper.initialPost
  fullObject.push(newPost)
  const postsAtEndFiltered = postsAtEnd.map( post => {
    const filteredPost = {title: post.title, author: post.author, url: post.url, likes: post.likes}
    return filteredPost
  })
  expect(postsAtEndFiltered).toEqual(expect.arrayContaining(fullObject))
})

test('test identifier name', async () => {
  await api
  .get('/api/blogs')
  .expect(200)
  
  const postInDB = await helper.postInDb()
  const postIds = postInDB.map(post => {
    const postID = {id:post.id}
    return postID})
  expect(postIds).toBeDefined()
})

test('test if likes is missing', async () => {
  const newObjectLikeless = {
    title: 'Test Five',
    author: 'Test Five',
    url: 'Teste Five',
  }

  await api
  .post('/api/blogs')
  .send(newObjectLikeless)
  .expect(201)

  const postResponse = await helper.postInDb()
  expect(postResponse[postResponse.length - 1].likes).toEqual(0)
})

test('if the title and url are missing give bad request', async () => {
  const newBadObject = {
    author: 'Jose carlos Marinho'
  }

  await api
  .post('/blog/api')
  .send(newBadObject)
  .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
