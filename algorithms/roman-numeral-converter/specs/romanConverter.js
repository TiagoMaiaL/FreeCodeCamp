/**
 * Free Code Camp
 * Algorithm solutions.
 *
 * Roman numeral converter solution.
 * https://www.freecodecamp.com/challenges/roman-numeral-converter
 */

describe('RomanConverter', function() {

  it('returns I when the number 1 is sent', function() {
    expect(convertToRoman(1)).toBe('I');
  });

  it('returns II when the number 2 is sent', function() {
    expect(convertToRoman(2)).toBe('II');
  });

  it('returns III when the number 3 is sent', function() {
    expect(convertToRoman(3)).toBe('III');
  });

  it('returns IV when the number 4 is sent', function() {
    expect(convertToRoman(4)).toBe('IV');
  });

  it('returns V when the number 5 is sent', function() {
    expect(convertToRoman(5)).toBe('V');
  });

  it('returns VI when the number 6 is sent', function() {
    expect(convertToRoman(6)).toBe('VI');
  });

  it('returns VII when the number 7 is sent', function() {
    expect(convertToRoman(7)).toBe('VII');
  });

  it('returns VIII when the number 8 is sent', function() {
    expect(convertToRoman(8)).toBe('VIII');
  });

  it('returns IX when the number 9 is sent', function() {
    expect(convertToRoman(9)).toBe('IX');
  });

  it('returns X when the number 10 is sent', function() {
    expect(convertToRoman(10)).toBe('X');
  });

  it('returns XIV when the number 14 is sent', function() {
    expect(convertToRoman(14)).toBe('XIV');
  });

  it('returns XVI when the number 16 is sent', function() {
    expect(convertToRoman(16)).toBe('XVI');
  });

  it('returns XIX when the number 19 is sent', function() {
    expect(convertToRoman(19)).toBe('XIX');
  });

  it('returns XX when the number 20 is sent', function() {
    expect(convertToRoman(20)).toBe('XX');
  });

  it('returns XXIV when the number 29 is sent', function() {
    expect(convertToRoman(29)).toBe('XXIX');
  });

  it('returns XXX when the number 30 is sent', function() {
    expect(convertToRoman(30)).toBe('XXX');
  });

  it('returns XL when the number 40 is sent', function() {
    expect(convertToRoman(40)).toBe('XL');
  });

  it('returns XLIV when the number 44 is sent', function() {
    expect(convertToRoman(44)).toBe('XLIV');
  });

  it('returns L when the number 50 is sent', function() {
    expect(convertToRoman(50)).toBe('L');
  });

  it('returns LX when the number 60 is sent', function() {
    expect(convertToRoman(60)).toBe('LX');
  });

  it('returns LXVIII when the number 68 is sent', function() {
    expect(convertToRoman(68)).toBe('LXVIII');
  });

  it('returns LXXXIII when the number 83 is sent', function() {
    expect(convertToRoman(83)).toBe('LXXXIII');
  });

  it('returns XC when the number 90 is sent', function() {
    expect(convertToRoman(90)).toBe('XC');
  });

  it('returns XCVII when the number 97 is sent', function() {
    expect(convertToRoman(97)).toBe('XCVII');
  });

  it('returns C when the number 100 is sent', function() {
    expect(convertToRoman(100)).toBe('C');
  });

  it('returns CX when the number 110 is sent', function() {
    expect(convertToRoman(110)).toBe('CX');
  });

  it('returns CL when the number 150 is sent', function() {
    expect(convertToRoman(150)).toBe('CL');
  });

  it('returns CD when the number 400 is sent', function() {
    expect(convertToRoman(400)).toBe('CD');
  });

  it('returns D when the number 500 is sent', function() {
    expect(convertToRoman(500)).toBe('D');
  });

  it('returns DC when the number 600 is sent', function() {
    expect(convertToRoman(600)).toBe('DC');
  });

  it('returns DCI when the number 601 is sent', function() {
    expect(convertToRoman(601)).toBe('DCI');
  });

  it('returns DCCXCVIII when the number 798 is sent', function() {
    expect(convertToRoman(798)).toBe('DCCXCVIII');
  });

  it('returns DCCCXCI when the number 891 is sent', function() {
    expect(convertToRoman(891)).toBe('DCCCXCI');
  });

  it('returns CM when the number 900 is sent', function() {
    expect(convertToRoman(900)).toBe('CM');
  });

  it('returns M when the number 1000 is sent', function() {
    expect(convertToRoman(1000)).toBe('M');
  });

  it('returns MD when the number 1500 is sent', function() {
    expect(convertToRoman(1500)).toBe('MD');
  });

  it('returns MM when the number 2000 is sent', function() {
    expect(convertToRoman(2000)).toBe('MM');
  });

  it('returns MD when the number 2000 is sent', function() {
    expect(convertToRoman(2000)).toBe('MM');
  });

  it('returns MMMCMXCIX when the number 3999 is sent', function() {
    expect(convertToRoman(3999)).toBe('MMMCMXCIX');
  });

});