import React, { Component } from 'react'
import {
  FaPercent,
  FaDivide,
  FaTimes,
  FaMinus,
  FaPlus,
  FaEquals,
} from 'react-icons/fa'
import './styles.css'

import Button from '../Button'
import Display from '../Display'

const initialState = {
  // Numero mostrado na tela da calculadora
  displayValue: '0',
  // Armazena informação se limpa a tela nas operações
  clearDisplay: false,
  // Armazena a operação atual
  operation: null,
  // Armazena os valores da operação
  values: [0, 0],
  // Armazena o índice do array que esta sendo trabalhado
  current: 0,
}

export default class Calculator extends Component {
  state = { ...initialState }

  constructor(props) {
    super(props)
    this.clearMemory = this.clearMemory.bind(this)
    this.setOperations = this.setOperations.bind(this)
    this.addDigits = this.addDigits.bind(this)
  }

  clearMemory() {
    this.setState({ ...initialState })
  }

  setOperations(operation) {
    const {
      operation: operationState,
      values: valuesState,
      current: currentState,
    } = this.state

    const operationCalc = {
      null: () => {
        return ''
      },
      operation: () => {
        if (
          // Se o usuário já digitou uma operação
          operationState &&
          // Se o usuário já digitou o segundo valor
          valuesState[1] !== 0
        ) {
          // Calcula o resultado da primeira operação e prepara para a próxima
          // Guarda o resultado da primeira operação na primeira posição do Array
          const valueResult = operationCalc['=']()
          return {
            displayValue: valueResult,
            operation,
            current: 1,
            clearDisplay: true,
            values: [valueResult, 0],
          }
        }
        return { operation, current: 1, clearDisplay: true }
      },
      '/': (values = [0, 0]) => {
        // Recupera o array em float
        values = values.map((value) => parseFloat(value))
        // Executa a operação de soma
        return values[0] / values[1]
      },
      '*': (values = [0, 0]) => {
        // Recupera o array em float
        values = values.map((value) => parseFloat(value))
        // Executa a operação de soma
        return values[0] * values[1]
      },
      '-': (values = [0, 0]) => {
        // Recupera o array em float
        values = values.map((value) => parseFloat(value))
        // Executa a operação de soma
        return values[0] - values[1]
      },
      '+': (values = [0, 0]) => {
        // Recupera o array em float
        values = values.map((value) => parseFloat(value))
        // Executa a operação de soma
        return values[0] + values[1]
      },
      '%': (values = [0, 0]) => {
        if (
          (valuesState[0] + '').includes('%') &&
          (valuesState[1] + '').includes('%')
        ) {
          // Se os dois items do cálculo forem percentuais
          // Divide-se ambos por 100 e realiza a operação
          values = values.map((value) => parseFloat(value))
          const arrayItems = [values[0] / 100, values[1] / 100]
          return operationCalc[operationState](arrayItems)
        } else if (
          (operationState === '+' || operationState === '-') &&
          (values[1] + '').includes('%')
        ) {
          // Se a operação for soma ou adição
          // E o percentual estiver na segunda posição do array
          // Calcula-se a porcentagem em relação ao primeiro item e realiza a operação (adição ou subtração)
          values = values.map((value) => parseFloat(value))
          const percent = values[0] * (values[1] / 100)
          return operationCalc[operationState]([values[0], percent])
        } else if ((values[1] + '').includes('%')) {
          // Se não for adição ou subtração, mas a posição 1 do array contiver o percentual
          // Isso indica que a operação é multiplicação ou divisão
          // Calcula-se o percentual em decimais e realiza a operação (multiplicação ou divisão)
          values = values.map((value) => parseFloat(value))
          return operationCalc[operationState]([values[0], values[1] / 100])
        }
        // Senão... o percentual está no primeiro item
        // independente da operação Calcula-se o percentual em decimais e realiza a operação
        values = values.map((value) => parseFloat(value))
        return operationCalc[operationState]([values[0] / 100, values[1]])
      },
      '=': () => {
        if (
          (valuesState[0] + '').includes('%') ||
          (valuesState[1] + '').includes('%')
        ) {
          // Calcula com porcentagem
          return operationCalc['%'](valuesState)
        } else if (operationState) {
          return operationCalc[operationState](valuesState)
        }
      },
    }

    if (
      (currentState === 0 || (currentState === 1 && valuesState[1] === 0)) &&
      operation !== '='
    ) {
      this.setState({ operation, current: 1, clearDisplay: true })
      return
    } else {
      if (operation === '=') {
        // Recebe o valor resultado da operação
        const valueResult = operationCalc['=']()
        this.setState({
          ...initialState,
          clearDisplay: true,
          displayValue: valueResult,
          values: [valueResult, 0],
        })
        return
      }
      // Recebe o resultado da operação num objeto de state e salva no estado
      const stateObject = operationCalc['operation']()
      this.setState(stateObject)
    }
  }

  addDigits(digit) {
    // Se o usuário digitar um ponto e já existir um ponto na STRING displayValue
    // OU se já existir porcentagem no displayValue
    // A função encerra com o return, e não permite adicionar outro ponto ou digito
    if (
      (digit === '.' && (this.state.displayValue + '').includes('.')) ||
      ((this.state.displayValue + '').includes('%') &&
        this.state.clearDisplay === false)
    )
      return

    // Se valor precisar ser limpo
    // ou seja, se for 0 ou o clear display estiver ativo
    // O valor atual é vazio, senão o novo digito é acrescentado
    const currentValue =
      this.state.displayValue === '0' || this.state.clearDisplay
        ? ''
        : this.state.displayValue
    // Se o primeiro digito for '.' adiciona '0.'
    // Senão acrescenta o digito incluído
    const displayValue =
      currentValue === '' && digit === '.' ? '0.' : currentValue + digit

    this.setState({ displayValue, clearDisplay: false })

    if (digit !== '.') {
      // Sempre que um digito decimal for digitado
      // Adiciona ao array na posição atual
      const values = [...this.state.values]
      values[this.state.current] = displayValue
      this.setState({ values })
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" double={true} click={this.clearMemory} />
        <Button label="%" click={this.addDigits}>
          <FaPercent size={14} />
        </Button>
        <Button label="/" click={this.setOperations} operation={true}>
          <FaDivide size={18} />
        </Button>
        <Button label="7" click={this.addDigits} />
        <Button label="8" click={this.addDigits} />
        <Button label="9" click={this.addDigits} />
        <Button label="*" click={this.setOperations} operation={true}>
          <FaTimes size={18} />
        </Button>
        <Button label="4" click={this.addDigits} />
        <Button label="5" click={this.addDigits} />
        <Button label="6" click={this.addDigits} />
        <Button label="-" click={this.setOperations} operation={true}>
          <FaMinus size={18} />
        </Button>
        <Button label="1" click={this.addDigits} />
        <Button label="2" click={this.addDigits} />
        <Button label="3" click={this.addDigits} />
        <Button label="+" operation={true} click={this.setOperations}>
          <FaPlus size={18} />
        </Button>
        <Button label="0" click={this.addDigits} />
        <Button label="." click={this.addDigits} />
        <Button
          label="="
          double={true}
          operation={true}
          click={this.setOperations}
        >
          <FaEquals size={18} />
        </Button>
      </div>
    )
  }
}
