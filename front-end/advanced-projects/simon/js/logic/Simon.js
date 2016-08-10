/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */

/**
 * Object responsible for controlling
 * game events and actions.
 * @param Sequence sequence
 */
function Simon(sequence) {

  /**
   * The game sequence of colors.
   * @type Sequence
   */
  var gameSequence = null;

  /**
   * Game's player
   * @type Player
   */
  var player = new Player();

  /**
   * Game's sequence presenter
   * @type GamePresenter
   */
  var gamePresenter = null;

  /**
   * Maximum number of possible rounds.
   * @type Integer
   */
  var maxRoundsNumber = 20;

  /**
   * Is the game in hard mode?
   * @type Boolean
   */
  var hardModeActive = false;

  /**
   * Game's input handler
   * @type InputHandler
   */
  var inputHandler = null;

  /**
   * Returns the game sequence
   * @return Sequence
   */
  this.getSequence = function() {
    return gameSequence;
  }

  /**
   * Sets the handler sequence.
   * @param Sequence sequence
   */
  this.setSequence = function(sequence) {
    guardSequence(sequence);

    if (sequence === null || sequence === undefined)  {
      gameSequence = new Sequence();
      return;
    }

    gameSequence = sequence;
  }

  /**
   * Returns the underlying player object.
   * @return Player
   */
  this.getPlayer = function() {
    return player;
  }

  /**
   * Returns the game presenter.
   * @return GamePresenter
   */
  this.getPresenter = function() {
    return gamePresenter;
  }

  /**
   * Sets the game presentation object.
   * @param GamePresenter presenter
   * @return void
   */
  this.setPresenter = function(presenter) {
    guardPresenter(presenter);
    gamePresenter = presenter;
  }

  /**
   * Retunds the maximum number of rounds.
   * @return Integer
   */
  this.getMaxRounds = function() {
    return maxRoundsNumber;
  }

  /**
   * Sets the maximum number of rounds for the game.
   * @param Integer maxRounds
   */
  this.setMaxRounds = function(maxRounds) {
    maxRoundsNumber = maxRounds;
  }

  /**
   * Sets the game in hard mode or dactivates it.
   * @param Boolean
   */
  this.setHardMode = function(isHardMode) {
    hardModeActive = isHardMode;
  }

  /**
   * Returns a boolean indicating if the game is in hard mode.
   * @return Boolean
   */
  this.getHardMode = function() {
    return hardModeActive;
  }

  /**
   * Sets the input handler for the given object.
   * @param InputHandler handler
   */
  this.setInputHandler = function(handler) {
    inputHandler = handler;
  }

  /**
   * Returns the input handler.
   * @return InputHandler
   */
  this.getInputHandler = function() {
    return inputHandler;
  }

  /**
   * Validates the player round.
   * @return void
   */
  this.checkPlayerRound = function() {
    var areSequencesEqual = this.validatePlayerSequence();
    var isLastRound = this.getPlayer().getColorsCount() == this.getMaxRounds();

    if (areSequencesEqual && isLastRound) {
      this.presentWinner();
      return;
    }

    if (areSequencesEqual) {
      this.goNextRound();
      return;
    }

    if (this.getHardMode()) {
      this.resetGame();
      this.goNextRound();
      return;
    }

    this.presentRound();
  }

  /**
   * Starts the game.
   * @return SimonGame
   */
  this.start = function() {
    this.goNextRound();
    return this;
  }

  /**
   * Resets the game color sequences.
   * @return Void
   */
  this.resetGame = function() {
    this.setSequence(new Sequence());
    this.getPlayer().resetColors();
  }

  /**
   * Makes the game go to next round and
   * calls the presentation process.
   * @return Game
   */
  this.goNextRound = function() {
    this.addRandomColor();
    this.presentRound();
    return this;
  }

  /**
   * Adds a random color to the passed colors sequence.
   * @param Sequence colors
   * @throws Exception If sequence is not a Sequence
   * @returns Sequence
   */
  this.addRandomColor = function() {
    gameSequence.push(getRandomColor());
    return gameSequence;
  }

  /**
   * Resets game's current round.
   * @return void
   */
  this.presentRound = function() {
    this.getPlayer().resetColors();
    this.getPresenter().present(this.getSequence());
  }

  /**
   * Show the presentWinner view for the player.
   * @return void
   */
  this.presentWinner = function() {
    this.getPresenter().presentWinner();
    this.resetGame();
  }

  /**
   * Checks if the presentation is happening.
   * @return Boolean
   */
  this.isPresentingSequence = function() {
    return this.getPresenter().isPresentingSequence();
  }

  /**
   * Validates player's sequence
   * @return Boolean
   */
  this.validatePlayerSequence = function() {
    return this.equals(this.getPlayer().getColors());
  }

  /**
   * Compares the handler's sequence to the given one.
   * @param  Sequence sequence
   * @return Boolean
   */
  this.equals = function(sequence) {
    var handlerSequence = gameSequence;

    if (sequence.count() < handlerSequence.count()) {
      handlerSequence = handlerSequence.getRange(0, sequence.count() - 1);
    }

    return handlerSequence.equals(sequence);
  }

  /**
   * Generates a random color.
   * @return Color
   */
  var getRandomColor = function() {
    var randomIndex = Math.floor(Math.random() * 4);

    var color = new Color();
    color.setName(color.possibleColors[randomIndex]);

    return color;
  }

  /**
   * Validates the sequence
   * @param  Sequence sequence
   * @throws Exception If Sequence is not a sequence
   * @return void
   */
  var guardSequence = function(sequence) {
    if (sequence == false || sequence == null) {
      return;
    }

    if (!(sequence instanceof Sequence)) {
      throw 'Invalid sequence passed as parameter';
    }
  }

  /**
   * Validates the presenter.
   * @param  SequencePresenter presenter
   * @throws Exception If presenter is invalid
   * @return void
   */
  var guardPresenter = function(presenter) {
    if (presenter == null || presenter == undefined) {
      return;
    }

    if (typeof presenter.present != 'function') {
      throw 'Invalid presenter object sent.';
    }
  }

  this.setSequence(sequence);
  this.setPresenter();
}
