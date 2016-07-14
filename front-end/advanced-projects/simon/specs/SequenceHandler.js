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

  it('should generate a color object', function() {
    var validColors = (new Color()).possibleColors;

    expect(validColors).toContain(handler.getRandomColor().getName());
  });

  it('should append a color to the passed sequence', function() {
    var sequence = handler.addNextColor(new Sequence());
    expect(sequence.count()).toBe(1);
    expect(sequence.getElement(0)).toEqual(jasmine.any(Color));
  });

  it('should deny non sequence values passed as parameter', function() {
    expect(function() {
      handler.addNextColor(null);
    }).toThrow('Invalid sequence passed as parameter');
  });

});