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
  await axios.delete(`${baseUrl}/${id}`, config)

}

const getUserBlogs = (user) => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
    .then(blogs => blogs.filter((loginUser) => 
    (loginUser.user !== undefined)))
  .then(blogsFiltered => blogsFiltered.filter((loginUsers) =>
  loginUsers.user.username === user.username.toString()))
}

export default { getAll, getUserBlogs, setToken, create
, deleteBlog}