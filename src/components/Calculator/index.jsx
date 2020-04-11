import React, { Component } from "react";
import { FaPercent, FaDivide, FaTimes, FaMinus, FaPlus, FaEquals } from 'react-icons/fa';
import './styles.css'

import Button from '../Button'
import Display from '../Display'

const initialState ={
  displayValue: '0',
  clearDisplay: false,
  operations: [],
  values: [0, 0],
  current: 0
}

export default class Calculator extends Component {

  state={...initialState}

  constructor(props){
    super(props)
    this.clearMemory = this.clearMemory.bind(this)
    this.setOperations = this.setOperations.bind(this)
    this.addDigits = this.addDigits.bind(this)
  }

  clearMemory(){
    this.setState({...initialState})
  }

  setOperations(operation){
    console.log(operation)
    console.log(operation.type.name)
  }

  addDigits(digit){
    if( digit === '.' && this.state.displayValue.includes('.') ) return

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    const currentValue = clearDisplay ? '' : this.state.displayValue 
    const displayValue = currentValue === '' && digit === '.' ? '0.' : currentValue + digit

    this.setState({ displayValue, clearDisplay: false})

    if (digit !== '.' ){
      const indice = this.state.current
      const value = parseFloat(displayValue)
      const values = [...this.state.values]
      values[indice] = value
      this.setState({ values })
    }
  }

  render() {
    
    return (
      <div className="calculator">
        <Display value={this.state.displayValue}/>

        <Button 
          label="AC" double={true}
          click={this.clearMemory }
        />

        <Button
         label={ <FaPercent size={14} /> }  
         click={this.setOperations }
        />

        <Button
         label={ <FaDivide size={18}  /> } 
         click={this.setOperations }
         operation={true} 
        />

        <Button
         label="7" 
         click={this.addDigits }
        />

        <Button
         label="8" 
         click={this.addDigits }
        />

        <Button
         label="9" 
         click={this.addDigits }
        />

        <Button
         label={ <FaTimes size={18}  /> }
         click={this.setOperations }
         operation={true} 
        />

        <Button
         label="4" 
         click={this.addDigits }
        />

        <Button
         label="5" 
         click={this.addDigits }
        />

        <Button
         label="6" 
         click={this.addDigits }
        />

        <Button
         label={ <FaMinus size={18}  /> } 
         click={this.setOperations }
         operation={true} 
        />

        <Button
         label="1" 
         click={this.addDigits }
        />

        <Button
         label="2" 
         click={this.addDigits }
        />

        <Button
         label="3" 
         click={this.addDigits }
        />

        <Button
         label={ <FaPlus size={18}  /> } 
         operation={true} 
         click={this.setOperations }
        />

        <Button
         label="0"      
         click={this.addDigits }
        /> 

        <Button
         label="." 
         click={this.addDigits }
        />

        <Button 
          label={ <FaEquals size={18} /> }  
          double={true} 
          operation={true}
          click={this.setOperations }
        />

      </div>
    )
  }
}