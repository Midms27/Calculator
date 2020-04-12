class Calculator {
    constructor(previousOperandText,currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.previousOperand = ''
        this.operation = undefined
    }

    getDisplayNumber(number) {
        const stringNum = number.toString()
        const intNum = parseFloat(stringNum.split('.')[0])
        const decNum = stringNum.split('.')[1]
        let intDisplay
        if (isNaN(intNum)) {
            intDisplay = ''
        } else {
            intDisplay = intNum.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decNum != null) {
            return `${intDisplay}.${decNum}`
        } else {
            return intDisplay
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText =this.getDisplayNumber(this.currentOperand)
         if (this.operation != null) {
         this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandText.innerText = ''
        }
    }
}


const numBut = document.querySelectorAll('[num]')
const opeBut = document.querySelectorAll('[ope]')
const igBut = document.querySelector('[ig]')
const acBut = document.querySelector('[ac]')
const delBut = document.querySelector('[del]')
const previousOperandText = document.querySelector('[res]')
const currentOperandText = document.querySelector('[cur]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numBut.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

opeBut.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

igBut.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

delBut.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

acBut.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})