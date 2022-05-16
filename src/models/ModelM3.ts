/**
 * Enigma
 * =============================================================================
 * Copyright © 2022 Chris Pikul.
 * Licensed under GNU General Public License version 3.
 * See file `LICENSE` at project root for more information
 * =============================================================================
 * 
 * Provides the settings, features, and available components for an Enigma
 * model.
 * 
 * In this file is the listings for the Model M3 which was designed and adopted
 * by the German Navy, Kriegsmarine.
 */

/* eslint-disable id-length */
import type Model from './interfaces';
import { AlphabetABC } from '../alphabet';

/**
 * The Model M3 was designed and adopted by the German Navy, or Kriegsmarine.
 * In general the navy used a few variations known as M1, M2, and M3. The
 * differences between them is very slight and so the standard of refering to
 * them as "M3" is common place.
 * 
 * A lot of the wheels and reflectors are copies from the Model I, and therefore
 * this model is compatible with messages sent from the Model I.
 */
export const ModelM3:Model = {
  label: 'M3',

  alphabet: AlphabetABC,

  wheels: {
    I: {
      wiring: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
      notches: [ 'Y' ],
    },
    II: {
      wiring: 'AJDKSIRUXBLHWTMCQGZNPYFVOE',
      notches: [ 'M' ],
    },
    III: {
      wiring: 'BDFHJLCPRTXVZNYEIWGAKMUSQO',
      notches: [ 'D' ],
    },
    IV: {
      wiring: 'ESOVPZJAYQUIRHXLNFTGKDCMWB',
      notches: [ 'R' ],
    },
    V: {
      wiring: 'VZBRGITYUPSDNHLXAWMJQOFECK',
      notches: [ 'H' ],
    },
    VI: {
      wiring: 'JPGVOUMFYQBENHZRDKASXLICTW',
      notches: [ 'H', 'U' ],
    },
    VII: {
      wiring: 'NZJHGRCXMYSWBOUFAIVLPEKQDT',
      notches: [ 'H', 'U' ],
    },
    VIII: {
      wiring: 'FKQHTLXOCBJSPDZRAMEWNIUYGV',
      notches: [ 'H', 'U' ],
    },
  },

  reflectors: [
    {
      label: 'UKW-B',
      wiring: 'YRUHQSLDPXNGOKMIEBFZCWVJAT',
    },
    {
      label: 'UKW-C',
      wiring: 'FVPJIAOYEDRZXWGCTKUQSBNMHL',
    },
  ],

  plugboard: true,
};
export default ModelM3;
