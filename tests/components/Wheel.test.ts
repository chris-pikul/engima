// test src/components/Wheel
import { expect } from 'chai';
import { AlphabetABC, alphabetToIndices, getCharacterIndex, getWiring, wiringToAlphabet } from '../../src/alphabet';
import Wheel from '../../src/components/Wheel';
import { ModelD } from '../../src/models';

describe('Component - Wheel', () => {
  // Standard setup suite
  const numChar = AlphabetABC.length;
  const disp = AlphabetABC.split('');
  const wire = alphabetToIndices(AlphabetABC);

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
      expect(whl.visibleCharacter, 'visibleCharacter incorrect').to.equal(disp[2]);
    });
  });

  describe('Wheel#encode()', () => {
    const whl = new Wheel('T', numChar, disp, wire);

    it('properly encodes an in-range indice', () => {
      expect(whl.encode(1)).to.equal(wire[1]);
    });

    it('wraps an out-of-range indice', () => {
      expect(whl.encode(numChar)).to.equal(wire[0]);
      // 26 chars + -1 = indice 25 (because 0 based)
      expect(whl.encode(-1)).to.equal(wire[numChar - 1]);
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
      whl.position = numChar - 1;
      whl.advance(2);
      expect(whl.position).to.equal(1);
    });

    it('returns the new position', () => {
      whl.position = 0;
      expect(whl.advance()).to.equal(1).and.to.equal(whl.position);
    });
  });

  describe('Wheel#validate()', () => {
    it('returns empty on valid', () => {
      const whl = new Wheel('T', numChar, disp, wire);
      expect(whl.validate()).to.be.empty;
    });

    it('catches duplicate wirings', () => {
      const tst = wire.slice();
      tst[1] = 0;
      const whl = new Wheel('T', numChar, disp, tst);
      expect(whl.validate()).to.have.lengthOf(1);
    });
  });

  describe('Wheel.visibleCharacter', () => {
    it('shows correctly on default settings', () => {
      const whl = new Wheel('Test', numChar, disp, wire);
      expect(whl.visibleCharacter).to.equal('A');
    })
  });

  describe('functionality test', () => {
    const whl = new Wheel('Test', numChar, disp, wire);

    it('properly encodes the same indice differently after advancing', () => {
      const val1 = whl.encode(0);
      expect(val1, 'first encoding').to.equal(wire[0]);

      whl.advance();
      const val2 = whl.encode(0);
      expect(val2, 'second encoding equality').to.not.equal(val1);
      expect(val2, 'second encoding value').to.equal(wire[1]);
    });

    it('generates wiring correctly', () => {
      const whl = Wheel.fromModel(ModelD, ModelD.wheels[0]);
      const wiring = alphabetToIndices(ModelD.wheels[0].wiring);
      expect(whl.wiring, 'wiring generation mismatch').to.eql(wiring);

      expect(wiringToAlphabet(wiring)).to.equal('LPGSZMHAEOQKVXRFYBUTNICJDW');
    });

    it('works as expected for a known wheel (Model D, wheel I)', () => {
      const whl = Wheel.fromModel(ModelD, ModelD.wheels[0]);
      expect(whl.label).to.equal('I');

      const ltr = getCharacterIndex('E');

      // Checking first wheel which advances first
      whl.advance();
      expect(whl.encode(ltr), wiringToAlphabet(whl.wiring)).to.equal(getCharacterIndex('M'));
    });
  });
});