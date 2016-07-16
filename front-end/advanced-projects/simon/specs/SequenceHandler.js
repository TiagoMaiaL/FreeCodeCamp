/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */

describe('SequenceHandler', function() {

  var handler;

  beforeEach(function() {
    handler = new SequenceHandler();
  });

  it('should come with a empty sequence if no one is passed', function() {
    expect(handler.getSequence().count()).toBe(0);
  });

  it('should validate the passed sequence to the constructor', function() {
    var handler = new SequenceHandler(new Sequence([1]));
    expect(handler.getSequence().count()).toBe(1);
  });

  it('should generate a color object', function() {
    var validColors = (new Color()).possibleColors;
    expect(validColors).toContain(handler.getRandomColor().getName());
  });

  it('should append a color to the game sequence', function() {
    var sequence = handler.addRandomColor();
    expect(sequence.count()).toBe(1);
    expect(sequence.getElement(0)).toEqual(jasmine.any(Color));
  });

  it('should compare itself with the given sequence', function() {
    handler.setSequence(
      new Sequence([1, 2, 3])
    );
    expect(
      handler.equals(new Sequence([1, 2, 3]))
    ).toBeTruthy();
  });

});
