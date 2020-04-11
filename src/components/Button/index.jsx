import React from "react";
import './styles.css'

export default props => {

  return (
    <button className="button">{props.label || "null"}</button>
  )
}