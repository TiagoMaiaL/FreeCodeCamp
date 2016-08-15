/**
 * Free Code Camp
 *
 * Advanced Front-End Projects.
 *
 * Simon game solution.
 * https://www.freecodecamp.com/challenges/build-a-simon-game
 */

/**
 * Object responsible for Handling
 * the game sound.
 */
function Sound() {

  /**
   * Audio instance.
   * @type Audio
   */
  this.player = null;

  /**
   * Plays a sound for the given color name.
   * @param  String colorName
   * @return void
   */
  this.play = function(colorName) {
    soundPath = 'resources/';
    switch(colorName) {
      case 'red':
        soundPath += 'simonSound1.mp3';
        break;
      case 'yellow':
        soundPath += 'simonSound2.mp3';
        break;
      case 'green':
        soundPath += 'simonSound3.mp3';
        break;
      case 'blue':
        soundPath += 'simonSound4.mp3';
        break;
    }

    this.player = new Audio(soundPath);
    this.player.play();
  }

  /**
   * Clears the current playing sound.
   * @return void
   */
  this.clearSound = function() {
    if (this.player) {
      this.player.stop();
    }
    this.player = null;
  }

}