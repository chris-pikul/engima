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

export class Wheel {
  /* eslint-disable array-element-newline */
  /**
   * Ring Display settings for a numerical display.
   * 
   * This is present on the Enigma model I
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
  ringSetting:number;

  /**
   * The starting position (Grundstellung) for this Wheel.
   * 
   * This value is a number being the 0-index of the starting position. The
   * number maps to the character at that index. IE. 0 = A, 5 = E.
   */
  startingPosition:number;

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

  constructor(label:string, display?:Array<string>, wiring?:Array<number>, notches?:Array<number>) {
    // Bind methods
    this.setup = this.setup.bind(this);

    // Setup readonly variables
    this.label = label;
    this.ringDisplay = display ?? Wheel.RingDisplays.Latin;
    this.wiring = wiring ?? [];
    this.notches = notches ?? [];

    // Remaining initialization
    this.ringSetting = 0;
    this.startingPosition = 0;

    this.#position = this.startingPosition;
  }
}

export default Wheel;
