/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * game game solution.
 * https://www.freecodecamp.com/challenges/build-a-game-game
 */

describe('Simon', function() {

  var game;

  beforeEach(function() {
    game = new Simon();
  });

  it('should come with a empty sequence if no one is passed', function() {
    expect(game.getSequence().count()).toBe(0);
  });

  it('should validate the passed sequence to the constructor', function() {
    game.setSequence(new Sequence([1]));
    expect(game.getSequence().count()).toBe(1);
  });

  it('should append a color to the game sequence', function() {
    var possibleColors = (new Color()).possibleColors;
    var sequence = game.addRandomColor();
    expect(sequence.count()).toBe(1);
    expect(sequence.getElement(0)).toEqual(jasmine.any(Color));
    expect(possibleColors).toContain(sequence.getElement(0).getName());
  });

  it('should compare itself with the given sequence', function() {
    game.setSequence(
      new Sequence([1, 2, 3])
    );
    expect(
      game.equals(new Sequence([1, 2, 3]))
    ).toBeTruthy();
  });

  it('should compare itself with a smaller sequence\'s range', function() {
    game.setSequence(
      new Sequence([1, 2, 3, 4])
    );
    expect(
      game.equals(new Sequence([1, 2, 3])) &&
      game.equals(new Sequence([1, 2])) &&
      game.equals(new Sequence([1]))
    ).toBeTruthy();
  });

  it('should compare itself with a different sequence', function() {
    game.setSequence(
      new Sequence([1, 2, 3, 4])
    );
    expect(
      game.equals(new Sequence([2, 1, 3]))
    ).toBeFalsy();
  });

});
