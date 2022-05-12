// test src/components/Stator.ts
import { expect } from 'chai';
import Stator from '../../src/components/Stator';

describe('Component - Stator', () => {
  const numChars = 10;
  const map = [ 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ];

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
      expect(stator.encode(0)).to.equal(9);
    });

    it('any encoding is reversable', () => {
      const stator = new Stator('Test', numChars, map);
      expect(stator.encode(1), 'forward encoding').to.equal(8);
      expect(stator.encode(8), 'reverse encoding').to.equal(1);
    });

    it('protects against out-of-range indices by wrapping', () => {
      const stator = new Stator('Test', numChars, map);
      expect(stator.encode(numChars)).to.equal(map[0]);
      expect(stator.encode(-5)).to.equal(map[numChars - 5]);
    });
  });

  describe('Stator#validate()', () => {
    it('returns undefined for no errors', () => {
      const stator = new Stator('Test', numChars, map);
      expect(stator.validate()).to.be.undefined;
    });

    it('returns an array of errors for any duplicate mappings', () => {
      const stator = new Stator('Test', 3, [1, 2, 1]);
      expect(stator.validate()).to.be.an('Array').with.lengthOf(1);
    });
  });
});