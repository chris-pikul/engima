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
 * In this file is the listings for the Model Z.
 */

/* eslint-disable id-length */
import type Model from './interfaces';
import { AlphabetZ } from '../alphabet';

/**
 * The Model Z was a very unique enigma in that it only featured a numerical
 * keypad for numbers 0-9.
 * 
 * Note: A Mk.II model was later advertised but not found that featured a
 * cog-wheel drive for the rotors and multiple notches on the wheels. Since no
 * physical models where found, the wiring is unknown.
 */
export const ModelZ:Model = {
  label: 'Z30 (Numerical)',

  alphabet: AlphabetZ,

  wheels: [
    {
      label: 'I',
      wiring: '6418270359',
      notches: [ '2' ],
    },
    {
      label: 'II',
      wiring: '5841097632',
      notches: [ '2' ],
    },
    {
      label: 'III',
      wiring: '3581620794',
      notches: [ '2' ],
    },
  ],

  reflectors: [
    {
      label: 'UKW (Moving)',
      wiring: '5079183642',
      positionable: true,
      rotating: true,
      notches: [ '2' ],
    },
  ],
};
export default ModelZ;
