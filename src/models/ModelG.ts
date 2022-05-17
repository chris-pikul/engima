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
 * In this file is the listings for the Model G family and its predecessor the
 * Zählwerk model A28.
 */

/* eslint-disable id-length */
import type Model from './interfaces';
import { AlphabetQWERTZ } from '../alphabet';

/**
 * Model A-28 or "Zählwerk" enigma was a commercial machine nearly identical
 * to the Model D with the exception that it featured a cog-driven mechanism for
 * rotating the wheels instead of the earlier standard of lever-driven
 * mechanism.
 */
export const ModelA28:Model = {
  label: 'Zählwerk A-28',

  alphabet: AlphabetQWERTZ,

  wheels: [
    {
      label: 'I',
      wiring: 'LPGSZMHAEOQKVXRFYBUTNICJDW',
      notches: [
        'A',
        'C',
        'D',
        'E',
        'H',
        'I',
        'J',
        'K',
        'M',
        'N',
        'O',
        'Q',
        'S',
        'T',
        'W',
        'X',
        'Y',
      ],
    },
    {
      label: 'II',
      wiring: 'SLVGBTFXJQOHEWIRZYAMKPCNDU',
      notches: [
        'A',
        'B',
        'D',
        'G',
        'H',
        'I',
        'K',
        'L',
        'N',
        'O',
        'P',
        'S',
        'U',
        'V',
        'Y',
      ],
    },
    {
      label: 'III',
      wiring: 'CJGDPSHKTURAWZXFMYNQOBVLIE',
      notches: [
        'C',
        'E',
        'F',
        'I',
        'M',
        'N',
        'P',
        'S',
        'U',
        'V',
        'Z',
      ],
    },
  ],

  reflectors: [
    {
      label: 'UKW',
      wiring: 'IMETCGFRAYSQBZXWLHKDVUPOJN',
    },
  ],

  cogDrive: true,
};

/**
 * The G-312 was issued to the German intellegence services (Abwehr). It is
 * based on the A-28 Zählwerk model. The Wheels and Reflectors where re-wired
 * in this model, but the notches and cog-wheel drive remain the same.
 */
export const ModelG312:Model = {
  label: 'G-312 (G31 Abwehr)',

  alphabet: AlphabetQWERTZ,

  wheels: [
    {
      label: 'I',
      wiring: 'DMTWSILRUYQNKFEJCAZBPGXOHV',
      notches: [
        'A',
        'C',
        'D',
        'E',
        'H',
        'I',
        'J',
        'K',
        'M',
        'N',
        'O',
        'Q',
        'S',
        'T',
        'W',
        'X',
        'Y',
      ],
    },
    {
      label: 'II',
      wiring: 'HQZGPJTMOBLNCIFDYAWVEUSRKX',
      notches: [
        'A',
        'B',
        'D',
        'G',
        'H',
        'I',
        'K',
        'L',
        'N',
        'O',
        'P',
        'S',
        'U',
        'V',
        'Y',
      ],
    },
    {
      label: 'III',
      wiring: 'UQNTLSZFMREHDPXKIBVYGJCWOA',
      notches: [
        'C',
        'E',
        'F',
        'I',
        'M',
        'N',
        'P',
        'S',
        'U',
        'V',
        'Z',
      ],
    },
  ],

  reflectors: [
    {
      label: 'UKW',
      wiring: 'RULQMZJSYGOCETKWDAHNBXPVIF',
    },
  ],

  cogDrive: true,
};

/**
 * This special model was captured from a German spy "Johann Siegfried Becker"
 * in Argentina in 1945. Nearly identical to the G312 and other G-series
 * machines.
 */
export const ModelG260:Model = {
  label: 'G-260 (G31 Abwehr)',

  alphabet: AlphabetQWERTZ,

  wheels: [
    {
      label: 'I',
      wiring: 'RCSPBLKQAUMHWYTIFZVGOJNEXD',
      notches: [
        'A',
        'C',
        'D',
        'E',
        'H',
        'I',
        'J',
        'K',
        'M',
        'N',
        'O',
        'Q',
        'S',
        'T',
        'W',
        'X',
        'Y',
      ],
    },
    {
      label: 'II',
      wiring: 'WCMIBVPJXAROSGNDLZKEYHUFQT',
      notches: [
        'A',
        'B',
        'D',
        'G',
        'H',
        'I',
        'K',
        'L',
        'N',
        'O',
        'P',
        'S',
        'U',
        'V',
        'Y',
      ],
    },
    {
      label: 'III',
      wiring: 'FVDHZELSQMAXOKYIWPGCBUJTNR',
      notches: [
        'C',
        'E',
        'F',
        'I',
        'M',
        'N',
        'P',
        'S',
        'U',
        'V',
        'Z',
      ],
    },
  ],

  reflectors: [
    {
      label: 'UKW',
      wiring: 'IMETCGFRAYSQBZXWLHKDVUPOJN',
    },
  ],

  cogDrive: true,
};

/**
 * The Model G-111 was issued to the Hungarian Army and featured 5 wheels. Note
 * that only wheels I, II, and V have been recovered.
 */
export const ModelG111:Model = {
  label: 'G-111 (G32 Hungarian)',

  alphabet: AlphabetQWERTZ,

  wheels: [
    {
      label: 'I',
      wiring: 'WLRHBQUNDKJCZSEXOTMAGYFPVI',
      notches: [
        'A',
        'C',
        'D',
        'E',
        'H',
        'I',
        'J',
        'K',
        'M',
        'N',
        'O',
        'Q',
        'S',
        'T',
        'W',
        'X',
        'Y',
      ],
    },
    {
      label: 'II',
      wiring: 'TFJQAZWMHLCUIXRDYGOEVBNSKP',
      notches: [
        'A',
        'B',
        'D',
        'G',
        'H',
        'I',
        'K',
        'L',
        'N',
        'O',
        'P',
        'S',
        'U',
        'V',
        'Y',
      ],
    },
    {
      label: 'III',
      wiring: 'QTPIXWVDFRMUSLJOHCANEZKYBG',
      notches: [
        'A',
        'E',
        'H',
        'N',
        'P',
        'U',
        'Y',
      ],
    },
  ],

  reflectors: [
    {
      label: 'UKW',
      wiring: 'IMETCGFRAYSQBZXWLHKDVUPOJN',
    },
  ],

  cogDrive: true,
};
