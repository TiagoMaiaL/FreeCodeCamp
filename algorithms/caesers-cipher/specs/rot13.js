/**
 * Free Code Camp
 *
 * Algorithm solutions.
 *
 * Caesers Cipher solution.
 * https://www.freecodecamp.com/challenges/caesars-cipher
 */

describe("rot13", function() {

  it('returns null when an empty string is passed', function() {
    expect((new Rot13()).decode('')).toBe(null);
  });

  it('returns "GREAT" when "TERNG" is passed', function() {
    expect((new Rot13()).decode('TERNG')).toBe('GREAT');
  });

  it('returns "GREAT" when lowercase "terng" is passed', function() {
    expect((new Rot13()).decode('terng')).toBe('GREAT');
  });

  it('returns the same string when characters are not passed', function() {
    expect((new Rot13()).decode('123')).toBe('123');
  });

  it('returns all characters decoded.', function() {
    expect((new Rot13()).decode('!T.E.R.N.G!')).toBe('!G.R.E.A.T!');
  });

  it('returns null when non string data types are passed', function() {
    var rot13 = new Rot13();
    expect(rot13.decode(true)).toBe(null);
    expect(rot13.decode(function(){})).toBe(null);
    expect(rot13.decode(1)).toBe(null);
    expect(rot13.decode(1.1)).toBe(null);
    expect(rot13.decode([])).toBe(null);
    expect(rot13.decode({})).toBe(null);
  });

});
