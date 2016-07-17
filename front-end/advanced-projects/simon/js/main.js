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
   * Returns the underlying player object.
   * @return Player
   */
  this.getPlayer = function() {
    return player;
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
   * Validates player's sequence
   * @return Boolean
   */
  this.validatePlayerSequence = function() {
    return this.equals(this.getPlayer().getSequence());
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
  function guardSequence(sequence) {
    if (sequence == false || sequence == null) {
      return;
    }

    if (!(sequence instanceof Sequence)) {
      throw 'Invalid sequence passed as parameter';
    }
  }

  this.setSequence(sequence);
}

/**
 * Represents the current player.
 */
function Player() {

  /**
   * Player's Sequence object.
   * @type Sequence
   */
  var sequence = new Sequence();

  /**
   * Returns the user's sequence.
   * @return Sequence
   */
  this.getSequence = function() {
    return sequence;
  }

  /**
   * Adds a color to the user's sequence
   * @param Color color
   * @return PlayerSequence
   */
  this.addColor = function(color) {
    guardColor(color);
    sequence.push(color);
    return this;
  }

  /**
   * Returns the count of the player's sequence.
   * @return Integer
   */
  this.getColorsCount = function() {
    return sequence.count();
  }

  /**
   * Validates the given color object.
   * @param  Color color
   * @throws Exception If color is not a valid color object.
   * @return void
   */
  var guardColor = function(color) {
    if (!(color instanceof Color)) {
      throw 'Only colors can be added to the sequence.';
    }
  }

}

/**
 * Object representing a sequence of colors.
 * @param Array items
 */
function Sequence(externalItems) {

  /**
   * The sequence items.
   * @type Array
   */
  var items = null;

  /**
   * Returns the items kept by the sequence object.
   * @return Array
   */
  this.getItems = function() {
    return items;
  }

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
   * @return void
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

  /**
   * Checks if the current sequence is 
   * equals to the passed one.
   * @param  Sequence sequence
   * @return Boolean
   */
  this.equals = function(sequence) {
    var haveSameCount = this.count() == sequence.count(); 

    return haveSameCount && items.every(function(currentItem, index) {
      return compareItems(currentItem, sequence.getElement(index));
    });
  }

  /**
   * Returns the Sequence's range.
   * @param  Integer start
   * @param  Integer offset
   * @return Sequence
   */
  this.getRange = function(start, offset) {
    if (typeof items[start] === 'undefined') {
      throw 'The passed range is out of bounds.';
    }

    if (offset > this.count()) {
      throw 'The passed range is out of bounds.';
    }

    return new Sequence(items.slice(start, offset + 1));
  }

  /**
   * Sets the internal items array.
   * @param Array items
   * @return void
   */
  this.setItems = function(externalItems) {
    if (externalItems === null || externalItems === undefined) {
      items = [];
      return;
    }

    guardItems(externalItems);
    items = externalItems;
  }

  /**
   * Compares the two given values
   * @param  first
   * @param  second
   * @return Boolean
   */
  var compareItems = function(first, second) {
    if ((typeof first == 'object') && (typeof second == 'object')) {
      guardComparisionObject(first);
      guardComparisionObject(second);

      return first.equals(second);
    }

    return first === second;
  }

  /**
   * validates the passed items array.
   * @param  Array items
   * @throws Exception If items is not a valid array
   */
  var guardItems = function(items) {
    if (!(items instanceof Array)) {
      throw 'Invalid array passed to sequence.';
    }
  }

  /**
   * Checks if object implements equals()
   * @param  Object object
   * @throws Execption If object doesn't implement equals()
   * @return void
   */
  var guardComparisionObject = function(object) {
    if (typeof object.equals != 'function') {
      throw 'The sequence objects must implement an equals() method.';
    }
  }

  this.setItems(externalItems);
}

/**
 * Object representing a given color.
 */
function Color(name) {

  /**
   * List of possible colors in simon game.
   * @type Array
   */
  this.possibleColors = [
    'red',
    'yellow',
    'green',
    'blue'
  ];

  /**
   * The color name
   * @type String
   */
  var colorName = null;

  /**
   * Checks if the color object is equals to this
   * @param  Color color
   * @return Boolean
   */
  this.equals = function(color) {
    if (!(color instanceof Color)) {
      throw 'Comparision allowed only between colors.';
    }

    return color.getName() == this.getName();
  }

  /**
   * Validates the name passed through the constructor.
   * @param  String colorName
   * @throws Exception If colorName is not a string or invalid
   * @return void
   */
  this.guardName = function(colorName) {
    if (colorName == null) {
      return;
    }

    if (typeof colorName != 'string') {
      throw 'Color name should be a string.';
    }

    if (this.possibleColors.indexOf(colorName) < 0) {
      throw 'Invalid color name passed as arguemnt.';
    }
  }

  /**
   * Sets the color name.
   * @param String colorName
   * @return void
   */
  this.setName = function(name) {
    this.guardName(name);
    colorName = name;
  }

  /**
   * Gets the internal name.
   * @return String
   */
  this.getName = function() {
    return colorName;
  }

  this.setName(name);
}
