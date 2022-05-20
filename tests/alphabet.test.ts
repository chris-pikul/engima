// test src/alphabet.ts
import { expect } from 'chai';
import {
  getCharacterIndex,
  getCharacterFromIndex,
  getWiring,
  AlphabetABC,
  AlphabetQWERTZ,
  wiringToAlphabet,
} from '../src/alphabet';

describe('Alphabet utilities', () => {
  describe('getCharacterIndex', () => {
    it('gets a 0-based index from ABC', () => {
      expect(getCharacterIndex('c')).to.equal(2);
    });

    it('gets a 9-based index from QWERTZ', () => {
      expect(getCharacterIndex('e', AlphabetQWERTZ)).to.equal(2);
    });
  });

  describe('getCharacterFromIndex', () => {
    it('returns a character from 0-based index on ABC', () => {
      expect(getCharacterFromIndex(2)).to.equal('C');
    });

    it('returns a character from 0-based index on QWERTZ', () => {
      expect(getCharacterFromIndex(2, AlphabetQWERTZ)).to.equal('E');
    });

    it('works 1-to-1 with getCharacterIndex', () => {
      const char = getCharacterIndex('t');
      expect(getCharacterFromIndex(char)).to.equal('T');
    });
  });

  describe('getWiring', () => {
    it('produces a 1-to-1 mapping on ABC', () => {
      expect(getWiring('ABC')).to.eql([0, 1, 2]);
    });

    it('produces output indices for input CBA', () => {
      expect(getWiring('CBA')).to.eql([2, 1, 0]);
    });
  });

  describe('wiringToAlphabet', () => {
    it('maps 1-to-1 and back with getWiring', () => {
      const wire = getWiring(AlphabetABC);
      expect(wiringToAlphabet(wire, AlphabetABC)).to.equal(AlphabetABC);
    });
  });
});