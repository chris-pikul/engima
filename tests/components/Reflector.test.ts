// test src/components/Reflector.ts
import { expect } from 'chai';
import Reflector from '../../src/components/Reflector';

describe('Component - Reflector', () => {
  describe('Reflector#constructor', () => {
    it('throws error on empty label', () => {
      expect(() => new Reflector('', 1, [1])).to.throw();
    });

    it('throws on 0 or below for numChars', () => {
      expect(() => new Reflector('T', 0, [ 1 ])).to.throw();
    });

    it('throws if wiring is not an array', () => {
      expect(() => new Reflector('T', 1, null as unknown as Array<number>)).to.throw;
    });

    it('throws if length of wiring does not match numChars', () => {
      expect(() => new Reflector('T', 2, [ 1 ])).to.throw();
      expect(() => new Reflector('T', 2, [1, 2, 3])).to.throw();
    });

    it('sets initial positions to 0', () => {
      const ref = new Reflector('T', 1, [0]);
      expect(ref.position).to.equal(0);
      expect(ref.startingPosition).to.equal(0);
      expect(ref.isSetup).to.be.false;
    });
  });

  describe('Reflector#setup()', () => {
    it('ensures incoming position is within range', () => {
      const ref = new Reflector('T', 3, [0, 1, 2]);
      
      ref.setup(-1);
      expect(ref.position).to.equal(2);

      ref.setup(4);
      expect(ref.position).to.equal(1);
      expect(ref.startingPosition).to.equal(1);

      expect(ref.isSetup, 'isSetup is not true').to.be.true;
    });
  });

  describe('Reflector#encode()', () => {
    const ref = new Reflector('T', 3, [1, 0, 2]);

    it('properly encodes an in-range indice', () => {
      expect(ref.encode(1)).to.equal(0);
    });

    it('wraps out-of-range values', () => {
      expect(ref.encode(-1)).to.equal(2);
    });

    it('applies the position to the indice', () => {
      ref.setup(1);
      expect(ref.encode(1)).to.equal(2);
    });
  });

  describe('Reflector#advance', () => {
    const ref = new Reflector('T', 3, [1, 0, 2], true);
    ref.setup();

    it('does nothing if the moving flag is not true on construction', () => {
      const ref2 = new Reflector('T', 3, [1, 0, 2]);
      ref2.advance();
      expect(ref2.position).to.equal(0);
    });

    it('moves 1 forward by default', () => {
      ref.advance();
      expect(ref.position).to.equal(1);
    });

    it('allows additional steps and wraps to be within range', () => {
      ref.position = 0;
      ref.advance(3);
      expect(ref.position).to.equal(0);
    });

    it('returns new position', () => {
      ref.position = 0;
      expect(ref.advance(1)).to.equal(1).and.equal(ref.position);
    });
  });

  describe('Reflector#validate', () => {
    it('returns empty when no errors', () => {
      const ref = new Reflector('T', 3, [1, 0, 2]);
      expect(ref.validate()).to.be.empty;
    });

    it('catches duplicate wirings', () => {
      const ref = new Reflector('T', 3, [1, 0, 1]);
      expect(ref.validate()).to.have.lengthOf(1);
    });
  });
});