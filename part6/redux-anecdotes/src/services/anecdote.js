import axios from 'axios'
import utils from '../utils/utils'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdote) => {
  const object = utils.asObject(anecdote)
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (object) => {
  const updatedObject = {...object[0], votes: object[0].votes + 1}
  const response = await axios.put(baseUrl + `/${object[0].id}`, updatedObject)
  return response
}

export default { getAll, createNew, updateVote }