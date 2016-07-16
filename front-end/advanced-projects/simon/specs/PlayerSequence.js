/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */
// TODO: Organize PlayerSequence and SequenceHandler in a more consice way.
describe('PlayerSequence', function() {

  var playerSequenceFactory = function() {
    return new PlayerSequence(); 
  }

  var sequenceHandlerFactory = function() {
    return new SequenceHandler();
  }

  it('should store the user color sequence', function() {
    expect(
      playerSequenceFactory().getSequence()
    ).toEqual(jasmine.any(Sequence));
  });

  it('should add a new color to the sequence', function() {
    expect(
      playerSequenceFactory().addColor(new Color('red')).getCount()
    ).toBe(1);
  });

  it('should forbid a non color object to be added to the sequence', function() {
    expect(function() {
      playerSequenceFactory().addColor(null)
    }).toThrow('Only colors can be added to the sequence.');
  });

});