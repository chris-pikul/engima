/**
 * Enigma
 * =============================================================================
 * Copyright © 2022 Chris Pikul.
 * Licensed under GNU General Public License version 3.
 * See file `LICENSE` at project root for more information
 * =============================================================================
 * 
 * Interface for a component that can have it's settings validated
 */

/**
 * A Class that is capable of having it's settings validated
 */
export interface IValidatable {
  
  /**
   * Checks that this component's settings are valid.
   * 
   * @returns An array of Error objects (if empty, no errors)
   */
  validate():Array<Error>;
}
export default IValidatable;
