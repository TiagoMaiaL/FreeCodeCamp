/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */

describe('InputHandler', function() {

  var inputHandler = null;
  var game = {
    isPresenting : false,
    setInputHandler : function(handler) {},
    setHardMode : function(mode) {},
    isPresentingSequence : function() {
      return this.isPresenting;
    },
    getPlayer : function() {
      return this.player;
    },
    player : {
      addColor : function(color) {}
    },
    checkPlayerRound : function() {}
  }

  beforeEach(function() {
    inputHandler = new InputHandler();
    inputHandler.setGame(game);
  });

  it('should have a game reference', function() {
    inputHandler.setGame(game);
    expect(inputHandler.getGame()).toBe(game);
  });

  it('should have a receive method to get the chosen color', function() {
    expect(inputHandler.receive).not.toBeNull();
  });

  it('should add a color to the game player', function() {
    spyOn(game.player, 'addColor');
    inputHandler.receive({color : 'red'});

    expect(game.player.addColor).toHaveBeenCalledWith(jasmine.any(Color));
  });

  it('should change the game mode', function() {
    spyOn(game, 'setHardMode');
    inputHandler.receive({hardMode : true});

    expect(game.setHardMode).toHaveBeenCalledWith(true);
  });

  it('should check if sequence is being presented', function() {
    spyOn(game, 'isPresentingSequence');
    inputHandler.receive({color : 'red'});

    expect(game.isPresentingSequence).toHaveBeenCalled();
  });

  it('should forbid any input while presenting', function() {
    game.isPresenting = true;
    expect(function() {
      inputHandler.receive({color : 'red'});
    }).toThrow('The sequence is being presented.');
  });

  it('should ask the game to check rounds after each input', function() {
    game.isPresenting = false;
    spyOn(game, 'checkPlayerRound');
    inputHandler.receive({color : 'green'});
  });

});
