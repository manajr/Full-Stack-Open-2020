import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const style = props.notification === ''
  ? null
  : {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  ) 
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedAnecdotes = connect(
  mapStateToProps
)(Notification)

export default ConnectedAnecdotes