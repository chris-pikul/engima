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
 * In this file is the listings for the Model M4 which was designed and adopted
 * by the German Navy, Kriegsmarine.
 */

/* eslint-disable id-length */
import type Model from './interfaces';
import { AlphabetABC } from '../alphabet';

/**
 * The Model M4 was an expansion on the M3 series which was used exclusively by
 * the Kriegsmarine U-Boat division. It features a special UKW and wheel combo
 * allowing the housing to hold 4 wheels (rotors) instead of 3.
 */
export const ModelM4:Model = {
  label: 'M4 (Kriegsmarine U-Boat)',

  alphabet: AlphabetABC,

  wheelCount: 4,
  wheels: [
    {
      label: 'I',
      wiring: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
      notches: [ 'Y' ],
    },
    {
      label: 'II',
      wiring: 'AJDKSIRUXBLHWTMCQGZNPYFVOE',
      notches: [ 'M' ],
    },
    {
      label: 'III',
      wiring: 'BDFHJLCPRTXVZNYEIWGAKMUSQO',
      notches: [ 'D' ],
    },
    {
      label: 'IV',
      wiring: 'ESOVPZJAYQUIRHXLNFTGKDCMWB',
      notches: [ 'R' ],
    },
    {
      label: 'V',
      wiring: 'VZBRGITYUPSDNHLXAWMJQOFECK',
      notches: [ 'H' ],
    },
    {
      label: 'VI',
      wiring: 'JPGVOUMFYQBENHZRDKASXLICTW',
      notches: [ 'H', 'U' ],
    },
    {
      label: 'VII',
      wiring: 'NZJHGRCXMYSWBOUFAIVLPEKQDT',
      notches: [ 'H', 'U' ],
    },
    {
      label: 'VIII',
      wiring: 'FKQHTLXOCBJSPDZRAMEWNIUYGV',
      notches: [ 'H', 'U' ],
    },
    {
      label: 'Beta',
      wiring: 'LEYJVCNIXWPBQMDRTAKZGFUHOS',
      notches: [],
      thin: true,
    },
    {
      label: 'Gamma',
      wiring: 'FSOKANUERHMBTIYCWLQPZXVGJD',
      notches: [],
      thin: true,
    },
  ],

  reflectors: [
    {
      label: 'UKW-B',
      wiring: 'ENKQAUYWJICOPBLMDXZVFTHRGS',
    },
    {
      label: 'UKW-C',
      wiring: 'RDOBJNTKVEHMLFCWZAXGYIPSUQ',
    },
  ],

  plugboard: true,
};
export default ModelM4;
