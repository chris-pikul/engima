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
import type IValidatable from '../interfaces/IValidatable';

import {
  circular,
  findDuplicates,
  findOutOfRanges,
} from '../common';
import { Model } from '../models';
import { getWiring } from '../alphabet';

/**
 * Represents the Stator, Entrittswalze (ETW), or entry wheel, of an Enigma 
 * machine.
 * 
 * The Stator does not move during operation and is a static component of the
 * machine. It's responsibility is to map the incoming keyboard (or Plugboard)
 * connections into the remaining wheels (rotors) and back out again.
 */
export class Stator implements IEncodable, IValidatable {
  /**
   * Creates a new Stator based on a given data model.
   * 
   * @param model Parent Enigma data model
   * @returns New {@link Stator} object
   */
  public static fromModel(model:Model):Stator {
    const alpha = model.stator ?? model.keyboard ?? model.alphabet;
    return new Stator(
      model.label,
      alpha.length,
      getWiring(alpha, model.alphabet),
    );
  }

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
   * 
   * When the Enigma operates (encoding) it passes a character index (0-based)
   * into each component. The mapping, or wiring, of each component then takes
   * this incoming character index and re-writes it into a new character index.
   * 
   * No values within the mapping/wiring may duplicate. This is very important
   * to ensure proper encoding/decoding.
   * 
   * @todo Refactor rename this to wiring to match the other components
   */
  readonly mapping:Array<number>;

  /**
   * Create new Stator.
   * 
   * @param label Displayable string for this Stator model
   * @param numChars Number of characters this Stator supports. Each component
   * of the final Enigma machine must have matching character values.
   * @param map Array of output indices mapping 1-to-1 for input indices. None
   * of the values in this array may duplicate. See {@link Stator.mapping} for
   * more information.
   * 
   * @throws TypeError if `label` is an empty string
   * @throws TypeError if `numChars` is 0 or below
   * @throws TypeError if `map` is not an array at the same length as `numChars`
   */
  constructor(label:string, numChars:number, map:Array<number>) {
    // Bind methods
    this.encode = this.encode.bind(this);

    // Setup variables
    if(!label || label.length < 1)
      throw new TypeError(`Stator constructed with parameter 1 "label" being empty.`);
    this.label = label;

    if(numChars <= 0)
      throw new TypeError(`Stator constructed with parameter 2 "numChars" being 0 or under. Please use a positive value.`);
    this.numCharacters = numChars;

    if(!map || !Array.isArray(map) || map.length !== numChars)
      throw new TypeError(`Stator constructed with parameter 3 "map" being empty, or not of length "${numChars}" as specified by "numChars".`);
    this.mapping = [ ...map ];
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
    return this.mapping[ circular(index, this.numCharacters) ];
  }

  /**
   * Checks that this Stator's settings are valid.
   * 
   * First, the wiring is checked for any values that are out-of-range indices
   * compared to {@link Stator.numCharacters}. Then if there are any duplicate
   * values.
   * 
   * @returns Array of Error objects (empty means no errors)
   */
  public validate():Array<Error> {
    // First check for out-of-range values
    const oorErrs:Array<Error> = findOutOfRanges(this.mapping, this.numCharacters)
      .map(([ ind, val ]) => new Error(`Stator.mapping[${ind}] value "${val}" is out of range for the accepted character limit "${this.numCharacters}"`));

    // Then check for duplicates
    const dupErrs:Array<Error> = findDuplicates<number>(this.mapping)
      .map(([ ind, val ]) => new Error(`Stator.mapping[${ind}] is a duplicate value '${val}'`));
  
    return [ ...oorErrs, ...dupErrs ];
  }
}
export default Stator;
