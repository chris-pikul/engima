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
  return alpha.charAt(index);
}

/**
 * Calculates the wiring needed for a given alphabet string. This is the
 * permutation result of applying the given "alpha" against the known ABC in
 * order to generate correct indices.
 * 
 * This means, given a character on the `parent` alphabet is entered, the indice
 * of this character is applied to the `alpha` alphabet and returned as a new
 * "translation".
 * 
 * `parent` = A B C D E F G H I J
 * `alpha`  = G I A J B E H C F D
 * results  = 6 8 0 9 1 4 7 2 5 3
 * 
 * A mechanism using this wire would take input "C", map that against the
 * `parent` alphabet resulting in indice "2". Applying indice 2 against the
 * results givens the value "0". Applied back against the `parent` alphabet this
 * becomes "A". Thus meaning, there is a parity between C becoming A.
 * 
 * @param alpha Alphabet to map for wiring
 * @param unknownAs Fallback character for any missing characters
 * @returns Array of 0-based indices
 */
export function getWiring(alpha:string, parent = AlphabetABC, unknownAs = 'X'):Array<number> {
  const parentArr = parent.substring(0, alpha.length).split('');
  
  const unknownInd = parent.indexOf(unknownAs);
  if(unknownInd === -1)
    throw new Error(`could not find fallback character "${unknownAs}" in alphabet "${parent}"`);
  
  // Loop through parent array
  return parentArr
    .map((_, ind:number) => {
      // Find the character at this index on the supplied alphabet
      const mapsTo = alpha.charAt(ind);

      // Get the new index as it applies to the parent alphabet for return
      const result = parentArr.indexOf(mapsTo);
      
      if(result === -1)
        return unknownInd;
      return result;
    });
}

/**
 * Converts a wiring array into a single string representing it as an alphabet.
 * This is the reverse of the `getWiring()` method. Since the `getWiring()`
 * function applies a given alphabet against a constant parent alphabet
 * returning the translated indice; this function does the reverse and generates
 * the alphabet by taking incoming indices and applying against a known alphabet
 * in reverse.
 * 
 * `input`  = 6 8 0 9 1 4 7 2 5 3
 * `parent` = A B C D E F G H I J
 * results  = G I A J B E H C F D
 * 
 * This is simply takes the indices and builds a unified string.
 * 
 * @param input Input wiring array of 0-based indices
 * @param alpha Alphabet to apply the wiring onto (ABC is default)
 * @returns String of the alphabet joined
 */
export function wiringToAlphabet(input:Array<number>, alpha:string = AlphabetABC):string {
  return input.map(ind => alpha.charAt(ind))
    .join('');
}
