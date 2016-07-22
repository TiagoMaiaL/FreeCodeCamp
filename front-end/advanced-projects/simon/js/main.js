/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */

$(document).ready(function() {

  /**
   * Object responsible for presenting
   * the color sequence to the user.
   * @type SequencePresenter
   */
  // var presenter = new SequencePresenter();

  /**
   * Object responsible for handling user input.
   * @type InputHandler
   */
  var inputHandler = new InputHandler();

  /**
   * Object representing the game.
   * @type SimonGame
   */
  var game = new Simon();

  /**
   * Initiates the game,
   * @return void
   */
  var initGame = function() {
    bindDomEvents();

    // game.setPresenter(presenter);
    game.setInputHandler(inputHandler);
    inputHandler.setGame(game);
  }

  /**
   * Binds Dom events to input handler and sequence presenter.
   * @return void
   */
  var bindDomEvents = function() {

    /**
     * Click handler for the color panel.
     */
    $('.control').on('click', function() {
      var info = {color : null}
      var colorName = null;

      switch($(this).attr('id')) {
        case 'red-control':
          colorName = 'red';
          break;
        case 'yellow-control':
          colorName = 'yellow';
          break;
        case 'green-control':
          colorName = 'green';
          break;
        case 'blue-control':
          colorName = 'blue';
      }

      info.color = colorName;
      inputHandler.receive(info);
    });

    /**
     * Click handler for the game control.
     */
    $('#game-control').on('click', function() {
      game.start();
    });

    /**
     * Click handler for the hard mode control.
     */
    $('#hard-control').on('click', function() {
      var info = {hardMode : false};
      var isHardMode = $(this).attr('class') == 'active';

      if (!isHardMode) {
        info.hardMode = true;
      }

      inputHandler.receive(info);
    });
  }

  initGame();

});






