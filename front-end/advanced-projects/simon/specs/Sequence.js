/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */

describe('Sequence', function() {

  /**
   * Convenience method for getting a Sequence object.
   * @param  Array items
   * @return Sequence
   */
  function sequenceFactory(items) {
    return new Sequence(items);
  }

  /**
   * Convenience method for getting a Sequence object.
   * @param  Array items
   * @return Sequence
   */
  function colorFactory(name) {
    return new Color(name);
  }

  it('should get an array as items', function() {
    expect(sequenceFactory([1, 2, 3]).getItems()).toEqual([1, 2, 3]);
  });

  it('should return the sencond element', function() {
    expect(sequenceFactory([1, 2, 3]).getElement(1)).toBe(2);
  });

  it('should return the length of the sequence', function() {
    expect(sequenceFactory([1, 2, 3]).count()).toBe(3);
  });

  it('should add a new element into the sequence', function() {
    expect(sequenceFactory([1, 2, 3]).push(4).getElement(3)).toBe(4);
  });

  it('should compare two different sequences', function() {
    var firstSequence = sequenceFactory([1, 2, 3]);
    var secondSequence = sequenceFactory([1, 2, 3]);

    expect(firstSequence.equals(secondSequence)).toBeTruthy();
  });

  // TODO: Refactor this later on. DRY
  it('should compare equal sequences with Color objects', function() {
    var colors = [
      colorFactory('blue'),
      colorFactory('yellow')
    ];
    var secondColors = [
      colorFactory('blue'),
      colorFactory('yellow')
    ];
    var firstSequence = sequenceFactory(colors);
    var secondSequence = sequenceFactory(secondColors);

    expect(firstSequence.equals(secondSequence)).toBeTruthy();
  });

  it('should compare different sequences with Colors', function() {
    var colors = [
      colorFactory('blue'),
      colorFactory('yellow')
    ];
    var secondColors = [
      colorFactory('green'),
      colorFactory('red')
    ];
    var firstSequence = sequenceFactory(colors);
    var secondSequence = sequenceFactory(secondColors);

    expect(firstSequence.equals(secondSequence)).toBeFalsy();
  });

  it('should deny comparing objects without an equals function', function() {
    var firstSequence = sequenceFactory([{}]);
    var secondSequence = sequenceFactory([{}]);

    expect(function() {
        firstSequence.equals(secondSequence);
    }).toThrow('The sequence objects must implement an equals() method.');
  });

  it('should not accept a value other than an array', function() {
    expect(function() {
        sequenceFactory(1)
    }).toThrow('Invalid array passed to sequence.');

    expect(function() {
        sequenceFactory(false)
    }).toThrow('Invalid array passed to sequence.');

    expect(function() {
        sequenceFactory("string")
    }).toThrow('Invalid array passed to sequence.');

    expect(function() {
        sequenceFactory(new Object())
    }).toThrow('Invalid array passed to sequence.');
  });

  it('should return a sequence specified in a rande', function() {
    expect(sequenceFactory([1, 2, 3, 4]).getRange(0, 1)).toEqual([1, 2]);
  });

  it('should throw out of bounds', function() {
    expect(function() {
      sequenceFactory([1, 2]).getRange(0, 4);
    }).toThrow('The passed range is out of bounds.');
  });
  
});
