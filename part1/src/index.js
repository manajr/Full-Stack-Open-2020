import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Working with JSX
/*const App = () => {
  console.log('Hello from component')
  const a = 10
  const b = 20
  const now = new Date()
 /*return React.createElement(
    'div',
    null,
    React.createElement(
      'p', null, ' Hello world, it is ', now.toString()
    ),
    React.createElement(
      'p', null, a, ' plus ', b, ' is ', a + b
    )
  )*/
  /*return(
  <div>
    <p>Hello world</p>
    <p>
      {a} plus {b} is {a + b}
    </p>
  </div>
  ) 
  }*/

  //Multiple Components
  const Hello = (props) => {
    return(
      <div>
        <p>Hello {props.name}, you are {props.age} years old</p>
      </div>
    )
  }
  
  const App = () => {
    const name = 'Peter'
    const age = 10
    return(
      <div>
        <h1>Greatings</h1>
        <Hello name='Maya' age={26+10} />
        <Hello name={name} age={age} />
      </div>
    )
  }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
