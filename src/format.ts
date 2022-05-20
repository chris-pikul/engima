/**
 * Enigma
 * =============================================================================
 * Copyright © 2022 Chris Pikul.
 * Licensed under GNU General Public License version 3.
 * See file `LICENSE` at project root for more information
 * =============================================================================
 * 
 * Utility functions for formatting messages into a standard policy generally
 * used for Enigma machines.
 * 
 * @todo Some models encode in blocks of 4, some in blocks of 5.
 */

/**
 * Array of tuples matching `[input, output]` for string substitution during
 * formatting.
 */
export type FormatSubstitutions = Array<[string, string]>;

/**
 * Standard formatting substitutions used by the Germans.
 * 
 * In reality, these may have changed between years or military services, so
 * these choices should be taken as a generality.
 */
export const FormattingStandard:FormatSubstitutions = [
  [ ' ', 'X' ],
  [ '\t', 'X' ],
  [ '\n', '' ],
  [ ':', 'XX' ],
  [ ',', 'Y' ],
  [ '-', 'YY' ],
  [ '/', 'YY' ],
  [ '(', 'KK' ],
  [ ')', 'KK' ],
  [ '[', 'KK' ],
  [ ']', 'KK' ],
  [ '\'', 'J' ],
  [ '"', 'J' ],
  [ '?', 'UD' ],
];

/**
 * Performs initial formatting before encoding of a message.
 * 
 * The input message is intended to be human-readable natural language.
 * 
 * @param input Input message
 * @param subs Formatting substitutions to use
 * @returns Formatted string message
 */
export function preFormatEncoding(input:string, subs:FormatSubstitutions = FormattingStandard):string {
  // Normalize the input message
  let msg = input.toUpperCase().trim();

  // Perform substitutions
  msg = msg.split('')
    .map(char => {
      const sub = subs.find(item => item[0] === char);
      if(sub)
        return sub[1];
      return char;
    })
    .join('');

  return msg;
}

/**
 * Performs formatting of an encoded message. The input here is the message as
 * encoded by the Enigma and should be the cryptic version.
 * 
 * Messages encoded by the enigma where broken down into blocks of 4 characters
 * separated by a space.
 * 
 * @todo Ensure it ends as a block of 4 by inserting random characters in the
 * alphabet
 * 
 * @param input Input cipher message
 * @returns 4-character blocked out message
 */
export function postFormatEncoding(input:string):string {
  let msg = '';
  
  // Work 4 characters at a time
  for(let ind = 0; ind < input.length; ind += 4)
    msg += `${input.substring(ind, ind + 4)} `;

  return msg;
}

/**
 * Removes spacing from 4-block encoded cypher messages before being passed
 * through for decoding.
 * 
 * @param input 4-block encoded cipher text
 * @returns String message
 */
export function preFormatDecoding(input:string):string {
  return input.replace(/\s/g, '');
}

/**
 * Removes any substitutions that may have been applied by performing the
 * reverse operation that was performed before on {@link preFormatEncoding}.
 * 
 * Note: This can be a lossy conversion. Because the substitution characters
 * where chosen originally because they where less frequent in German, some
 * characters may be legitimate in the original language. For instance:
 * white-space characters are replaced by the letter X in standard formatting.
 * If X is legitimate in a word say "example", this function will dumbly replace
 * that x as well resulting in "e ample" as an output.
 * 
 * @param input Input cipher text
 * @param subs Formatting substitution
 * @returns 
 */
export function postFormatDecoding(input:string, subs:FormatSubstitutions = FormattingStandard):string {
  let msg:string = input;

  /*
   * 1) Make a copy of the substitution array
   * 2) Sort the subs so that the longer subs are first
   * 3) Apply the substitutions in reverse on the msg string
   */
  ([ ...subs ])
    .sort((subA, subB) => (subB[1].length - subA[1].length))
    .forEach(([ orig, sub ]) => {
      msg = msg.replaceAll(sub, orig);
    });

  return msg;
}
