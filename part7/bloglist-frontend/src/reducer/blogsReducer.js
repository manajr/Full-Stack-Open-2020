import blogService from '../services/blogs'
import { sortByLikes } from '../utils/utils'

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_BLOG':
            const blogs = action.data
            const blogsSortedByLikes = blogs.sort(sortByLikes)
            return blogsSortedByLikes
        case 'ADD_LIKE':
           const updatedBlogs = state.map(blog => blog.id !== action.data.id
            ? blog
            : {...blog, likes: action.data.updatedBlog.likes})
            return updatedBlogs.sort(sortByLikes)
        case 'DELETE' :
            const idToDelete = action.data.id
            return state.filter(blog => blog.id !== idToDelete)
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'SUBMIT_COMMENT':
            const blog = state.find(blog => blog.id === action.data.id)
            const comments = blog.comments.concat(action.data.content)
            return [...state.filter(blogState => blogState.id !== blog.id), {...blog, comments: comments}]
        default:
            return state
    }
}

export const initializeBlogs =  () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOG',
            data: blogs
        })
    }
}

export const addLike = (id, blog) => {
    const newLikeValue = blog.likes + 1
    
    return async dispatch => {
        try{
            const response = await blogService.update(id, { likes:newLikeValue } )
            const updatedBlog = JSON.parse(response.config.data)
            dispatch({
            type: 'ADD_LIKE',
            data: { updatedBlog, id }
            })
        } catch(err) {
            console.log(err)
        }
    }
}

export const deleteBlog = (id, blog) => {
    return async dispatch => {
        try{
            await blogService.deleteBlog(id)
            dispatch({
                type: 'DELETE',
                data: { id }
            })
        } catch(err) {
            console.log(err)
        }
    }
}

export const createBlog = (content) => {
    return {
        type: 'NEW_BLOG',
        data: content
    }
}


export const submitComment = (id, content) => {
    return async dispatch => {
        try {
            await blogService.addComment(id, content)
            dispatch({
                type: 'SUBMIT_COMMENT',
                data: { id, content }
            })
        } catch(err) {
            console.log(err)
        }
    }
}

export default blogReducer