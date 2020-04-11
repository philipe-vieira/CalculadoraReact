import React, { Component } from "react";
import { FaPercent, FaDivide, FaTimes, FaMinus, FaPlus, FaEquals } from 'react-icons/fa';
import './styles.css'

import Button from '../Button'

export default class Calculator extends Component {
  render() {
    return (
      <div className="calculator">
        <Button label="AC"/>
        <Button label={ <FaPercent size={14} /> }/>
        <Button label={ <FaDivide size={18} /> }/>
        <Button label="7"/>
        <Button label="8"/>
        <Button label="9"/>
        <Button label={ <FaTimes size={18} /> }/>
        <Button label="4"/>
        <Button label="5"/>
        <Button label="6"/>
        <Button label={ <FaMinus size={18} /> }/>
        <Button label="1"/>
        <Button label="2"/>
        <Button label="3"/>
        <Button label={ <FaPlus size={18} /> }/>
        <Button label="0"/>        
        <Button label="."/>
        <Button label={ <FaEquals size={18} /> }/>

        <Button />


      </div>
    )
  }
}