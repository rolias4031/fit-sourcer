/* eslint-disable import/prefer-default-export */
export function createLabel(nameVal, labelVal = null) {
  if (labelVal) return labelVal
  const regex = /[A-Z]/
  let newLabel = nameVal[0].toUpperCase()
  for (let i=1; i < nameVal.length; i+=1) {
    const match = regex.test(nameVal[i])
    if (match) {
      newLabel += ` ${nameVal[i]}`
    } else {
      newLabel += nameVal[i]
    }
  }
  return newLabel
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