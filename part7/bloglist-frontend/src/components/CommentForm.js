import React from 'react'
import { useDispatch } from 'react-redux'
import { submitComment } from '../reducer/blogsReducer'

function CommentForm({ id }) {
    const dispatch = useDispatch()

    const submitForm = (event) => {
        event.preventDefault()
        const comment = event.target.comment.value

        dispatch(submitComment(id, comment))
    }
    return (
        <div>
            <form onSubmit={submitForm}>
                <input type="text" name="comment" />
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default CommentForm
