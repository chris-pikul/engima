/**
 * Enigma
 * =============================================================================
 * Copyright © 2022 Chris Pikul.
 * Licensed under GNU General Public License version 3.
 * See file `LICENSE` at project root for more information
 * =============================================================================
 * 
 * Primary "Machine" class for the Engima. Holds the settings and components
 * required for operating the Enigma simulation. This class should be the
 * primary interaction for any Enigma simulations
 */

import type IValidatable from '../interfaces/IValidatable';

import Plugboard from './Plugboard';
import Reflector from './Reflector';
import Stator from './Stator';
import Wheel from './Wheel';

/**
 * The Machine represents the physical collection of all the components and
 * settings into a singular model used for encoding messages. This Class is
 * intended to be the main representation of any Enigma model as it actually
 * performs the functionality needed to do the encoding.
 */
export class Machine implements IValidatable {
  /**
   * Displayable string identifying the model of this Machine.
   */
  readonly label:string;

  /**
   * The number of characters present on this Machine. This is considered the
   * number of alphabet characters encodable.
   */
  readonly numCharacters:number;

  /**
   * The Plugboard component, if present on this model.
   */
  readonly plugboard?:Plugboard;

  /**
   * The entry wheel, or Entrittswalze (ETW) which performs the first step of
   * character mapping/encoding before the wheels get to act. Additionally it
   * is used to map back after the wheels encoding for processing back through
   * to output.
   */
  readonly entryWheel:Stator;

  /**
   * The configuration of wheels, or rotors, used for encoding between the
   * entry wheel (ETW), and the reflector (UKW).
   * 
   * This is represented as an Array of Wheel objects. The indices are
   * considered right-to-left in relation to a physical machine. That is,
   * physically Enigma machines had the entry wheel on the right, and the
   * Reflector (UKW) on the left. So that the first wheel to perform encoding
   * is the rightmost, or considered the first wheel. In this array, the first
   * index (0) is the right-most wheel; being first and last to encode.
   */
  readonly wheels:Array<Wheel>;

  /**
   * The reflector, or Umkehrwalze (UKW), that's used in the wheel/rotor
   * assembly.
   */
  readonly reflector:Reflector;

  /**
   * Has this machine been initialized (setup)?
   */
  #init = false;

  /**
   * Creates a new Machine
   * @param label Displayable string to identify this Machine
   * @param numChars Number of characters supported
   * @param etw Entry-wheel Stator object
   * @param wheels Array of rotor Wheel objects. See {@link Machine.wheels}}.
   * @param ukw Reflector object
   * @param plugboard Optional Plugboard object
   */
  constructor(label:string, numChars:number, etw:Stator, wheels:Array<Wheel>, ukw:Reflector, plugboard?:Plugboard) {
    // Bind Methods
    this.validate = this.validate.bind(this);

    // Apply properties and check for loose validity
    if(label.length <= 0)
      throw new TypeError(`Machine constructed with an empty 'label' parameter [0].`);
    this.label = label;

    if(numChars <= 0)
      throw new TypeError(`Machine constructed with an invalid 'numChars' parameter [1].`);
    this.numCharacters = numChars;

    if((etw instanceof Stator) === false)
      throw new TypeError(`Machine constructed with an invalid 'etw' parameter [2].`);
    this.entryWheel = etw;

    if(!wheels || Array.isArray(wheels) === false)
      throw new TypeError(`Machine constructed with an invalid 'wheels' parameter [3].`);
    this.wheels = [];

    if((ukw instanceof Reflector) === false)
      throw new TypeError(`Machine constructed with an invalid 'ukw' parameter [4]`);
    this.reflector = ukw;

    if(plugboard) {
      if((plugboard instanceof Plugboard) === false)
        throw new TypeError(`Machine constructed with an invalid 'plugboard' parameter [5]`);
      this.plugboard = plugboard;
    }
  }

  /**
   * Validates that the settings and components of this Machine are correct.
   * 
   * @returns Array of Error objects (if empty, there where none)
   */
  public validate():Array<Error> {
    const errs:Array<Error> = [];

    // Check that the entry wheel is correct
    if(this.entryWheel.numCharacters !== this.numCharacters)
      errs.push(new Error(`Machine "${this.label}" has an invalid entry wheel (ETW), the number of characters does not match.`));
    errs.push(...this.entryWheel.validate());

    // Check the wheels
    errs.push(...this.wheels.map((whl:Wheel, ind:number) => {
      const subErrs:Array<Error> = [];
      if(whl.numCharacters !== this.numCharacters)
        subErrs.push(new Error(`Machine "${this.label}" has an invalid wheel[${ind}], the number of characters does not match.`));
      
      const valErrs = whl.validate()
        .map(err => new Error(`Machine "${this.label}" has an invalid wheel[${ind}]: ${err.message}.`));

      return [ ...subErrs, ...valErrs ];
    }).flat());

    // Check the reflector
    if(this.reflector.numCharacters !== this.numCharacters)
      errs.push(new Error(`Machine "${this.label}" has an invalid reflector (UKW), the number of characters does not match.`));
    errs.push(...this.reflector.validate());

    // Check the plugboard if we have one
    if(this.plugboard) {
      if(this.plugboard.numCharacters !== this.numCharacters)
        errs.push(new Error(`Machine "${this.label}" has an invalid plugboard configuration, the number of characters does not match.`));
      errs.push(...this.plugboard.validate());
    }

    return errs;
  }
}
export default Machine;
