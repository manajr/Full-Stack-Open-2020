import React, { useState } from 'react'
import {Switch, Route, Link,
   useParams, useRouteMatch, Redirect
} from "react-router-dom"
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (

    <div>
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to='/createAnec'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
         <li key={anecdote.id} >
           <Link to={`/${anecdote.id}`}>{ anecdote.content }</Link></li>)}
    </ul>

  </div>
  )

const Anecdote = ({ anecdote }) => {

  return(
    <div>
      <div>Content: {anecdote.content}</div>
      <div>Author: {anecdote.author}</div>
      <div>Votes: {anecdote.votes}</div>
      <div>Info: {anecdote.info}</div>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const detachObject = (object) => {
  const newObject = {...object}
  const resetObject = newObject.reset
  delete newObject.reset
  return [newObject, resetObject]
}

const CreateNew = (props) => {
  const authorVal = useField('author')
  const infoVal = useField('info')
  const contentVal = useField('content')
  
  const [content, resetContent] = detachObject(contentVal)
  const [author, resetAuthor] = detachObject(authorVal)
  const [info, resetInfo] = detachObject(infoVal)

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const resetFields = (event) => {
    event.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button onClick={resetFields}>reset</button>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [newAnec, setNewAnec] = useState(null)
  const match = useRouteMatch('/:id')
  const selectedAnecdote = match 
    ? anecdotes.find(anec =>
    anec.id === match.params.id.toString())
    : null

  const [notification, setNotification] = useState('')


  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNewAnec('batata')
    setTimeout(()=> setNewAnec(null), 1000)
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => setNotification(''), 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const styleNotification = 
  notification !== ''
  ? { border: 'solid red 1px' }
  : null
  return (
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <div className='notification' style={styleNotification}>
          {notification !== '' ? notification : null}
        </div>
        <Switch>
          <Route path="/about">
            <About/>
          </Route>
          <Route path='/createAnec' render={()=> newAnec === null
            ? <CreateNew addNew={addNew} />
            : <Redirect to='/' />
         } />
          <Route path="/:id">
            <Anecdote anecdote={selectedAnecdote} />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>

      <Footer />
      </div>
  )
}

export default App;
