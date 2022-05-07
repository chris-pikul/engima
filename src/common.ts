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
export function circular(val:number, max:number):number {
  if(Number.isFinite(max) === false || max <= 0)
    throw new TypeError(`Circular() requires a positive, non-0, finite number for parameter 2 "max".`);

  // Perform a modulo to keep it in the range
  let res:number = (val % max);

  // If it's negative, then wrap it around by adding the negative value
  if(res < 0)
    res = max + res;

  return res;
}

/**
 * Searches an array for any duplicate indices.
 * 
 * Returns an array of tuples matching the `[ index, value ]` signature.
 * 
 * The earliest index of a duplicate is not returned, instead only duplicates
 * after that index are added.
 * 
 * @param arr Input array to search
 * @returns Array of tuples for any duplicate entries.
 */
export function findDuplicates<T>(arr:Array<T>):Array<[number, T]> {
  // Hold an array of tuples for returning
  const dups:Array<[number, T]> = [];

  // Start searching at beginning of the array
  for(let ind = 0; ind < arr.length; ind++) {
    const el:T = arr[ind];
    
    // Then search the remaining starting at the next indice as to not duplicate
    for(let other = ind + 1; other < arr.length; other++) {
      // Prevent us from re-checking the same duplicate, preventing more dups.
      if(dups.findIndex(dup => dup[1] === arr[other]) !== -1)
        continue;

      // Check if this outer entry is a duplicate, then push it
      if(arr[other] === el)
        dups.push([ other, el ]);
    }
  }

  // Return the results
  return dups;
}
