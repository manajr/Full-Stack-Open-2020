import axios from 'axios'
const baseUrl = '/api/user'

const getUsers = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

export default { getUsers }