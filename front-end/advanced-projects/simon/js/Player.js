/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */

/**
 * Represents the current player.
 */
function Player() {

  /**
   * Player's Sequence object.
   * @type Sequence
   */
  var colors = new Sequence();

  /**
   * Returns the user's sequence.
   * @return Sequence
   */
  this.getColors = function() {
    return colors;
  }

  /**
   * Adds a color to the user's sequence
   * @param Color color
   * @return PlayerSequence
   */
  this.addColor = function(color) {
    guardColor(color);
    colors.push(color);
    return this;
  }

  /**
   * Returns the count of the player's sequence.
   * @return Integer
   */
  this.getColorsCount = function() {
    return colors.count();
  }

  /**
   * Resets the user's colors.
   * @return void
   */
  this.resetColors = function() {
    colors = new Sequence;
  }

  /**
   * Validates the given color object.
   * @param  Color color
   * @throws Exception If color is not a valid color object.
   * @return void
   */
  var guardColor = function(color) {
    if (!(color instanceof Color)) {
      throw 'Only colors can be added to the sequence.';
    }
  }

}