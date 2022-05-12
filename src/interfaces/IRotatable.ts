/**
 * Enigma
 * =============================================================================
 * Copyright © 2022 Chris Pikul.
 * Licensed under GNU General Public License version 3.
 * See file `LICENSE` at project root for more information
 * =============================================================================
 * 
 * Interface for a component that can be rotated or advanced by some mechanism.
 */

/**
 * A class that can be advanced by an optional number of positions for it's
 * internal positioning.
 */
export interface IRotatable {

  /**
   * The initial index (0-based) starting position when this component was setup
   */
  startingPosition:number;

  /**
   * The current index (0-based) position of the component.
   */
  position:number;

  /**
   * Advance, or rotate, the given component by the number of steps provided.
   * 
   * 1 is assumed the default number of steps.
   * 
   * @param steps Optional number of steps, 1 is default
   */
  advance(steps?:number):void;
}
export default IRotatable;
