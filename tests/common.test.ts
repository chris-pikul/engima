// test src/common.ts
import { expect } from 'chai';

import {
  circular,
  findDuplicates,
  findTupleDuplicates,
  findOutOfRanges,
} from '../src/common';

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

  describe('findTupleDuplicates()', () => {
    it('returns empty array on no-duplicates', () => {
      const arr = [[1, 2], [3, 4], [5, 6]];
      expect(findTupleDuplicates<number>(arr)).to.eql([]);
    });

    it('only returns duplicate entires once', () => {
      const arr = [[1, 2], [3, 1], [2, 6]];
      expect(findTupleDuplicates<number>(arr)).to.eql([
        [1, 1, 1],
        [2, 2, 0],
      ]);
    });
  });

  describe('findOutOfRanges()', () => {
    it('returns empty on no conflicts', () => {
      const arr = [0, 1, 2, 3];
      expect(findOutOfRanges(arr, 4)).to.be.empty;
    });

    it('returns conflicts when found', () => {
      const arr = [0, 1, 2, 3];
      expect(findOutOfRanges(arr, 3)).to.have.lengthOf(1).and.eql([ [3, 3] ]);
    });
  });
});
