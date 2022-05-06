/**
 * Enigma
 * =============================================================================
 * Copyright © 2022 Chris Pikul.
 * Licensed under GNU General Public License version 3.
 * See file `LICENSE` at project root for more information
 * =============================================================================
 * 
 * Interface for a component that can encode one 0-based index into another
 * index.
 */

/**
 * A class that is capable of encoding an incoming index (0-based character
 * offset) into a new index.
 */
export interface IEncodable {

  /**
   * Encodes an incoming character index into a new index
   */
  encode(index:number):number;
};
export default IEncodable;
