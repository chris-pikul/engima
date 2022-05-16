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
 * In this file is the listings for the rare Model A-133.
 */

/* eslint-disable id-length */
import type Model from './interfaces';
import { Alphabet28 } from '../alphabet';

const ModelA133:Model = {
  label: 'B (A-133)',

  alphabet: Alphabet28,

  wheels: {
    I: {
      wiring: 'PSBGÖXQJDHOÄUCFRTEZVÅINLYMKA',
      notches: [ 'G' ],
    },
    II: {
      wiring: 'CHNSYÖADMOTRZXBÄIGÅEKQUPFLVJ',
      notches: [ 'G' ],
    },
    III: {
      wiring: 'ÅVQIAÄXRJBÖZSPCFYUNTHDOMEKGL',
      notches: [ 'G' ],
    },
  },

  reflectors: [
    {
      label: 'UKW',
      wiring: 'LDGBÄNCPSKJAVFZHXUIÅRMQÖOTEY',
    },
  ],
};
export default ModelA133;
