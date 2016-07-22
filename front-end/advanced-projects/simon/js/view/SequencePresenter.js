/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */

/**
 * Object responsible for presenting the
 * color sequence of the game.
 */
function SequencePresenter() {

  /**
   * Flag indicating whether sequence
   * is being presented.
   * @type Boolean
   */
  var isPresenting = false;

  /**
   * Binds html elements for presentation.
   * @return void
   */
  this.bindElements = function() {
    // TODO: bind the elements.
  }

  /**
   * Presents each element of the passed
   * sequence to the player
   * @param  Sequence sequence
   * @return void
   */
  this.present = function(sequence) {
    isPresenting = true;


    // TODO: present sequence.
    // TODO: Set timeout interval.
    // TODO: download and present sounds.


    isPresenting = false;
  }

  /**
   * Checks if sequence is being presented.
   * @return Boolean
   */
  this.isPresentingSequence = function() {
    return isPresenting;
  }

  this.bindElements();
}