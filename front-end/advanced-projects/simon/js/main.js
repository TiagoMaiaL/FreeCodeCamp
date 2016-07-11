/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */

/**
 * Bootstrap
 * @return void
 */
$(document).ready(function() {

  /**
   * Game control handler.
   */
  $('#game-control').on('click', function() {
    // TODO: Instantiate a simon controller instance
    // TODO: Check whether the instance exists before instantiating
    // TODO: Start the game.
  });

});

/**
 * Object responsible for controlling
 * main game events and actions.
 */
function SimonGame() {

  /**
   * Number of colors in the current sequence.
   * @type Number
   */
  var sequenceCount = 0;

  /**
   * Current game sequence.
   * @type SequenceHandler
   */
  var sequence = null;

  /**
   * Starts the game.
   * @return void
   */
  this.start = function() {

  }

  /**
   * Pauses the game.
   * @return void
   */
  this.stop = function() {

  }

}

/**
 * Object responsible for handling user
 * input through the game buttons.
 */
function ControlHandler() {
  // ...
}

/**
 * Object responsible for controlling
 * the sequence of the game
 */
function SenquenceHandler() {
  // ...
}

/**
 * Object responsible for presenting a given sequence.
 */
function SequencePresenter() {
  // ...
}

/**
 * Object representing a sequence of colors.
 */
function Sequence() {
  // ...
}

/**
 * Object representing a given color.
 */
function Color() {
  // ...
}
