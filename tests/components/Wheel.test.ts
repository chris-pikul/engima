// test src/components/Wheel
import { expect } from 'chai';
import Wheel from '../../src/components/Wheel';

describe('Component - Wheel', () => {
  // Standard setup suite
  const numChar = 5;
  const disp = ['A','B','C','D','E'];
  const wire = [4, 2, 0, 3, 1];

  describe('Wheel#constructor', () => {
    it('throws on empty label', () => {
      expect(() => new Wheel('', 1)).to.throw();
    });

    it('throws on 0 or negative "numChars"', () => {
      expect(() => new Wheel('T', -1)).to.throw();
    });

    it('throws on invalid "display" array (or not the same length as numChar)', () => {
      expect(() => new Wheel('T', 3, null as unknown as string[])).to.throw();
      expect(() => new Wheel('T', 3, [ 'A' ])).to.throw();
    });

    it('throws on invalid "wiring" array (or not the same length as numChar)', () => {
      expect(() => new Wheel('T', 3, ['A', 'B', 'C'], null as unknown as number[])).to.throw();
      expect(() => new Wheel('T', 3, ['A', 'B', 'C'], [1, 2])).to.throw();
    });
  });

  describe('Wheel#setup()', () => {
    it('applies the values while keeping them within acceptable range', () => {
      const whl = new Wheel('T', numChar, disp, wire);
      expect(whl.isSetup, 'pre-setup "isSetup" incorrect').to.be.false;
      whl.setup(1, 2);

      expect(whl.ringSetting, 'ringSetting incorrect').to.equal(1);
      expect(whl.startingPosition, 'startingPosition incorrect').to.equal(2);
      expect(whl.position, 'position (current) incorrect').to.equal(whl.startingPosition);
      expect(whl.isSetup, 'isSetup incorrect').to.be.true;
      
      // Check visibleCharacter while we are here.
      // This is position+1 on the disp variable
      expect(whl.visibleCharacter, 'visibleCharacter incorrect').to.equal(disp[3]);
    });
  });

  describe('Wheel#encode()', () => {
    const whl = new Wheel('T', numChar, disp, wire);

    it('properly encodes an in-range indice', () => {
      expect(whl.encode(1)).to.equal(wire[1]);
    });

    it('wraps an out-of-range indice', () => {
      expect(whl.encode(10)).to.equal(wire[0]);
      // 5 chars + -1 = indice 4 (because 0 based)
      expect(whl.encode(-1)).to.equal(wire[4]);
    });
  });

  describe('Wheel#advance()', () => {
    const whl = new Wheel('T', numChar, disp, wire);

    it('advances the position by 1 on default', () => {
      whl.position = 0;
      whl.advance();
      expect(whl.position).to.equal(1);
    });

    it('allows for advancing more than 1 step', () => {
      whl.position = 0;
      whl.advance(3);
      expect(whl.position).to.equal(3);
    });

    it('properly wraps values to within acceptable range', () => {
      whl.position = 4;
      whl.advance(2);
      expect(whl.position).to.equal(1);
    });
  });

  describe('functionality test', () => {
    const whl = new Wheel('Test', numChar, disp, wire);

    it('properly encodes the same indice differently after advancing', () => {
      whl.setup(1, 2);
      const val1 = whl.encode(0);
      expect(val1, 'first encoding').to.equal(wire[3]);

      whl.advance();
      const val2 = whl.encode(0);
      expect(val2, 'second encoding equality').to.not.equal(val1);
      expect(val2, 'second encoding value').to.equal(wire[4]);
    });
  });
});