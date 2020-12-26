import React from 'react'
import CommentForm from './CommentForm'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addLike } from '../reducer/blogsReducer'

function Blog() {
    const id = useParams().id
    const blogs = useSelector(state => state.blogs)
    const blog = blogs.find(blog => blog.id === id)

    const dispatch = useDispatch()

    if (blog === undefined) {
        return null
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <h2>{blog.title}</h2>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {blog.likes} likes
                            <button type='submit' onClick={() =>
                                dispatch(addLike(blog.id, blog))}>
                                like
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {blog.link}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            added by {blog.user.name}
                        </td>
                    </tr>
                </tbody>
            </table>
            <h3>comments</h3>
            <CommentForm id={id} />
            {blog.comments?.map((comment, i) => <li key={i}>{comment}</li>)}
        </div>
    )
}

export default Blog