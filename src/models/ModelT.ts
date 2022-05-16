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
 * In this file is the listings for the Model T (Tirpitz).
 */

/* eslint-disable id-length */
import type Model from './interfaces';
import { AlphabetQWERTZ, AlphabetTirpitz } from '../alphabet';

/**
 * The Model T (Tirpitz) is a special machine based on the Model K. It was given
 * to the Japanese from the Germans as a means of international communication.
 * 
 * This is the only model with a special Stator (ETW) wiring that does not
 * reflect the alphabet or keyboard alignment.
 */
export const ModelT:Model = {
  label: 'T (Tirpitz)',

  alphabet: AlphabetQWERTZ,
  stator: AlphabetTirpitz,

  wheels: {
    I: {
      wiring: 'KPTYUELOCVGRFQDANJMBSWHZXI',
      notches: [
        'E',
        'H',
        'M',
        'S',
        'Y',
      ],
    },
    II: {
      wiring: 'UPHZLWEQMTDJXCAKSOIGVBYFNR',
      notches: [
        'E',
        'H',
        'N',
        'T',
        'Z',
      ],
    },
    III: {
      wiring: 'QUDLYRFEKONVZAXWHMGPJBSICT',
      notches: [
        'E',
        'H',
        'M',
        'S',
        'Y',
      ],
    },
    IV: {
      wiring: 'CIWTBKXNRESPFLYDAGVHQUOJZM',
      notches: [
        'E',
        'H',
        'N',
        'T',
        'Z',
      ],
    },
    V: {
      wiring: 'UAXGISNJBVERDYLFZWTPCKOHMQ',
      notches: [
        'G',
        'K',
        'N',
        'S',
        'Z',
      ],
    },
    VI: {
      wiring: 'XFUZGALVHCNYSEWQTDMRBKPIOJ',
      notches: [
        'F',
        'M',
        'Q',
        'U',
        'Y',
      ],
    },
    VII: {
      wiring: 'BJVFTXPLNAYOZIKWGDQERUCHSM',
      notches: [
        'G',
        'K',
        'N',
        'S',
        'Z',
      ],
    },
    VIII: {
      wiring: 'YMTPNZHWKODAJXELUQVGCBISFR',
      notches: [
        'F',
        'M',
        'Q',
        'U',
        'Y',
      ],
    },
  },

  reflectors: [
    {
      label: 'UKW',
      wiring: 'GEKPBTAUMOCNILJDXZYFHWVQSR',
    },
  ],
};
export default ModelT;
