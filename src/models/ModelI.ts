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
 * In this file is the listings for the Model I which was used by the
 * Wehrmacht and Luftwaffe branches of the German military.
 */

/* eslint-disable id-length */
import type Model from './interfaces';
import { AlphabetABC } from '../alphabet';

/**
 * Standard German Military issue Model I Enigma. Used by the Wehrmacht and the
 * Luftwaffe, it is sometimes referred to as the Services Enigma.
 */
const ModelI:Model = {
  label: 'I (Wehrmacht/Luftwaffe)',

  alphabet: AlphabetABC,

  wheelCount: 3,
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
  ],

  reflectors: [
    {
      label: 'UKW-A',
      wiring: 'EJMZALYXVBWFCRQUONTSPIKHGD',
    },
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
export default ModelI;

/**
 * In 1945 and after some Model I machines leftover from the war where
 * re-purposed by the Norwegian Police Security Service (Overvaakingspolitiet).
 * 
 * The wiring of the wheels and reflector where changed from the original Model
 * I.
 */
export const Norway:Model = {
  label: 'Norway (Model I)',

  alphabet: AlphabetABC,

  wheelCount: 3,
  wheels: [
    {
      label: 'I',
      wiring: 'WTOKASUYVRBXJHQCPZEFMDINLG',
      notches: [ 'Y' ],
    },
    {
      label: 'II',
      wiring: 'GJLPUBSWEMCTQVHXAOFZDRKYNI',
      notches: [ 'M' ],
    },
    {
      label: 'III',
      wiring: 'JWFMHNBPUSDYTIXVZGRQLAOEKC',
      notches: [ 'D' ],
    },
    {
      label: 'IV',
      wiring: 'FGZJMVXEPBWSHQTLIUDYKCNRAO',
      notches: [ 'R' ],
    },
    {
      label: 'V',
      wiring: 'HEJXQOTZBVFDASCILWPGYNMURK',
      notches: [ 'H' ],
    },
  ],

  reflectors: [
    {
      label: 'UKW',
      wiring: 'MOWJYPUXNDSRAIBFVLKZGQCHET',
    },
  ],

  plugboard: true,
};

/**
 * Sonder is a "special" variation on the Model I which appears to be a one-off
 * production, or modified original.
 */
export const Sonder:Model = {
  label: 'Sondermaschine (Model I)',

  alphabet: AlphabetABC,

  wheelCount: 3,
  wheels: [
    {
      label: 'I',
      wiring: 'VEOSIRZUJDQCKGWYPNXAFLTHMB',
      notches: [ 'Y' ],
    },
    {
      label: 'II',
      wiring: 'UEMOATQLSHPKCYFWJZBGVXINDR',
      notches: [ 'M' ],
    },
    {
      label: 'III',
      wiring: 'TZHXMBSIPNURJFDKEQVCWGLAOY',
      notches: [ 'D' ],
    },
  ],

  reflectors: [
    {
      label: 'UKW',
      wiring: 'CIAGSNDRBYTPZFULVHEKOQXWJM',
    },
  ],

  plugboard: true,
};

