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
    expect(smallestCommons([1, 5]).toBe(60);
  });

  it('returns 60 when [5, 1] inverted array is passed', function() {
    expect(smallestCommons([5, 1]).toBe(60);
  });

  it('returns 360360 when [1, 13] array is passed', function() {
    expect(smallestCommons([1, 13]).toBe(360360);
  });

});