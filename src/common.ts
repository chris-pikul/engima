/**
 * Enigma
 * =============================================================================
 * Copyright © 2022 Chris Pikul.
 * Licensed under GNU General Public License version 3.
 * See file `LICENSE` at project root for more information
 * =============================================================================
 * 
 * Common types and utilities used elsewhere. None of this is really intended
 * for public use.
 */

/**
 * Ensures an incoming value is between 0 and the given `max` value. Outside of
 * a standard modulo operator, it also insures negative numbers subtract from
 * the max, just like a physical circle or wheel would.
 * 
 * @param val Incoming value
 * @param max Maximum value (exclusive)
 */
export function Circular(val:number, max:number):number {
  if(Number.isFinite(max) === false || max <= 0 )
    throw new TypeError(`Circular() requires a positive, non-0, finite number for parameter 2 "max".`);

  // Perform a modulo to keep it in the range
  let res:number = (val % max);

  // If it's negative, then wrap it around by adding the negative value
  if(res < 0)
    res = max + res;
    
  return res;
}