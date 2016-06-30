/**
 * Free Code Camp
 * Algorithm solutions.
 *
 * Smallest Common Multiple solution.
 * https://www.freecodecamp.com/challenges/smallest-common-multiple
 */

describe('SmallestCommonsFinder', function() {

  it('returns a number', function() {
    expect(smallestCommons([1, 5])).toEqual(jasmine.any(Number));
  });

  it('returns 60 when [1, 5] array is passed', function() {
    expect(smallestCommons([1, 5])).toBe(60);
  });

  it('returns 60 when [5, 1] inverted array is passed', function() {
    expect(smallestCommons([5, 1])).toBe(60);
  });

  it('returns 360360 when [1, 13] array is passed', function() {
    expect(smallestCommons([1, 13])).toBe(360360);
  });

  it('should forbid non array parameters to be passed', function() {
    expect(
      function() {
        smallestCommons(12);
      }
    ).toThrow('Only arrays are allowed as parameters.');
  });

  it('should forbid an array with more than two elements', function() {
    expect(
      function() {
        smallestCommons([12, 13, 1]);
      }
    ).toThrow('Only arrays with two elements are allowed.');
  });

  it('should forbid an array with non integer elements', function() {
    expect(
      function() {
        smallestCommons([12, 'test']);
      }
    ).toThrow('Only arrays with integers are allowed.');
  });

});