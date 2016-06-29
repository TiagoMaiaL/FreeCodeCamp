/**
 * Free Code Camp
 * Algorithm solutions.
 *
 * Roman numeral converter solution.
 * https://www.freecodecamp.com/challenges/roman-numeral-converter
 */

/**
 * Converts the passed number into
 * a roman numeral string.
 * 
 * @param  {Integer} number
 * @return {String}
 */
function convertToRoman(number) {
  return (new RomanConverter()).convert(number);
}

/**
 * Object responsible for converting
 * numbers to roman numerals.
 */
function RomanConverter() {

  /**
   * An object containing all roman numerals.
   * @type {Object}
   */
  this.romanNumerals = {
    0 : '',
    1 : 'I',
    2 : 'II',
    3 : 'III',
    4 : 'IV',
    5 : 'V',
    6 : 'VI',
    7 : 'VII',
    8 : 'VIII',
    9 : 'IX',
    10 : 'X',
    20 : 'XX',
    30 : 'XXX',
    40 : 'XL',
    50 : 'L',
    60 : 'LX',
    70 : 'LXX',
    80 : 'LXXX',
    90 : 'XC',
    100 : 'C',
    200 : 'CC',
    300 : 'CCC',
    400 : 'CD',
    500 : 'D',
    600 : 'DC',
    700 : 'DCC',
    800 : 'DCCC',
    900 : 'CM',
    1000 : 'M',
    2000 : 'MM',
    3000 : 'MMM'
  };

  /**
   * @param  {Integer} number
   * @return {String}
   */
  this.convert = function(number) {
    guardInteger(number);
    return this.toRoman(number);
  }

  /**
   * Returns the passed number in roman numerals.
   * 
   * @param  {Integer} number
   * @return {String}
   */
  this.toRoman = function(number) {
    var romanNumeralText = '';

    var thousands = Math.floor(number / 1000);
    if (thousands >= 1) {
      romanNumeralText += this.romanNumerals[thousands * 1000];
      number %= 1000;
    }

    var hundreds = Math.floor(number / 100);
    if (hundreds >= 1) {
      romanNumeralText += this.romanNumerals[hundreds * 100];
      number %= 100;
    }

    var cents = Math.floor(number / 10); 
    if (cents >= 1) {
      romanNumeralText += this.romanNumerals[cents * 10];
      number %= 10;
    }

    if (number <= 10) {
      romanNumeralText += this.romanNumerals[number];
      number = null;
    }

    return romanNumeralText;
  }

  /**
   * Checks if the passed number is a valid integer.
   *
   * @param  {Integer} number
   * @return {null}
   */
  function guardInteger(number) {
    var message = 'Not a valid integer';

    if (!parseInt(number)) {
      throw message;
    }

    if (number === 0 || number % 1 !== 0) {
      throw message;
    }

    if (number >= 4000) {
      throw 'Only values lower than 4000 can be converted.';
    }
  }

}
