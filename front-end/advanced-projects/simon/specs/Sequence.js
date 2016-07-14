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
  
});
