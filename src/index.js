module.exports = function check(str, bracketsConfig) {
  const OPEN_BRACKETS = [];
  const BRACKETS_PAIR = {};
  const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 9, 10];

  bracketsConfig.map((el, index) => {
    el.map((el, i) => {
      if (i % 2 == 0) {
        OPEN_BRACKETS.push(el);
      } else {
        BRACKETS_PAIR[el] = OPEN_BRACKETS[index];
      }
    });
  });

  let stack = [];
  console.log(OPEN_BRACKETS);

  for (let i = 0; i < str.length; i++) {
    let currentSymbol = str[i];

    if (OPEN_BRACKETS.includes(currentSymbol)) {
      if (currentSymbol === "|" && stack[stack.length - 1] === "|") {
        stack.pop();
      } else if (
        NUMBERS.includes(+currentSymbol) &&
        currentSymbol === stack[stack.length - 1]
      ) {
        stack.pop();
      } else {
        stack.push(currentSymbol);
      }
    } else if (stack.length === 0 && NUMBERS.includes(+currentSymbol)) {
      return true;
    } else {
      if (stack.length === 0) {
        return false;
      }
      let topElement = stack[stack.length - 1];

      if (BRACKETS_PAIR[currentSymbol] === topElement) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};
