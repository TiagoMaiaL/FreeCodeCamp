/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */

function EventHandler(inputHandler, gamePresenter, simonGame) {

  /**
   * Input handler.
   * @type InputHandler
   */
  var input = inputHandler;

  /**
   * Sequence presenter
   * @type SequencePresenter
   */
  var presenter = gamePresenter;

  /**
   * Game
   * @type Simon
   */
  var game = simonGame;

  /**
   * Binds the events for each one of the controls.
   * @return void
   */
  this.bindElements = function() {

    /**
     * Click handler for the color panel.
     */
    $('.control').on('click', handleColorClick);

    /**
     * Click handler for the game control.
     */
    $('#start').on('click', handleStartClick);

    /**
     * Click handler for the hard mode control.
     */
    $('#hard').on('click', handleHardClick);
  }

  /**
   * Handles the color control click event.
   * @return void
   */
  var handleColorClick = function() {
    // TODO: Check fro presentation

    var info = {color : $(this).attr('id')}
    var colorName = null;
    var rgbaColor = null;

    // TODO: Refactor this.
    switch($(this).attr('id')) {
      case 'red':
        colorName = 'red';
        rgbaColor = 'rgba(204, 51, 0';
        break;
      case 'yellow':
        colorName = 'yellow';
        rgbaColor = 'rgba(234, 242, 0';
        break;
      case 'green':
        colorName = 'green';
        rgbaColor = 'rgba(40, 237, 0';
        break;
      case 'blue':
        colorName = 'blue';
        rgbaColor = 'rgba(0, 153, 204';
    }

    // TODO: This should be public a function.
    (new Sound()).play(colorName);

    $(this).animate({backgroundColor : rgbaColor + ', 1)'}, 100, "linear", function() {
      $(this).animate({backgroundColor : rgbaColor + ', 0.6)'}, 100, "linear");
    });
    // --------------------------------------

    info.color = colorName;
    input.receive(info);
  }

  /**
   * Handles the start control click.
   * @return void
   */
  var handleStartClick = function() {
    if ($(this).attr('class').indexOf('fa-play')) {
      $(this).attr('class', 'fa fa-repeat');
      game.start();
      return;
    }

    // TODO: Refactor this method name.
    game.resetGame();
  }

  /**
   * Handles the hard control click.
   * @return void
   */
  var handleHardClick = function() {
    var info = {hardMode : false};
    var isHardMode = $(this).attr('class') == 'active';

    if (!isHardMode) {
      info.hardMode = true;
    }

    inputHandler.receive(info);
  }

}