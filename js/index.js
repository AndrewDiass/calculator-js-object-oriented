class Calculator {
  constructor() {
    this.upperValue = document.querySelector("#upper-number");
    this.resultValue = document.querySelector("#result-number");
    this.reset = 0;
  }

  clearValues() {
    this.upperValue.textContent = "0";
    this.resultValue.textContent = "0";
  }

  checkLastDigit(input, upperValue, reg) {
    if (
      !reg.test(input) &&
      !reg.test(upperValue.substr(upperValue.length - 1))
    ) {
      return true;
    } else {
      return false;
    }
  }

  btnPress() {
    let input = this.textContent;
    let upperValue = calc.upperValue.textContent;
    // verifica se tem apenas números
    const reg = new RegExp("^\\d+$");

    if (calc.reset && reg.test(input)) {
      upperValue = '0';
    }

    calc.reset = 0;

    if (input == "AC") {
      calc.clearValues();

    } else if (input == "=") {
      calc.resolution();
    } else {
      // checa se precisa adicionar ou não
      if (calc.checkLastDigit(input, upperValue, reg)) {
        return false;
      }

      // adiciona espaços aos operadores
      if (!reg.test(input)) {
        input = ` ${input} `;
      }

      if (upperValue == "0") {
        calc.upperValue.textContent = input;
      } else {
        calc.upperValue.textContent += input;
      }
    }
  }

  sum(n1, n2) {
    return parseFloat(n1) + parseFloat(n2)
  }

  subtraction(n1, n2) {
    return parseFloat(n1) - parseFloat(n2)
  }

  multiplication(n1, n2) {
    return parseFloat(n1) * parseFloat(n2)
  }

  division(n1, n2) {
    return parseFloat(n1) / parseFloat(n2)
  }

  refreshValues(total) {
    this.upperValue.textContent = total;
    this.resultValue.textContent = total;
  }

  // resolve operação
  resolution() {
    // explode uma string em um array
    console.log('teste');

    let upperValueArray = this.upperValue.textContent.split(" ");
    console.log(upperValueArray);
    //resultado da operação
    let result = 0;

    for (let i = 0; i <= upperValueArray.length; i++) {
      let actualItem = upperValueArray[i];

      if (actualItem == '+') {
        result = parseFloat(upperValueArray[i - 1]) + parseFloat(upperValueArray[i + 1])
      }
    }

    if (result) {
      calc.reset = 1;
    }

    calc.refreshValues(result);
  }
}

//start obj
let calc = new Calculator();

//start btn
let buttons = document.querySelectorAll(".btn");

// map all buttons
for (let i = 0; buttons.length > i; i++) {
  buttons[i].addEventListener("click", calc.btnPress);
}
