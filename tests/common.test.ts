import { expect } from 'chai';
import { circular, findDuplicates } from '../src/common';

describe('Common - Utilities', () => {

  describe('circular()', () => {
    it('throws error if "max" is invalid', () => {
      expect(() => circular(1, Number.POSITIVE_INFINITY)).to.throw();
      expect(() => circular(1, Number.NaN)).to.throw();
      expect(() => circular(1, 0)).to.throw();
    });

    it('keeps numbers within range the same', () => {
      expect(circular(5, 10)).to.equal(5);
    });

    it('wraps numbers larger than max back around', () => {
      expect(circular(12, 10)).to.equal(2);
      expect(circular(32, 10)).to.equal(2);
    });

    it('wraps negative numbers into positive values within range', () => {
      expect(circular(-1, 10)).to.equal(9);
      expect(circular(-31, 10)).to.equal(9);
    });
  });

  describe('findDuplicates()', () => {
    it('returns empty array on no-duplicates', () => {
      const arr = [1, 2, 3];
      expect(findDuplicates<number>(arr)).to.eql([]);
    });

    it('only returns duplicate entries once (and from the duplicates index, not originals)', () => {
      const arr = [1, 2, 1, 1, 3];
      expect(findDuplicates<number>(arr)).to.eql([ [2, 1] ]);
    });
  });

});
