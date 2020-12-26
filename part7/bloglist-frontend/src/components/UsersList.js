import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersList = () => {
    const users = useSelector(state => state.userList)
    const blogs = useSelector(state => state.blogs)

    return (
        <div>
            <h2>Users</h2>
                <table>
                    <thead>
                        <tr>
                        <th></th>
                        <th>blogs created</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map(user =>
                    <tr key={user.id}>
                        <Link to={`/user/${user.id}`}>
                            <td>{user.name}</td>
                            <td>{blogs.filter(blogs => blogs.user.name === user.name).length}</td>
                        </Link>
                    </tr>)}
                    </tbody>
                </table>
        </div>
    )
}

export default UsersList