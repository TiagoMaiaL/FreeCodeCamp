/**
 * Free Code Camp
 *
 * Algorithm solutions.
 *
 * Caesers Cipher solution.
 * https://www.freecodecamp.com/challenges/caesars-cipher
 */


/**
 * Object responsible for decoding
 * Rot13 encoded strings.
 */
function Rot13() {

  /**
   * Method in charge of checking if
   * the text is a valid string.
   *
   * @param  {string} text
   * @return {Boolean}
   */
  function stringIsValid(text) {
    return typeof text === 'string' && text.length !== 0;
  }

  /**
   * Method in charge of checking if the
   * passed char string is a word.
   *
   * @param  {currentChar}
   * @return {Boolean}
   */
  function isWord(currentChar) {
    return currentChar.match('^[a-zA-Z]+$') == null
  }

  /**
   * Method in charge of calculating the code
   * position after decrementing 13.
   *
   * @param  {string} char
   * @return {int}
   */
  function calculateCode(char) {
    var firstUpperCode = 'A'.charCodeAt(0);
    var lastUpperCode = 'Z'.charCodeAt(0) + 1;

    var decoded = char.charCodeAt(0) - 13;

    if (firstUpperCode > decoded) {
      decoded = lastUpperCode - (firstUpperCode - decoded);
    }

    return decoded;
  }

  /**
   * Method responsible for receiving rot13 decode requests.
   * 
   * @param  {string} plainText
   * @return {string}
   */
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

}
