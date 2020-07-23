import React from 'react'
import './styles.css'

export default (props) => {
  return (
    <button
      onClick={(e) => props.click && props.click(props.label)}
      className={`
        button
        ${props.operation ? 'operation' : ''}
        ${props.double ? 'double' : ''}
      `}
    >
      {props.children || props.label || 'null'}
    </button>
  )
}
