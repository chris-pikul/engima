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
 * @param alpha Alphabet constant to use
 * @param char Input character to find
 * @param unknownAs Fallback character if the input is not available
 * @returns Numerical index (0-based) of where in the alphabet the character is
 * 
 * @throws Error if neither the input, or substitute `unknownAs` characters can
 * be resolved within the alphabet
 */
export function getCharacterIndex(alpha:string, char:string, unknownAs = 'X'):number {
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
 * @param alpha Alphabet to use
 * @param index Input character index
 * @param unknownAs Fallback character if the input index is out of range
 * @returns Single-character string
 */
export function getCharacterFromIndex(alpha:string, index:number, unknownAs = 'X'):string {
  if(index < 0 || index >= alpha.length)
    return unknownAs;
  return alpha[index];
}

/**
 * Gets the mapping from the `input` alphabet as it applies onto the `alpha`
 * alphabet.
 * 
 * Given a constant `alpha` alphabet, this utility generates the wiring array
 * for a given `input` alphabet.
 * 
 * @param alpha Alphabet to map to
 * @param input Input alphabet to get the wiring from
 * @param unknownAs Fallback character for any missing characters
 * @returns Array of 0-based indices
 */
export function getWiring(alpha:string, input:string, unknownAs = 'X'):Array<number> {
  if(input.length !== alpha.length)
    throw new Error(`getWiring() called with mis-matched alphabet lengths.`);

  return input.split('').map(char => getCharacterIndex(alpha, char, unknownAs));
}
