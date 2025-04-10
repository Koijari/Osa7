import React, { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  return (
    <div>
      {!visible && (
        <button type="button" onClick={toggleVisibility} style={addBtn}>
          {props.buttonLabel}
        </button>
      )}
      {visible && (
        <div>
          {props.children}
          <button type="button" onClick={toggleVisibility} style={backBtn}>
            peruuta
          </button>
        </div>
      )}
    </div>
  )
})

const backBtn = {
  color: 'red',
  backgroundColor: 'yellow',
  borderRadius: 10,
  borderColor: 'red',
}
const addBtn = {
  color: 'green',
  backgroundColor: 'yellow',
  borderRadius: 10,
  borderColor: 'green',
}

Togglable.displayName = 'Togglable'

export default Togglable
