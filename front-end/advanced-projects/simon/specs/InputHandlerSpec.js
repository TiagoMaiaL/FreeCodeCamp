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

  beforeEach(function() {
    inputHandler = new InputHandler();
  });

  it('should have a game reference', function() {
    var game = jasmine.createSpyObj('Simon', 'setInputHandler');

    inputHandler.setGame(game);
    expect(inputHandler.getGame()).toBe(game);
  });

  it('should have a receive method to get the chosen color', function() {
    expect(inputHandler.receive).not.toBeNull();
  });

  it('should add a color to the game player', function() {
    var game = {
      player : {
        addColor : function(color) {}
      }
    }
    spyOn(game.player, 'addColor');
    inputHandler.setGame(game);
    inputHandler.receive({color : 'red'});

    expect(game.player.addColor).toHaveBeenCalledWith(jasmine.any(Color));
  });

  it('should change the game mode', function() {
    var game = {
      setHardMode : function(mode) {}
    }
    spyOn(game, 'setHardMode');
    inputHandler.setGame(game);
    inputHandler.receive({hardMode : true});

    expect(game.setHardMode).toHaveBeenCalledWith(true);
  });

  it('should check if sequence is being presented', function() {
    var game = {
      isPresentingSequence : function() {
        return true;
      }
    }
    spyOn(game, 'isPresentingSequence');
    inputHandler.setGame(game);
    inputHandler.receive({color : 'red'});

    expect(game.isPresentingSequence).toHaveBeenCalled();
  });

  it('should forbid any input while presenting', function() {
    var game = {
      isPresentingSequence : function() {
        return true;
      }
    }
    inputHandler.setGame(game);

    expect(function() {
      inputHandler.receive({color : 'red'});
    }).toThrow('The sequence is being presented.');
  });

});
