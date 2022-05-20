/**
 * Enigma
 * =============================================================================
 * Copyright © 2022 Chris Pikul.
 * Licensed under GNU General Public License version 3.
 * See file `LICENSE` at project root for more information
 * =============================================================================
 * 
 * Provides common alphabet maps used by the Enigma machines for keyboard and
 * wheel display.
 */

/**
 * 28-character alphabet used by the Enigma B Model A-113
 */
export const Alphabet28 = 'ABCDEFGHIJKLMNOPQRSTUVXYZÅÄÖ';

/**
 * 26-character alphabet used by the Enigma D, G, and K families. 
 */
export const AlphabetQWERTZ = 'QWERTZUIOASDFGHJKPYXCVBNML';

/**
 * 26-character alphabet used by the Enigma I, M3, and M4 families. 
 */
export const AlphabetABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * 26-character alphabet used by the special Enigma T (Tirpitz).
 */
export const AlphabetTirpitz = 'KZROUQHYAIGBLWVSTDXFPNMCJE';

/**
 * 10-character numerical alphabet used by the Enigma Z models.
 */
export const AlphabetZ = '1234567890';

/**
 * Safer method for getting the index of an input character within a supplied
 * alphabet.
 * 
 * Performs normalization of the input `char` character.
 * 
 * Additionally supports fallback character if the input character does not
 * match the available alphabet.
 * 
 * @param char Input character to find
 * @param alpha Alphabet constant to use
 * @param unknownAs Fallback character if the input is not available
 * @returns Numerical index (0-based) of where in the alphabet the character is
 * 
 * @throws Error if neither the input, or substitute `unknownAs` characters can
 * be resolved within the alphabet
 */
export function getCharacterIndex(char:string, alpha = AlphabetABC, unknownAs = 'X'):number {
  // Clean and normalize the input character
  const ltr = char
    .toUpperCase()
    .trim()
    .substring(0, 1);

  // Check if it's registered
  const ind = alpha.indexOf(ltr);
  
  // If it's not present, substitute for the unknownAs character
  if(ind === -1) {
    const sub = alpha.indexOf(unknownAs);

    // If it's STILL not there, then throw an error
    if(sub === -1)
      throw new Error(`getCharacterIndex() failed to find the character "${char}", nor the substitute "${unknownAs}" in the alphabet "${alpha}".`);

    return sub;
  }

  return ind;
}

/**
 * Safer method to get the character of an alphabet based on the input index.
 * 
 * Uses a fallback character if the index is out of range for the alphabet.
 * 
 * @param index Input character index
 * @param alpha Alphabet to use
 * @param unknownAs Fallback character if the input index is out of range
 * @returns Single-character string
 */
export function getCharacterFromIndex(index:number, alpha = AlphabetABC, unknownAs = 'X'):string {
  if(index < 0 || index >= alpha.length)
    return unknownAs;
  return alpha[index];
}

/**
 * Calculates the wiring needed for a given alphabet string. This is the
 * permutation result of applying the given "alpha" against the known ABC in
 * order to generate correct indices.
 * 
 * @param alpha Alphabet to map for wiring
 * @param unknownAs Fallback character for any missing characters
 * @returns Array of 0-based indices
 */
export function getWiring(alpha:string, unknownAs = 'X'):Array<number> {
  return AlphabetABC.substring(0, alpha.length)
    .split('')
    .map(char => {
      const ind = alpha.indexOf(char);
      return ind === -1 ? AlphabetABC.indexOf(unknownAs) : ind;
    });
}

/**
 * Converts a wiring array into a single string representing it as an alphabet.
 * 
 * @param input Input wiring array of 0-based indices
 * @param alpha Alphabet to apply the wiring onto (ABC is default)
 * @returns String of the alphabet joined
 */
export function wiringToAlphabet(input:Array<number>, alpha:string = AlphabetABC):string {
  return input.map(ind => getCharacterFromIndex(ind, alpha)).join('');
}
