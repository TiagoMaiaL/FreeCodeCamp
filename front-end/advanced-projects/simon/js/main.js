/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */
// TODO: Refactor to use getters and setters.
// TODO: Refactor to use Prototypes.
// TODO: Use CSS3 animations instead of jquery animations.

$(document).ready(function() {

  /**
   * Object responsible for presenting
   * the color sequence to the user.
   * @type SequencePresenter
   */
  var presenter = new SequencePresenter();

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
   * Object responsible for handling click events.
   * @type EventHandler
   */
  var eventHandler = new EventHandler(inputHandler, presenter, game);

  /**
   * Initiates the game,
   * @return void
   */
  var initGame = function() {
    eventHandler.bindElements();

    game.setPresenter(presenter);
    game.setInputHandler(inputHandler);
    inputHandler.setGame(game);
  }

  initGame();

});
