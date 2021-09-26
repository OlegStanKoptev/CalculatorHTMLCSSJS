let maxFieldLength = 12
var eraseOnEnter = true

setButtonsActions()

function setButtonsActions() {
  document.getElementById("clear").onclick = function() {
    document.getElementById("field").innerHTML = 0
    eraseOnEnter = true
  }

  let padButtons = document.getElementById("keyboard").getElementsByTagName("button")
  for (const button of padButtons) {
    if (button.innerHTML == "=") {
      button.onclick = function() {calculate()}
    } else {
      button.onclick = function() {enterSymbol(button.innerHTML)}
    }
  }
}

function enterSymbol(x) {
  var resultField = document.getElementById("field")
  if (resultField.innerHTML.length == maxFieldLength) { return }
  if (eraseOnEnter) {
    resultField.innerHTML = x
    eraseOnEnter = false
  } else {
    resultField.innerHTML += x
  }
}

function calculate() {
  let field = document.getElementById("field")
  let statement = field.innerHTML
  let result = Function(`'use strict'; return (${statement})`)()
  let strResult = String(result)
  if (strResult.includes(",") || strResult.includes(".")) {
    result = String(parseFloat(result).toFixed(4))
  }

  if (result.length > maxFieldLength) {
    field.innerHTML = "Too big number"
  } else {
    field.innerHTML = result
  }

  eraseOnEnter = true
}