/**
 * Enigma
 * =============================================================================
 * Copyright © 2022 Chris Pikul.
 * Licensed under GNU General Public License version 3.
 * See file `LICENSE` at project root for more information
 * =============================================================================
 * 
 * Class representing the Stator, or Entrittswalze (ETW). The Stator is
 * responsible for mapping the incoming key presses for initial substitution
 * if desired, and then handing the connection over to the rotor arrangment.
 */

import type IEncodable from '../interfaces/IEncodable';

import { Circular } from '../common';

/**
 * Represents the Stator, Entrittswalze (ETW), or entry wheel, of an Enigma 
 * machine.
 * 
 * The Stator does not move during operation and is a static component of the
 * machine. It's responsibility is to map the incoming keyboard (or Plugboard)
 * connections into the remaining wheels (rotors) and back out again.
 */
export class Stator implements IEncodable {
  /**
   * Displayable label (or name) for this Stator.
   */
  readonly label:string;

  /**
   * The maximum number of characters. For the standard latin alphabet rings
   * this value should be 26. The Funkschlüssel C has 28, and the Model Z has
   * 10.
   */
  readonly numCharacters:number;

  /**
   * Internal mapping of character indices to an output index.
   */
  readonly mapping:Array<number>;

  constructor(label:string, numChars:number, map:Array<number>) {
    // Bind methods
    this.encode = this.encode.bind(this);

    // Setup variables
    this.label = label;
    this.numCharacters = numChars;
    this.mapping = map;
  }

  /**
   * Performs the encoding of a given index into another.
   * 
   * For the Stators this is generally 1-to-1.
   * 
   * @implements IEncodable
   * @param index Input character index
   * @returns New character index
   */
  public encode(index:number):number {
    return this.mapping[ Circular(index, this.numCharacters) ];
  }
}
export default Stator;
