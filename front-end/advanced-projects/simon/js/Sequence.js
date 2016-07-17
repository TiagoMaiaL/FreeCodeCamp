/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */

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