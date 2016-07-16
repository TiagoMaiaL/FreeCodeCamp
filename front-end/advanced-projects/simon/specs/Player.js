/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */
// TODO: Organize PlayerSequence and SequenceHandler in a more consice way.
describe('Player', function() {

  var playerFactory = function() {
    return new Player(); 
  }

  it('should store the user color sequence', function() {
    expect(
      playerFactory().getSequence()
    ).toEqual(jasmine.any(Sequence));
  });

  it('should add a new color to the sequence', function() {
    expect(
      playerFactory().addColor(new Color('red')).getColorsCount()
    ).toBe(1);
  });

  it('should forbid a non color object to be added to the sequence', function() {
    expect(function() {
      playerFactory().addColor(null)
    }).toThrow('Only colors can be added to the sequence.');
  });

});