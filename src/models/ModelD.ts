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
 * In this file is the listings for the rare Model D.
 */

/* eslint-disable id-length */
import type Model from './interfaces';
import { AlphabetQWERTZ } from '../alphabet';

export const ModelD:Model = {
  label: 'D (Commercial A26)',

  alphabet: AlphabetQWERTZ,

  wheelCount: 3,
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
export default ModelD;
