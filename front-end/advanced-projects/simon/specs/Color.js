/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */

describe('Color', function() {

  // TODO: Allow null values to be passed.
  // If a non null value is passed, validate.

  /**
   * Convenience method for getting a color object.
   * @param  String name
   * @return Color
   */
  function colorFactory(name) {
    return new Color(name);
  }

  it('should receive the name while instantiating', function() {
    expect(colorFactory('yellow').getName()).toBe('yellow');
  });

  it('should forbid an invalid color name to be passed', function() {
    expect(function() {
      colorFactory('brown');
    }).toThrow('Invalid color name passed as arguemnt.');
  });

  it('should forbid non string values to be passed', function() {

    var message = 'Color name should be a string.';

    expect(function() {
      colorFactory(1);
    }).toThrow(message);

    expect(function() {
      colorFactory(false);
    }).toThrow(message);
  });

});
