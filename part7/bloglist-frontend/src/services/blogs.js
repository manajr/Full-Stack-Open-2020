import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token}
  }
  const deletedUser = await axios.delete(`${baseUrl}/${id}`, config)
  return deletedUser
}

const update = async(id, blog) => {
  const config ={
    headers: {Authorization: token}
  }
  const updatedUser = await axios.put(`${baseUrl}/${id}`, blog, config)
  return updatedUser
}

const getUserBlogs = (user) => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
    .then(blogs => blogs.filter((loginUser) => 
    (loginUser.user !== undefined)))
  .then(blogsFiltered => blogsFiltered.filter((loginUsers) =>
  loginUsers.user.username === user.username.toString()))
}

const addComment = async (id, comment) => {
  const commentValue = [comment]
  const request = await axios.post(`${baseUrl}/${id}/comments`, {comments:commentValue})
  console.log()
  return request.data
}

export default { getAll, getUserBlogs, setToken, create
, deleteBlog, update, addComment }