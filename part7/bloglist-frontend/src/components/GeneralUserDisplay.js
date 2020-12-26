import React, { useRef } from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link,
} from 'react-router-dom'
import Blog from './Blog'
import UserBlogs from './UserBlogs'
import LoggerMessage from './LoggerMessage'
import Toggle from './Toggle'
import NewBlog from './NewBlog'
import Logout from './Logout'
import UsersList from './UsersList'
import { useSelector } from 'react-redux'
import BlogsView from './BlogsView'
//import './GeneralUserDisplay.css'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
   * {
        @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
        padding:0;
        margin:0;
        vertical-align:baseline;
        list-style:none;
        border:0;
        font-family: 'Righteous', cursive;
        font-style: normal;
        font-weight: normal;
    }
    body {
        background: linear-gradient(90deg, rgba(177, 167, 166, 0.33) 0%, rgba(255, 255, 255, 0) 100%), rgba(245, 243, 244, 0.17);
        width: 100vw;
        height: 100vh;
    }
`
const NavBar = styled.header` 
    background-color: #FB5F5F;
    width: 70vw;
    margin-right: 2vw;
    display:flex;
    flex-direction: row;
    border-radius: 0 0 30px 0;
    flex-grow: 3;
    align-items: center;
    nav {
        ul{
            display:flex;
            align-items: center;
            font-size: 2.5vw;
            color: #D3D3D3;
            li a{
                margin: 0 1em;
                -webkit-text-stroke: 1px black;
                -webkit-text-fill-color: white;
                text-decoration: none;
            }
        }
        
    }
    `

const Title = styled.h2`
    align-self: center;
    font-size: 1.5;
    color: #F896D8;
    margin: 0 1em;
    img{
        width:80px;
    }
    `
const Wrapper = styled.div`
    padding: 0 1em;
    background-color: white;
    margin: 2em;
    border: 2px solid white;
    border-radius: .5em;
    `

const UserLog = styled.div`
    text-align: center;
    margin-right: 2vw;
    button {
       padding: .25em 0;
       margin: .25 0;
       width: 50%;
       align-self: center;
       background: linear-gradient(0deg, rgba(98,146,158,1) 0%, rgba(28,127,152,1) 100%);
       border-radius: 3px;
    }
    `
    const MainWrapper = styled.main`
        display:flex;
        justify-content: space-between;
        width: 100%;
    `

function GeneralUserDisplay() {
    const user = useSelector(state => state.user)
    const blogFormRef = useRef()

    const padding = {
        padding: 5
    }

    return (
        <MainWrapper>

            <div>
                <GlobalStyle />
                <Router>
                    <NavBar>
                        <Title>
                            <img src={process.env.PUBLIC_URL + '/logo.png'} />
                        </Title>
                        <LoggerMessage />
                        <nav className='head__Container'>
                            <ul>
                                <li>
                                    <Link style={padding} to='/'>home</Link>
                                </li>
                                <li>
                                    <Link style={padding} to='/user'>user</Link>
                                </li>
                            </ul>
                        </nav>
                    </NavBar>
                    <Wrapper>
                        <Switch>
                            <Route path='/user/:id'>
                                <UserBlogs />
                            </Route>
                            <Route path='/user'>
                                <UsersList />
                            </Route>
                            <Route path='/blogs/:id'>
                                <Blog />
                            </Route>
                            <Route path='/'>
                                {/*<div>
                                    <Toggle btnLabel={'create new blog'} ref={blogFormRef}>
                                    <NewBlog blogFormRef={blogFormRef} />
                                    </Toggle>
                                    <Blogs />
                                    </div>
                                */}
                                <Toggle btnLabel={'create new blog'} ref={blogFormRef}>
                                    <NewBlog blogFormRef={blogFormRef} />
                                </Toggle>
                                <BlogsView />
                            </Route>
                        </Switch>
                    </Wrapper>
                </Router>
            </div>
            <UserLog>
                User {user.name} logged in <Logout />
            </UserLog>
            </MainWrapper>
    )
}

export default GeneralUserDisplay
