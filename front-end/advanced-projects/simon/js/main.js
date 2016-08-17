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
  // TODO: Remove this later on.
  // presenter.present(new Sequence([
  //   new Color('red'),
  //   new Color('blue'),
  //   new Color('green'),
  //   new Color('red'),
  //   new Color('yellow'),
  //   new Color('green'),
  //   new Color('blue'),
  //   new Color('red'),
  //   new Color('green'),
  //   new Color('yellow'),
  //   new Color('blue'),
  //   new Color('red'),
  //   new Color('green')
  // ]));

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

    game.setPresenter(presenter);
    game.setInputHandler(inputHandler);
    inputHandler.setGame(game);
  }

  // TODO: Extract this to a single class.
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
      inputHandler.receive(info);
    });

    /**
     * Click handler for the game control.
     */
    $('#start').on('click', function() {
      if ($(this).attr('class').indexOf('fa-play')) {
        $(this).attr('class', 'fa fa-repeat');
        game.start();
        return;
      }

      // TODO: Refactor this method name.
      game.resetGame();
    });

    /**
     * Click handler for the hard mode control.
     */
    $('#hard').on('click', function() {
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
