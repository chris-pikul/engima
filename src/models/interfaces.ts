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
};
export default Model;
