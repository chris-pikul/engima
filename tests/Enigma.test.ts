// test src/Enigma.ts
import { expect } from 'chai';
import { getCharacterFromIndex, getCharacterIndex } from '../src/alphabet';
import Enigma from '../src/Enigma';
import * as Models from '../src/models';

describe('Enigma class', () => {
  describe('Model D functional test', () => {
    const mod = new Enigma(Models.ModelD);
    mod.installWheel('I');
    mod.installWheel('II');
    mod.installWheel('III');

    /*
    it('encodes an entire message correctly', () => {
      mod.reset();

      const input = 'TestMessage';
      const expected = 'ZCLG JFTA YON';

      expect(mod.encodeMessage(input)).to.equal(expected);
    });
    */
  });
});