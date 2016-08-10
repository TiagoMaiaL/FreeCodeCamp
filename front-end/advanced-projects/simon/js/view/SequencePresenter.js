/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */
// TODO: download and present sounds.
// TODO: Determine the hex of the colors for the selected controls.
// TODO: Determine the hex of the colors for each control.

/**
 * Object responsible for presenting the
 * color sequence of the game.
 */
function SequencePresenter() {

  /**
   * The Hex of the colors used by each control.
   * @type Object
   */
  var colorsHex = {
    blue    : '#0099CC',
    green   : '#28ED00',
    yellow  : '#EAF200',
    red     : '#CC3300',
  }

  /**
   * Reference to the red control element.
   * @type Object
   */
  var redControl = null;

  /**
   * Reference to the yellow control element.
   * @type Object
   */
  var yellowControl = null;

  /**
   * Reference to the green control element.
   * @type Object
   */
  var greenControl = null;

  /**
   * Reference to the blue control element.
   * @type Object
   */
  var blueControl = null;

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
    redControl = $('#red-control');
    yellowControl = $('#yellow-control');
    greenControl = $('#green-control');
    blueControl = $('#blue-control');
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
    sequence.getItems().forEach(function(color, index, array) {
      var calculatedDelay = calculateDelay(array.length) * (index + 1);
      var pauseDelay = calculatedDelay + 400;

      setTimeout(function() {
        presentColor(color, index, array);
      }, calculatedDelay);

      setTimeout(function() {
        clearControls(index, array);
      }, pauseDelay);
    });
  }

  /**
   * Checks if sequence is being presented.
   * @return Boolean
   */
  this.isPresentingSequence = function() {
    return isPresenting;
  }

  /**
   * Presents the winner view to the player.
   * @return void
   */
  this.presentWinner = function() {
    console.log("winner");
  }

  /**
   * presents a single color to the user.
   * @param  Color color
   * @param  Integer index
   * @param  Array array
   * @return void
   */
  var presentColor = function(color, index, array) {
    switch(color.getName()) {
      case 'red':
        setControlColor(redControl, 'gray');
        break;
      case 'yellow':
        setControlColor(yellowControl, 'gray');
        break;
      case 'green':
        setControlColor(greenControl, 'gray');
        break;
      case 'blue':
        setControlColor(blueControl, 'gray');
        break;
    }

    if ((array.length - 1) == index) {
      isPresenting = false;
    }
  }

  /**
   * Sets the initial colors for all the controls.
   * @param Integer index
   * @param Array array
   * @return void
   */
  var clearControls = function(index, array) {
    // TODO: Cancel any playing sound.
  
    setControlColor(redControl, colorsHex.red);
    setControlColor(yellowControl, colorsHex.yellow);
    setControlColor(greenControl, colorsHex.green);
    setControlColor(blueControl, colorsHex.blue);

    if (index + 1 == array.length)
      isPresenting = false;
  }

  /**
   * Calculates the color presentation time.
   * @return Integer delay
   */
  var calculateDelay = function(arrayLength) {
    // TODO: Calculate delay based on length.
    // Hardcoded value for now.
    return 1000;
  }

  /**
   * Sets the color for the passed jquery element.
   * @param Object control
   * @param String color
   */
  var setControlColor = function(control, color) {
    control.css('background-color', color);
  }

  this.bindElements();
}