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
  var presenterSpy;

  beforeEach(function() {
    game = new Simon();
    presenterSpy = jasmine.createSpyObj(
      'GamePresenter',
      ['present', 'presentWinner']
    );
    game.setPresenter(
      presenterSpy
    );
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

  it('should have a player', function() {
    expect(game.getPlayer()).toEqual(jasmine.any(Player));
  });

  it('should validate the player\'s sequence range', function() {
    game.setSequence(
      new Sequence([
        new Color('blue'),
        new Color('red'),
        new Color('green')
      ])
    );
    game.getPlayer().addColor(new Color('blue'));
    expect(game.validatePlayerSequence()).toBeTruthy();
  });

  it('should validate the player\'s sequence', function() {
    game.setSequence(
      new Sequence([new Color('red')])
    );
    game.getPlayer().addColor(new Color('red'));
    expect(game.validatePlayerSequence()).toBeTruthy();
  });

  it('should go to next round', function() {
    expect(game.goNextRound().getSequence().count()).toBe(1);
  });

  it('should set and provide a presentation object', function() {
    var presenter = jasmine.createSpyObj('GamePresenter', ['present']);
    game.setPresenter(presenter);
    expect(game.getPresenter()).toBe(presenter);
  });

  it('should deny an invalid presenter to be set', function() {
    expect(function() {
      game.setPresenter(new Object())
    }).toThrow('Invalid presenter object sent.');
  });

  it('should call the presentation object', function() {
    game.goNextRound();
    expect(presenterSpy.present).toHaveBeenCalledWith(game.getSequence());
  });

  it('should reset player\'s colors when going to next round', function() {
    var player = game.getPlayer()
    player.addColor(new Color('red'));
    game.goNextRound();

    expect(player.getColorsCount()).toBe(0);
  });

  it('should have a setter and getter for maxRoundsNumber', function() {
    var maxRoundsNumber = 3;
    game.setMaxRounds(maxRoundsNumber);
    expect(game.getMaxRounds()).toBe(3);
  });

  it('should have a reset process', function() {
    game.getPlayer().addColor(new Color('blue'));
    game.setSequence(new Sequence([new Color('red')]));

    game.resetGame();

    expect(game.getSequence().count()).toBe(0);
    expect(game.getPlayer().getColorsCount()).toBe(0);
  });

  // TODO: write this test in a better way.
  it('should present the winner if sequences are final and equal', function() {
    var maxRoundsNumber = 2;
    game.setMaxRounds(maxRoundsNumber);
    var gameColors = new Sequence([new Color('red'), new Color('blue')]);

    game.getPlayer().resetColors();
    game.getPlayer().addColor(new Color('red'));
    game.getPlayer().addColor(new Color('blue'));
    game.setSequence(gameColors);

    game.checkPlayerRound();

    expect(game.getPresenter().presentWinner).toHaveBeenCalled();
  });

  it('should reset while presenting winner', function() {
    game.getPlayer().addColor(new Color('red'));
    game.setSequence(new Sequence([new Color('green')]));
    game.presentWinner();

    expect(game.getSequence().count()).toBe(0);
    expect(game.getPlayer().getColorsCount()).toBe(0);
  });

  it('should go to next round after validating the previous', function() {
    game.setMaxRounds(2);
    game.getPlayer().addColor(new Color('red'));
    game.setSequence(new Sequence([new Color('red')]));

    game.checkPlayerRound();

    expect(game.getPresenter().present).toHaveBeenCalled();
    expect(game.getPlayer().getColorsCount()).toBe(0);
  });

  it('should be able to activate hard mode', function() {
    game.setHardMode(true);
    expect(game.getHardMode()).toBeTruthy();
  });

  it('should be able to deactivate hard mode', function() {
    game.setHardMode(false);
    expect(game.getHardMode()).toBeFalsy();
  });

  it('should present the same round if player\'s sequence is wrong', function() {
    game.getPlayer().addColor(new Color('red'));
    game.setSequence(new Sequence([new Color('blue')]));

    game.checkPlayerRound();

    expect(game.getPresenter().present).toHaveBeenCalledWith(game.getSequence());
    expect(game.getSequence().count()).toBe(1);
    expect(game.getPlayer().getColorsCount()).toBe(0);
  });

  it('should reset the game if player\'s sequence is wrong and game is hard', function() {
    game.getPlayer().addColor(new Color('green'));
    game.getPlayer().addColor(new Color('yellow'));
    game.setSequence(new Sequence([
      new Color('blue'),
      new Color('red')
    ]));
    game.setHardMode(true);

    game.checkPlayerRound();

    expect(game.getSequence().count()).toBe(1);
    expect(game.getPlayer().getColorsCount()).toBe(0);
    expect(game.getPresenter().present).toHaveBeenCalled();
  });

  it('should have a input handler', function() {
    var inputHandler = jasmine.createSpyObj(
        'InputHandler',
        ['receive']
    );
    game.setInputHandler(inputHandler);

    expect(game.getInputHandler()).toBe(inputHandler);
  });

});
