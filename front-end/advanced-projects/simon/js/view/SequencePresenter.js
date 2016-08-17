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
   * The Hex of the colors used by each control.
   * @type Object
   */
  var colorsRgba = {
    blue    : 'rgba(0,153,204,0.6)',
    green   : 'rgba(40, 237, 0, 0.6)',
    yellow  : 'rgba(234, 242, 0, 0.6)',
    red     : 'rgba(204,51,0,0.6)',
  }

  /**
   * Reference to the colors controls.
   * @type {Object}
   */
  var controls = {
    red     : $('#red'),
    yellow  : $('#yellow'),
    green   : $('#green'),
    blue    : $('#blue')
  }

  /**
   * Sound instance.
   * @type Sound
   */
  var sound = new Sound();

  /**
   * Flag indicating whether sequence
   * is being presented.
   * @type Boolean
   */
  var isPresenting = false;

  /**
   * Checks if sequence is being presented.
   * @return Boolean
   */
  this.isPresentingSequence = function() {
    return isPresenting;
  }

  /**
   * Presents each element of the passed
   * sequence to the player
   * @param  Sequence sequence
   * @return void
   */
  this.present = function(sequence) {
    updateSequenceCounter(sequence.count());

    isPresenting = true;

    sequence.getItems().forEach(function(color, index, array) {
      var calculatedDelay = calculateDelay(array.length) * (index + 1);
      var pauseDelay = calculatedDelay + 400;

      setTimeout(function() {
        this.presentColor(color.getName());
      }.bind(this), calculatedDelay);

      setTimeout(function() {
        if (index + 1 == array.length)
          isPresenting = false;
      }, pauseDelay);
    }.bind(this));
  }

  /**
   * presents a single color to the user.
   * @param  String colorName
   * @param  Integer index
   * @param  Array array
   * @return void
   */
  this.presentColor = function(colorName) {
    sound.play(colorName);
    animateColor(controls[colorName], colorsRgba[colorName]);
  }

  /**
   * Presents the winner view to the player.
   * @return void
   */
  this.presentWinner = function() {
    console.log("winner");
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
   * Animates the color for the passed jquery element.
   * @param Object control
   * @param String colorRgba
   */
  var animateColor = function(control, colorRgba) {
    colorRgba = colorRgba.split(',');
    colorRgba.pop();
    colorRgba = colorRgba.join(',');

    control.animate({backgroundColor : colorRgba + ', 1)'}, 100, "linear",function() {
      control.animate({backgroundColor : colorRgba + ', 0.6)'}, 100, "linear");
    });
  }

  /**
   * Updates the game's sequence counter to the user.
   * @param  Integer count
   * @return void
   */
  var updateSequenceCounter = function(count) {
    $('#counter').text(count);
  }
}