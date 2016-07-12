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

// TODO: Uncomment this later on.

// $(document).ready(function() {

//   /**
//    * Game control handler.
//    */
//   $('#game-control').on('click', function() {
//     // TODO: Instantiate a simon controller instance
//     // TODO: Check whether the instance exists before instantiating
//     // TODO: Start the game.
//   });

// });

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
function SequenceHandler() {

  /**
   * Generates a random color.
   * @return Color
   */
  this.getRandomColor = function() {
    return new Color();
  }

  /**
   * Adds a random color to the passed sequence.
   * @param Sequence sequence
   * @throws Exception If sequence is not a Sequence
   * @returns Sequence
   */
  this.addNextColor = function(sequence) {
    guardSequence(sequence);
    return sequence.push(this.getRandomColor());
  }

  /**
   * Validates the sequence
   * @param  Sequence sequence
   * @throws Exception If Sequence is not a sequence
   * @return void
   */
  function guardSequence(sequence) {
    if (sequence == null || sequence === false) {
      throw 'Invalid sequence passed as parameter';
    }

    if (!(sequence instanceof Sequence)) {
      throw 'Invalid sequence passed as parameter';
    }
  }
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

  /**
   * The sequence items.
   * @type Array
   */
  var items = [];

  /**
   * Returns the element at the specified index.
   * @param Integer index
   * @return Object
   */
  this.getElement = function(index) {
    return items[index];
  }

  /**
   * Pushes a new element into the array.
   * @param element
   * @return Array
   */
  this.push = function(element) {
    items.push(element);
    return this;
  }

  /**
   * Returns the count of the current sequence.
   * @return Integer
   */
  this.count = function() {
    return items.length;
  }
}

/**
 * Object representing a given color.
 */
function Color() {
  // ...
}
