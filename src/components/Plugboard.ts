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
import type { IValidatable, OptErrors } from '../interfaces/IValidatable';

import { circular, findTupleDuplicates } from '../common';

/**
 * Simple type for a tuple representing a single plug wire connection.
 * 
 * This maps as `[input, output]` with each value being the numerical 0-based
 * index of the character as it is on the plugboard.
 */
export type PlugWire = [number, number];

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
   * Each entry in this array should be a unique tuple with no duplicate values
   * anywhere within the children (within the scope of the whole plugs array).
   */
  readonly plugs:Array<PlugWire>;

  constructor(label:string, numChars:number, plugs?:Array<PlugWire>) {
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

  public validate():OptErrors {
    const errs:Array<Error> = [];

    // Check for out-of-range plug values
    for(let ind = 0; ind < this.plugs.length; ind++) {
      const plg = this.plugs[ind];
      if(plg[0] < 0 || plg[0] >= this.numCharacters || plg[1] < 0 || plg[1] >= this.numCharacters)
        errs.push(new Error(`Plugboard.plug[${ind}] has a value out of range for this plugboard`));
    }

    // Find any duplicate entries ANYWHERE in the entire scope of the plugs
    const dups:Array<[number, number, number]> = findTupleDuplicates<number>(this.plugs);
    if(dups.length) {
      const dupErrs = dups.map(([ ind, val ]) => new Error(`Plugboard.plug[${ind}] has a duplicate value '${val}'`));
      errs.push(...dupErrs);
    }

    // Only return the array if there are errors
    if(errs.length)
      return errs;
  }
}
export default Plugboard;
