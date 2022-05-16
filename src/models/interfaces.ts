/**
 * Enigma
 * =============================================================================
 * Copyright © 2022 Chris Pikul.
 * Licensed under GNU General Public License version 3.
 * See file `LICENSE` at project root for more information
 * =============================================================================
 * 
 * Interface types for the Model data.
 */

/**
 * Settings for an available wheel provided with a model
 */
export interface ModelWheel {

  /**
   * Alphabet for the wiring of the wheel as it compares to the general model
   * wheel.
   */
  wiring:string;

  /**
   * The characters which provide the indices for the notch positions.
   */
  notches:Array<string>;

  /**
   * Is this wheel a special "thin" variant for a 4-th wheel (present on the M4)
   */
  thin?:boolean;
};

/**
 * Available Reflector (UKW) for the Model
 */
export interface ModelReflector {

  /**
   * Displayable string identifying this reflector
   */
  label:string;

  /**
   * String alphabet describing the wiring of the reflector as it compares to 
   * the Models standard alphabet.
   */
  wiring:string;

  /**
   * Is this Reflector rewirable? (UKW-D).
   * 
   * The wiring may still be provided as a sane-default, or to reflect the
   * wiring of a physical one as it was found.
   */
  rewirable?:boolean;
};

/**
 * Describes the properties, wiring, and settings available to an individual
 * model of Enigma machine.
 */
export interface Model {

  /**
   * Displayable label string for this Model.
   */
  label:string;

  /**
   * Keyboard alphabet as it maps from character 0..max.
   */
  alphabet:string;

  /**
   * Stator wiring, specific if it is different from the input alphabet.
   */
  stator?:string;

  /**
   * Available wheels for this Model.
   */
  wheels:Record<string, ModelWheel>;

  /**
   * Available reflectors for this Model.
   */
  reflectors:Array<ModelReflector>;

  /**
   * Does this model feature a plugboard?
   */
  plugboard?:boolean;

  /**
   * Does this model feature a cog-wheel drive for the wheels?
   * 
   * Most models featured a lever based mechanism.
   */
  cogDrive?:boolean;
};
export default Model;
