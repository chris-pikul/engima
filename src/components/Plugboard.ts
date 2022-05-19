/**
 * Enigma
 * =============================================================================
 * Copyright © 2022 Chris Pikul.
 * Licensed under GNU General Public License version 3.
 * See file `LICENSE` at project root for more information
 * =============================================================================
 * 
 * Class representing the Plugboard, or Steckerbrett. The Plugboard allows for
 * additional substitution by re-routing certain characters to another. The
 * substitution is performed on initial key-press as well as after encoding from
 * the wheels.
 */

import type IEncodable from '../interfaces/IEncodable';
import type IValidatable from '../interfaces/IValidatable';

import { circular, findTupleDuplicates } from '../common';

/**
 * Simple type for a tuple representing a single plug wire connection.
 * 
 * This maps as `[input, output]` with each value being the numerical 0-based
 * index of the character as it is on the plugboard.
 */
export type PlugWire = [number, number];

/**
 * The Plugboard, or Steckerbrett is the component that adds additional
 * substitution encoding during the operation of the Enigma machine.
 * 
 * When a key is pressed, the signal is sent through the Plugboard first, in
 * which it may, or may not (depending on how it is configured), re-route keys
 * to a different character. This is determined by the plug wires that are
 * inserted into the plugboard connecting one character to another. This
 * substitution works both ways. For instance, if a plug is inserted connecting
 * A to Z, then on pressing A, the output is Z. Inversly, when pressing Z, the
 * output is A. Most procedures used up to 10 plugs connected.
 * 
 * After the first pass with the plugboard, the new character is sent to the
 * rotor wheel assembly for encoding. After which, the character is passed back
 * through the plugboard for an additional encoding step before finally being
 * output.
 * 
 * @todo Implement the Uhr
 */
export class Plugboard implements IEncodable, IValidatable {
  /**
   * A given label for this plugboard model
   */
  readonly label:string;

  /**
   * How many characters are present on this board
   */
  readonly numCharacters:number;

  /**
   * The plugs as they are inserted into the plugboard.
   * 
   * Each tuple maps to `[input, output]`,
   * where input is treated as the input character index, which should map to
   * the output character index.
   * 
   * Each entry in this array should be a unique tuple with no duplicate values
   * anywhere within the children (within the scope of the whole plugs array).
   * 
   * Example:
   * ```
   * plugs = [ [0,2], [1, 3], [4, 5] ]; // OK
   * plugs = [ [0,2], [1, 2], [4, 5] ]; // BAD, 2 is duplicated
   * ```
   */
  plugs:Array<PlugWire> = [];

  /**
   * Creates a Plugboard.
   * 
   * @param label Displayable string used to identify this Plugboard
   * @param numChars Number of characters this Plugboard supports. Each
   * component of the final Enigma machine must have matching character values.
   * @param plugs Array of number tuples that maps to the currently configured
   * plugs inserted into the Plugboard. Each tuple maps to `[input, output]`,
   * where input is treated as the input character index, which should map to
   * the output character index. None of the values within the array including
   * the values of the sub-array tuples may duplicate.
   * 
   * @throws TypeError if `label` is an empty string
   * @throws TypeError if `numChars` is 0 or below
   */
  constructor(label:string, numChars:number, plugs?:Array<PlugWire>) {
    // Bind methods
    this.reset = this.reset.bind(this);
    this.encode = this.encode.bind(this);
    this.validate = this.validate.bind(this);
    this.addPlug = this.addPlug.bind(this);

    // Apply the readonly properties
    if(label.length < 1)
      throw new Error(`Plugboard constructed with parameter 1 "label" being empty.`);
    this.label = label;

    if(numChars <= 0)
      throw new TypeError(`Plugboard constructed with parameter 2 "numChars" being less than or equal to 0.`);
    this.numCharacters = numChars;

    // Number of plugs is optional, more validation later in validate()
    this.plugs = plugs ?? [];
  }

  /**
   * Resets any settings applied to the plugboard
   */
  public reset():void {
    this.plugs = [];
  }

  /**
   * Performs the encoding of a given index into another.
   * 
   * The plugboard will check the current {@link Plugboard.plugs} array for a
   * matching {@link PlugWire} tuple with an entry in either position matching
   * the parameter `index`. If a match is made, the opposite value in the tuple
   * is returned. If no matches are found, then the input index is passed
   * through un-changed.
   * 
   * Example:
   * ```
   * Plugboard.plugs = [ [0, 2], [1, 3], [4, 5] ];
   * encode(6); // Output 6 because no matching plugs.
   * encode(3); // Output 1 because plugs[1] had a match, and returned opposite
   * ```
   * 
   * @implements IEncodable
   * @param index Input character index
   * @returns New character index
   */
  public encode(index:number):number {
    // Sanity check the input
    const inp = circular(index, this.numCharacters);

    // Check if we have a matching plug
    const plug = this.plugs.find(plg => (plg[0] === inp || plg[1] === inp));
    if(plug) {
      // Return the opposite value then the one that matched
      return plug[0] === inp ? plug[1] : plug[0];
    }
    
    // No matching plug, pass through unaltered
    return index;
  }

  /**
   * Checks that this Plugboard's settings are valid.
   * 
   * First, each plug in {@link Plugboard.plugs} is checked to ensure that each
   * value is within the range of 0..{@link Plugboard.numCharacters}.
   * 
   * After which, each plug is checked to ensure no value within any of the
   * tuples duplicates.
   * 
   * @returns Array of Error objects (empty if no errors)
   */
  public validate():Array<Error> {
    const errs:Array<Error> = [];

    // Check for out-of-range plug values
    for(let ind = 0; ind < this.plugs.length; ind++) {
      const [ from, to ] = this.plugs[ind];
      if(from < 0 || from >= this.numCharacters || to < 0 || to >= this.numCharacters)
        errs.push(new Error(`Plugboard.plug[${ind}] has a value out of range for this plugboard`));

      if(from === to)
        errs.push(new Error(`Plugboard.plug[${ind}] has the same values for both points`));
    }

    // Find any duplicate entries ANYWHERE in the entire scope of the plugs
    const dupErrs:Array<Error> = findTupleDuplicates<number>(this.plugs)
      .map(([ ind, val ]) => new Error(`Plugboard.plug[${ind}] has a duplicate value '${val}'`));
    errs.push(...dupErrs);
    
    return errs;
  }

  /**
   * Attempts to add a plug connection to the plugboard connecting two
   * characters based on their index.
   * 
   * @param fromIndex Character index
   * @param toIndex Character index
   * @returns Error if something conflicts
   */
  public addPlug(fromIndex:number, toIndex:number):(undefined | Error) {
    // Validate indices
    if(fromIndex < 0 || fromIndex >= this.numCharacters)
      return new Error(`Plugboard.addPlug received out-of-range "fromIndex" "${fromIndex}".`);

    if(toIndex < 0 || toIndex >= this.numCharacters)
      return new Error(`Plugboard.addPlug received out-of-range "toIndex" "${toIndex}".`);

    if(fromIndex === toIndex)
      return new Error(`Plugboard.addPlug cannot have the same index for both parameters.`);

    const conflict = this.plugs.findIndex(([ from, to ]) => (
      from === fromIndex ||
      from === toIndex ||
      to === fromIndex ||
      to === toIndex
    ));
    if(conflict >= 0)
      return new Error(`Plugboard.addPlug attempting to add a plug that conflicts with plug[${conflict}].`);

    this.plugs.push([ fromIndex, toIndex ]);
  }
}
export default Plugboard;
