/**
 * Enigma
 * =============================================================================
 * Copyright © 2022 Chris Pikul.
 * Licensed under GNU General Public License version 3.
 * See file `LICENSE` at project root for more information
 * =============================================================================
 * 
 * Class representing a Wheel. The wheel, or rotor, performs the substitution of
 * keys, while also controlling and performing a rotation if desired.
 */

import type IEncodable from '../interfaces/IEncodable';
import type IRotatable from '../interfaces/IRotatable';
import type IValidatable from '../interfaces/IValidatable';

import {
  circular,
  findDuplicates,
  findOutOfRanges,
} from '../common';

/**
 * Represents the Wheel, or "Rotor" of the Enigma machine.
 * 
 * The wheel is responsible for performing a substitution of an incoming
 * character into another via it's internal "wiring". In addition, the wheel may
 * be rotated on each character entered, manually, or driven by a neighboring
 * wheel in order to change the output character encoding. As an additional
 * security step, the wheel may have it's "ring setting" altered at setup to
 * offset the internal alphabet wiring.
 */
export class Wheel implements IEncodable, IRotatable, IValidatable {
  /* eslint-disable array-element-newline */
  /**
   * Available display types for the "rings" of the wheel. In a physical Enigma
   * machine, these are visible through the viewing window on the top.
   * 
   * Most models of Enigma use the latin alphabet displays, with the exception
   * of the Model I (services enigma), and the Model Z (numerical enigma).
   */
  public static readonly RingDisplays:Record<string, Array<string>> = {
    ModelI: [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26' ],
    Latin: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ],
    ModelZ: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ],
  };
  /* eslint-enable array-element-newline */

  /**
   * The displayed label or name for this wheel
   */
  readonly label:string;

  /**
   * The maximum number of characters. For the standard latin alphabet rings
   * this value should be 26. The Funkschlüssel C has 28, and the Model Z has
   * 10.
   */
  readonly numCharacters:number;

  /**
   * Display ring for the Wheel.
   * 
   * This maps the current position, or index, of the wheel. To the displayed
   * character visible on the viewing screen.
   * 
   * The type for this property is an array of strings. Each index maps directly
   * to the position for the wheel. It is provided as an array because different
   * wheels display their values differently. Some use alphabetic letters, some
   * use numberical values.
   */
  readonly ringDisplay:Array<string>;

  /**
   * Internal wiring of the wheel.
   * 
   * This value is an array of numbers, each number is considered the 0-based
   * offset for the substitution character.
   * 
   * For instance, `wiring[0] = 5` means that on the input character 0 (A), the
   * resulting output will be 5 (E).
   * 
   * Marked as `readonly` because this value should not change in between
   * wheels.
   */
  readonly wiring:Array<number>;

  /**
   * Notches, or turnover points.
   * 
   * This value is an array of numbers describing the index position in which
   * the wheel performs a turnover (ratchets, or rotates). When this value is
   * active (being the wheel is in that position), the next key-press will
   * result in the wheel next to it in the machine to rotate.
   * 
   * Note that these values represents the physical position, and not the
   * displayed character on the wheel. This is because the ring-setting may
   * adjust the displayed character.
   */
  readonly notches:Array<number>;

  /**
   * The ring setting (Ringstellung) for this Wheel.
   * 
   * This value is adjustable, and thus, part of the initial setup for the
   * machine.
   * 
   * The value is interpreted as a 0-based index value for the offset of the 
   * wheel. For instance, a value of 0 will result in the wheel being in default
   * configuration, leaving the A character in the first position.
   */
  #ringSetting:number;

  /**
   * The starting position (Grundstellung) for this Wheel.
   * 
   * This value is a number being the 0-index of the starting position. The
   * number maps to the character at that index. IE. 0 = A, 5 = E.
   */
  #startingPosition:number;

  /**
   * The current position that the wheel is in.
   * 
   * This is a 0-based index of the wheels current physical position. Note that
   * the ring position alters the display value and not this value as it relates
   * to the notches and wiring.
   * 
   * @private
   */
  #position:number;

  /**
   * If true, the wheel has called the setup function
   */
  #init:boolean;

  /**
   * Construct a new Wheel.
   * 
   * @param label Displayable string name for this Wheel
   * @param numChars How many characters this wheel supports
   * @param display An array of strings mapping each character indice to a
   * displayable text
   * @param wiring Array of output indices that maps 1-to-1 with input indices.
   * None of the values within this array may duplicate. See
   * {@link Wheel.wiring} for more information.
   * @param notches Array of indice points in which when the wheel is at that
   * position, it is considered to have an active notch.
   * 
   * @throws TypeError if `label` is empty
   * @throws TypeError if `numChars` is 0 or below
   * @throws TypeError if `display` is not an Array of same length as `numChars`
   * @throws TypeError if `wiring` is not an Array of same length as `numChars`
   */
  constructor(label:string, numChars:number, display?:Array<string>, wiring?:Array<number>, notches?:Array<number>) {
    // Bind methods
    this.setup = this.setup.bind(this);
    this.encode = this.encode.bind(this);
    this.advance = this.advance.bind(this);
    this.validate = this.validate.bind(this);

    // Setup readonly variables
    if(label.length < 1)
      throw new TypeError(`Wheel constructed with parameter 1 "label" being empty.`);
    this.label = label;

    // TODO: Have a default numChars that matches latin alphabet (26)
    if(numChars <= 0)
      throw new TypeError(`Wheel constructed with parameter 2 "numChars" being 0 or under. Please use a positive value.`);
    this.numCharacters = numChars;

    // TODO: Only use the default if numChars is NOT 26
    if(!display || display.length !== numChars)
      throw new TypeError(`Wheel constructed with an invalid "display" parameter. Expected an array equaling the "numChars" parameter in length.`);
    this.ringDisplay = display ?? Wheel.RingDisplays.Latin;

    if(!wiring || wiring.length !== numChars)
      throw new TypeError(`Wheel constructed with an invalid "wiring" parameter. Expected an array equaling the "numChars" parameter in length.`);
    this.wiring = wiring ?? [];

    this.notches = notches ?? [];

    // Remaining initialization
    this.#ringSetting = 0;
    this.#startingPosition = 0;
    this.#position = 0;
    this.#init = false;
  }

  /**
   * The internal ring setting (Ringstellung) applied when the wheel was setup.
   * 
   * @readonly
   */
  get ringSetting():number {
    return this.#ringSetting;
  }

  /**
   * The initial starting position (Grundstellung) the wheel was in when setup.
   * 
   * @readonly
   */
  get startingPosition():number {
    return this.#startingPosition;
  }

  /**
   * Current position the wheel is in
   */
  get position():number {
    return this.#position;
  }

  /**
   * Current position the wheel is in.
   * 
   * Setting this variable will properly wrap the value to be within acceptable
   * range for this wheel.
   */
  set position(val:number) {
    this.#position = circular(val, this.numCharacters);
  }

  /**
   * True, if the {@link Wheel.setup()} method has been called
   */
  get isSetup():boolean {
    return this.#init;
  }

  /**
   * The current visible character in the viewport window.
   * 
   * Note: the returned string may be more than 1 character in length
   * as the displayed information is determined by the wheel model.
   * 
   * The physical description of wheels says that the visible character is
   * actually 1 position ahead of the current position.
   */
  get visibleCharacter():string {
    return this.ringDisplay[ circular(this.position + 1, this.numCharacters) ];
  }

  /**
   * Is the wheel currently at a position in which the notch is engaged (or
   * ready to rotate in other words)?
   */
  get atNotch():boolean {
    return this.notches.includes(this.position);
  }

  /**
   * Performs initial setup of the wheel. This method should be executed when
   * the Enigma machine itself is preparing for work.
   * 
   * @param ringSetting (Ringstellung) Numerical offset for the ring
   * (0-based indice)
   * @param startingPosition (Grundstellung) Numerical starting position for the
   * wheel. (0-based indice)
   */
  public setup(ringSetting:number, startingPosition:number):void {
    this.#ringSetting = circular(ringSetting, this.numCharacters);
    this.#startingPosition = circular(startingPosition, this.numCharacters);
    this.#position = this.startingPosition;
    this.#init = true;
  }

  /**
   * Performs an encoding of a character by taking the input character number
   * (0-based index on the alphabet) and applying the position, ring settings,
   * and internal wiring to return a resulting character index.
   * 
   * @implements IEncodable
   * @param index Input character index (0-based)
   * @returns New character index (0-based)
   */
  public encode(index:number):number {
    // TODO: Throw warning if !init?
    return this.wiring[circular(index + this.#position + this.#ringSetting, this.numCharacters)];
  }

  /**
   * Rotates the wheel one position forward.
   * 
   * As the wheel is circular, this will automatically roll-over.
   * 
   * @implements IRotatable
   * @param steps Number of steps or positions to rotate (default 1)
   * @returns New position index
   */
  public advance(steps = 1):number {
    this.#position = circular(this.#position + steps, this.numCharacters);
    return this.#position;
  }

  /**
   * Checks that this Wheel's settings are valid.
   * 
   * First, the wiring is checked for any values that are out-of-range indices
   * compared to {@link Wheel.numCharacters}. Then if there are any duplicate
   * values.
   * 
   * @returns Array of Error objects (empty means no errors)
   */
  public validate():Array<Error> {
    // First check for out-of-range values
    const oorErrs:Array<Error> = findOutOfRanges(this.wiring, this.numCharacters)
      .map(([ ind, val ]) => new Error(`Wheel.wiring[${ind}] value "${val}" is out of range for the accepted character limit "${this.numCharacters}"`));

    // Then check for duplicates
    const dupErrs:Array<Error> = findDuplicates<number>(this.wiring)
      .map(([ ind, val ]) => new Error(`Wheel.wiring[${ind}] is a duplicate value '${val}'`));
  
    return [ ...oorErrs, ...dupErrs ];
  }
}

export default Wheel;
