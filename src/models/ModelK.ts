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
 * In this file is the listings for the Model K family of machines.
 */

/* eslint-disable id-length */
import type Model from './interfaces';
import { AlphabetQWERTZ } from '../alphabet';

/**
 * The standard Model K family is directly based on the Model D family and is a
 * commercial machine.
 */
export const ModelK:Model = {
  label: 'K (Commercial A27)',

  alphabet: AlphabetQWERTZ,

  wheels: [
    {
      label: 'I',
      wiring: 'LPGSZMHAEOQKVXRFYBUTNICJDW',
      notches: [ 'G' ],
    },
    {
      label: 'II',
      wiring: 'SLVGBTFXJQOHEWIRZYAMKPCNDU',
      notches: [ 'M' ],
    },
    {
      label: 'III',
      wiring: 'CJGDPSHKTURAWZXFMYNQOBVLIE',
      notches: [ 'V' ],
    },
  ],

  reflectors: [
    {
      label: 'UKW',
      wiring: 'IMETCGFRAYSQBZXWLHKDVUPOJN',
    },
  ],
};

/**
 * Swiss varient of the Model K (generally same as Model D). Used by the Swiss
 * Army, Air Force, and Ministry deparments. Only the Air Force model was found.
 */
export const ModelKSwiss:Model = {
  label: 'Swiss-K',

  alphabet: AlphabetQWERTZ,

  wheels: [
    {
      label: 'I',
      wiring: 'PEZUOHXSCVFMTBGLRINQJWAYDK',
      notches: [ 'G' ],
    },
    {
      label: 'II',
      wiring: 'ZOUESYDKFWPCIQXHMVBLGNJRAT',
      notches: [ 'M' ],
    },
    {
      label: 'III',
      wiring: 'EHRVXGAOBQUSIMZFLYNWKTPDJC',
      notches: [ 'V' ],
    },
  ],

  reflectors: [
    {
      label: 'UKW',
      wiring: 'IMETCGFRAYSQBZXWLHKDVUPOJN',
    },
  ],
};

/**
 * The Model KD is a specific model of Model K that featured a rewirable UKW-D
 * as a reflector. The information for this model was found in the archives of
 * the FRA in Sweden and would have been used by the Mil Amt (German
 * Intelligence after the Abwehr).
 */
export const ModelKD:Model = {
  label: 'KD (Mil Amt)',

  alphabet: AlphabetQWERTZ,

  wheels: [
    {
      label: 'I',
      wiring: 'VEZIOJCXKYDUNTWAPLQGBHSFMR',
      notches: [
        'A',
        'C',
        'G',
        'I',
        'M',
        'P',
        'T',
        'V',
        'Y',
      ],
    },
    {
      label: 'II',
      wiring: 'HGRBSJZETDLVPMQYCXAOKINFUW',
      notches: [
        'A',
        'C',
        'G',
        'I',
        'M',
        'P',
        'T',
        'V',
        'Y',
      ],
    },
    {
      label: 'III',
      wiring: 'NWLHXGRBYOJSAZDVTPKFQMEUIC',
      notches: [
        'A',
        'C',
        'G',
        'I',
        'M',
        'P',
        'T',
        'V',
        'Y',
      ],
    },
  ],

  reflectors: [
    {
      label: 'UKW-D',
      wiring: 'IMETCGFRAYSQBZXWLHKDVUPOJN',
      rewirable: true,
    },
  ],
};

/**
 * This version of the Model K was used by the German Railway service
 * (Reichsbahn).
 * 
 * Bletchley Park mistakenly thought the notch positions of wheels I, and III
 * had been swapped. Physically this was not true. In this data set they are not
 * swapped as previously thought and reflect the same notches as a standard
 * model D/K, therefore the wheels and reflector have been corrected to show the
 * actual model.
 */
export const ModelKRailway:Model = {
  label: 'K (Reichsbahn)',

  alphabet: AlphabetQWERTZ,

  wheels: [
    {
      label: 'I',
      wiring: 'EVLPKUDJHTGSZFRABWYICOXNMQ',
      notches: [ 'G' ],
    },
    {
      label: 'II',
      wiring: 'HXMQKGJTSCZFLBERNAWYIDOVPU',
      notches: [ 'M' ],
    },
    {
      label: 'III',
      wiring: 'JHDBSKYPZNMVXURECLIGQOAWTF',
      notches: [ 'V' ],
    },
  ],

  reflectors: [
    {
      label: 'UKW',
      wiring: 'MRZIPHOFDWQVAUGEKBYXNLJTSC',
    },
  ],
};
