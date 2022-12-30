/* eslint-disable import/prefer-default-export */

const labelRegex = /[A-Z]/;

export function createLabel(nameVal, labelVal = null) {
  if (labelVal) return labelVal;
  let newLabel = nameVal[0].toUpperCase();
  if (labelRegex.test(nameVal[1])) {
    for (let i = 1; i < nameVal.length; i += 1) {
      newLabel += nameVal[i].toLowerCase()
    }
  } else {
    for (let i = 1; i < nameVal.length; i += 1) {
      const match = labelRegex.test(nameVal[i]);
      if (match) {
        newLabel += ` ${nameVal[i]}`;
      } else {
        newLabel += nameVal[i];
      }
    }
  }
  return newLabel;
}

export function initGarmentMeas(garmentTypeMeasKeys) {
  const initVals = {};
  garmentTypeMeasKeys.forEach((x) => {
    initVals[x] = '';
  });
  return initVals;
}

export function inputValuesInvalid(input) {
  const check = Object.keys(input).map((inp) => {
    if (input[inp].length <= 0 || input[inp] === false || input[inp] === '') return true;
    return false;
  })
  return check.includes(true)
}

export function disableButton(inputs) {
  // function returns true to signal error/disabled/invalid
  const inputCheck = Object.keys(inputs).map((input) => {
    if (inputs[input].length <= 0 || inputs[input] === false) return false;
    return true;
  });
  if (inputCheck.includes(false)) return true;
  return false;
}

export function disableGarmentSaveButton() {

}

export function genId() {
  return (Math.random() + Math.random()).toString();
}
