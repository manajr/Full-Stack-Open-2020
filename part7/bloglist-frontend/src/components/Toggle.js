import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
//import styled from 'styled-components'
/*
const Button = styled.button`
  background: #FB5F5F;
  border-radius: 6px; 
`*/

const Toggle = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hidenWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return{
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hidenWhenVisible} className="togglableContent">
        <button onClick={toggleVisibility}>{props.btnLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Toggle.propTypes = {
  btnLabel: PropTypes.string.isRequired
}

Toggle.displayName = 'Toggle'

export default Toggle
