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
    if (presenter.isPresentingSequence()) {
      return;
    }
    
    var colorName = $(this).attr('id');
    var info = {color : colorName}

    presenter.presentColor(colorName)
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