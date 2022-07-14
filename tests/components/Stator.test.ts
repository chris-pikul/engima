// test src/components/Stator.ts
import { expect } from 'chai';
import { AlphabetABC, AlphabetQWERTZ, getCharacterFromIndex, getCharacterIndex, getWiring } from '../../src/alphabet';
import Stator from '../../src/components/Stator';
import { ModelD } from '../../src/models';

describe('Component - Stator', () => {
  const numChars = 10;
  const map = [ 8, 5, 7, 6, 2, 3, 9, 0, 1, 4 ];

  describe('Stator#constructor', () => {
    it('throws an error if label is empty', () => {
      expect(() => new Stator('', 1, [ 1 ])).to.throw();
    });

    it('throws an error if numChars is invalid', () => {
      expect(() => new Stator('T', 0, [1, 2, 3])).to.throw();
    });

    it('throws an error if map is invalid', () => {
      expect(() => new Stator('T', 10, null as unknown as number[])).to.throw();
      
      // throw because not the same length as numChars
      expect(() => new Stator('T', 3, [1, 2])).to.throw();
    });
  });

  describe('Stator#encode()', () => {
    it('encodes a character properly', () => {
      const stator = new Stator('Test', numChars, map);
      expect(stator.encode(1)).to.equal(map[1]);
    });

    it('protects against out-of-range indices by wrapping', () => {
      const stator = new Stator('Test', numChars, map);
      expect(stator.encode(numChars)).to.equal(map[0]);
      expect(stator.encode(-5)).to.equal(map[numChars - 5]);
    });
  });

  describe('Stator#validate()', () => {
    it('returns empty for no errors', () => {
      const stator = new Stator('Test', numChars, map);
      expect(stator.validate()).to.be.empty;
    });

    it('returns an array of errors for any duplicate mappings', () => {
      const stator = new Stator('Test', 3, [1, 2, 1]);
      expect(stator.validate()).to.be.an('Array').with.lengthOf(1);
    });
  });

  describe('Stator functionality', () => {
    it('encodes single character correctly (Model D example)', () => {
      const etw = Stator.fromModel(ModelD);

      const ltr = getCharacterIndex('T');
      const enc = etw.encode(ltr);
      const encChar = getCharacterFromIndex(enc);
      expect(encChar, 'etw encode').to.equal('E');
    });
  });
});