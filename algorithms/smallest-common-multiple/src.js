/**
 * Free Code Camp
 * Algorithm solutions.
 *
 * Smallest Common Multiple solution.
 * https://www.freecodecamp.com/challenges/smallest-common-multiple
 *
 * helpful links:
 * https://www.khanacademy.org/math/in-sixth-grade-math/playing-numbers/highest-common-factor/v/greatest-common-divisor
 * https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm
 */

/**
 * Brings the smallest common multiple from the first
 * number element until the last one.
 * 
 * @param  {array}
 * @return {Integer}
 */
function smallestCommons(numbers) {
  return (new SmallestCommonsFinder()).findSmallestMultiplier(numbers);
}

/**
 * Object responsible for finding the
 * smallest common multiple.
 */
function SmallestCommonsFinder() {

  /**
   * Finds and returns the smallest common multiple of
   * the two numbers and others in between.
   * 
   * @param  {Array} numbers
   * @return {Integer}
   */
  this.findSmallestMultiplier = function(numbers) {
    guardArray(numbers);
    guardInteger(numbers);

    return getFullInterval(
      numbers[0],
      numbers[1]
    ).reduce(function(previous, current) {
      var greatestDivisor = calculateGreatestDivisor(
        previous,
        current
      );

      return (previous * current) / greatestDivisor;
    });
  }

  /**
   * Calculates the greatest common divisor
   * of the provided numbers using
   * Euclidian algorithm.
   *
   * @param {Integer} x
   * @param {Integer} y
   * @return {Integer}
   */
  var calculateGreatestDivisor = function(x, y) {
    if (y === 0) {
      return x;
    }
    return calculateGreatestDivisor(y, x % y);
  }

  /**
   * Gets the numbers in between the passed values.
   *
   * @param {Integer} firstNumber
   * @param {Integer} lastNumber
   * @return {Array}
   */
  var getFullInterval = function(firstNumber, lastNumber) {
    var greaterNumber = Math.max(firstNumber, lastNumber);
    var smallestNumber = Math.min(firstNumber, lastNumber);

    var middleNumbers = [];

    for (var i = smallestNumber; i <= greaterNumber; i++) {
      middleNumbers.push(i);
    };

    return middleNumbers;
  }

  /**
   * Checks if the passed parameter is a valid array.
   * 
   * @param  {Array} numbers
   * @throws {String} If numbers is not an array.
   */
  var guardArray = function(numbers) {
    if (!(numbers instanceof Array)) {
      throw 'Only arrays are allowed as parameters.';
    }

    if (numbers.length !== 2) {
      throw 'Only arrays with two elements are allowed.';
    }
  }

  /**
   * Checks if the passed integer is a valid one.
   * 
   * @param  {Array} numbers
   * @throws {String} If currentNumber is not a valid integer.
   */
  var guardInteger = function(numbers) {
    for (var i = numbers.length - 1; i >= 0; i--) {
      var message = 'Only arrays with integers are allowed.';
      if (typeof numbers[i] !== 'number' || numbers[i] % 1 !== 0) throw message;
    };
  }

}
