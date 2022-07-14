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

    it('encodes an entire message correctly', () => {
      mod.reset();

      const input = 'T';
      const expected = 'ZCLG JFTA YON';

      const result = mod.encodeMessage(input);

      if(mod.debug) {
        console.log(`Debug info for input "${input}"`);
        console.log(JSON.stringify(mod.debug, undefined, 2 ));
      } else throw new Error("No debug information available");

      expect(result).to.equal(expected);
    });
  });
});