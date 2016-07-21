/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */

/**
 * Object representing a given color.
 */
function Color(name) {

  /**
   * List of possible colors in simon game.
   * @type Array
   */
  this.possibleColors = [
    'red',
    'yellow',
    'green',
    'blue'
  ];

  /**
   * The color name
   * @type String
   */
  var colorName = null;

  /**
   * Checks if the color object is equals to this
   * @param  Color color
   * @return Boolean
   */
  this.equals = function(color) {
    if (!(color instanceof Color)) {
      throw 'Comparision allowed only between colors.';
    }

    return color.getName() == this.getName();
  }

  /**
   * Validates the name passed through the constructor.
   * @param  String colorName
   * @throws Exception If colorName is not a string or invalid
   * @return void
   */
  this.guardName = function(colorName) {
    if (colorName == null) {
      return;
    }

    if (typeof colorName != 'string') {
      throw 'Color name should be a string.';
    }

    if (this.possibleColors.indexOf(colorName) < 0) {
      throw 'Invalid color name passed as arguemnt.';
    }
  }

  /**
   * Sets the color name.
   * @param String colorName
   * @return void
   */
  this.setName = function(name) {
    this.guardName(name);
    colorName = name;
  }

  /**
   * Gets the internal name.
   * @return String
   */
  this.getName = function() {
    return colorName;
  }

  this.setName(name);
}
