document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;

    // Elementos da calculadora
    const display = document.calc.txt;
    const numberButtons = document.querySelectorAll('.num:not(.operator):not(.clear):not(.equal)');
    const operatorButtons = document.querySelectorAll('.operator');
    const clearButton = document.querySelector('.clear');
    const equalsButton = document.querySelector('.equal');
    const decimalButton = document.querySelector('.decimal');

    // Função para atualizar o display
    function updateDisplay(value) {
        if (resetScreen) {
            display.value = '';
            resetScreen = false;
        }
        display.value = value;
    }

    // Função para adicionar número
    function appendNumber(number) {
        if (display.value === '0' || resetScreen) {
            resetScreen = false;
            display.value = number;
        } else {
            display.value += number;
        }
    }

    // Função para adicionar operador
    function setOperation(op) {
        if (operation !== null) calculate();
        previousInput = display.value;
        operation = op;
        resetScreen = true;
    }

    // Função para calcular
    function calculate() {
        if (operation === null || resetScreen) return;
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(display.value);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }

        display.value = computation;
        operation = null;
    }

    // Função para limpar
    function clear() {
        display.value = '0';
        currentInput = '';
        previousInput = '';
        operation = null;
    }

    // Adiciona eventos aos botões numéricos
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.textContent);
        });
    });

    // Adiciona eventos aos botões de operação
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            setOperation(button.textContent);
        });
    });

    // Evento para o botão de igual
    equalsButton.addEventListener('click', () => {
        calculate();
    });

    // Evento para o botão de limpar
    clearButton.addEventListener('click', () => {
        clear();
    });

    // Evento para o botão decimal
    decimalButton.addEventListener('click', () => {
        if (resetScreen) {
            display.value = '0.';
            resetScreen = false;
            return;
        }
        if (display.value.includes('.')) return;
        display.value += '.';
    });

    // Teclado suporte
    document.addEventListener('keydown', (e) => {
        if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
        else if (e.key === '.') {
            if (resetScreen) {
                display.value = '0.';
                resetScreen = false;
                return;
            }
            if (!display.value.includes('.')) display.value += '.';
        }
        else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            setOperation(e.key);
        }
        else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            calculate();
        }
        else if (e.key === 'Escape') {
            clear();
        }
        else if (e.key === 'Backspace') {
            display.value = display.value.slice(0, -1);
            if (display.value === '') display.value = '0';
        }
    });
});