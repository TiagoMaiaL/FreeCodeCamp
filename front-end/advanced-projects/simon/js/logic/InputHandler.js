/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */

function InputHandler() {

  /**
   * Simon Game reference.
   * @type Simon
   */
  var game = null;

  /**
   * Gets the game reference.
   * @return Game
   */
  this.getGame = function() {
    return game;
  }

  /**
   * Sets handler's game reference.
   * @param Simon
   * @return void
   */
  this.setGame = function(simonGame) {
    game = simonGame;
  }

  /**
   * Receives the input information sent.
   * @param  Object info
   * @throws Exception If game sequence is being presented.
   * @return void
   */
  this.receive = function(info) {
    guardPresentation();

    if (info.hasOwnProperty('color')) {
      this.getGame().getPlayer().addColor(
        new Color(info.color)
      );
      this.getGame().checkPlayerRound();
    }

    if (info.hasOwnProperty('hardMode')) {
      this.getGame().setHardMode(info.hardMode);
    }
  }

  /**
   * Checks if the game sequence is being presented.
   * @throws Exception If game's sequence is being presented.
   */
  var guardPresentation = function() {
    if (this.getGame().isPresentingSequence()) {
      throw 'The sequence is being presented.';
    }
  }.bind(this);

}
