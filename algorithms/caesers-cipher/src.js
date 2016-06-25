

function Rot13() {

  this.decode = function(plainText) {

    if (!stringIsValid(plainText)) {
      return null;
    }

    return plainText.toUpperCase().split('').map(function(currentChar) {
      if (currentChar.match('^[a-zA-Z]+$') == null) {
        return currentChar;
      }

      return String.fromCharCode(calculateCode(currentChar));
    }).reduce(function(previousValue, currentChar) {
      return previousValue + currentChar;
    });
  }

  function stringIsValid(text) {
    return typeof text === 'string' && text.length !== 0;
  }

  function calculateCode(char) {
    var firstUpperCode = 'A'.charCodeAt(0);
    var lastUpperCode = 'Z'.charCodeAt(0) + 1;

    var decoded = char.charCodeAt(0) - 13;

    if (firstUpperCode > decoded) {
      decoded = lastUpperCode - (firstUpperCode - decoded);
    }

    return decoded;
  }

}
