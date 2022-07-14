/**
 * Enigma
 * =============================================================================
 * Copyright © 2022 Chris Pikul.
 * Licensed under GNU General Public License version 3.
 * See file `LICENSE` at project root for more information
 * =============================================================================
 * 
 * Class representing an entire Enigma model kit. This features the machine,
 * the available Stator, Wheels, Reflectors, and accessories.
 * 
 * This aids in setting up a functional system for encoding/decoding to
 * historical specs.
 */

import { AlphabetABC, getWiring } from './alphabet';
import Machine from './components/Machine';
import Plugboard, { PlugWire } from './components/Plugboard';
import Stator from './components/Stator';
import Reflector from './components/Reflector';
import Wheel from './components/Wheel';
import { Model } from './models';
import IValidatable from './interfaces/IValidatable';
import {
  FormatSubstitutions,
  FormattingStandard,
  postFormatDecoding,
  postFormatEncoding,
  preFormatDecoding,
  preFormatEncoding,
} from './format';
import { Trace } from './interfaces/debugging';

export class Enigma implements IValidatable {
  /**
   * Displayable string identifying the model of this Enigma
   */
  label = 'Custom';

  /**
   * String of accepted characters in the alphabet. Additionally maps the
   * keyboard characters to their appropriate index.
   * 
   * If no Stator alphabet is supplied, this is the default for that property
   * as well.
   */
  alphabet:string = AlphabetABC;

  /**
   * Number of wheels supported with this model.
   */
  wheelCount = 3;

  /**
   * Assortment of wheels that come with this kit. They may be installed into
   * the machine and setup individually.
   */
  wheels:Array<Wheel> = [];

  /**
   * Assortment of reflectors that can be installed into the machine.
   */
  reflectors:Array<Reflector> = [];

  /**
   * Does this model feature a plugboard?
   */
  plugboard = false;

  /**
   * Does the machine in this kit feature a cog-wheel drive for the wheels?
   * 
   * Default is false, which means that they are lever driven.
   */
  cogDrive = false;

  /**
   * The internal machine representing the physical mechanism. All components
   * and settings will be applied to this, as well as it being responsible for
   * the operation.
   * 
   * Changes in components will require a re-instantiaion of this object,
   * essentially making it semi-immutable. Methods within the Machine class
   * do not require a new object.
   */
  #machine:Machine;

  debug?:(Trace | Array<Trace>);

  /**
   * Creates a new Enigma kit.
   * 
   * @param model A given Model object describing the settings of this Enigma
   */
  constructor(model:Model) {
    // Bind methods
    this.reset = this.reset.bind(this);
    this.installWheel = this.installWheel.bind(this);
    this.installReflector = this.installReflector.bind(this);
    this.installPlugboard = this.installPlugboard.bind(this);
    this.validate = this.validate.bind(this);
    this.encode = this.encode.bind(this);
    this.encodeMessage = this.encodeMessage.bind(this);
    this.decodeMessage = this.decodeMessage.bind(this);

    // Apply properties
    if(model.label.length === 0)
      throw new TypeError(`Enigma constructed with an empty "label".`);
    this.label = model.label;

    if(model.alphabet.length === 0)
      throw new TypeError(`Enigma constructed with an empty "alpha".`);
    this.alphabet = model.alphabet;

    if(model.wheelCount === 0)
      throw new TypeError(`Enigma constructed with a 0 value for "wheelCount".`);
    this.wheelCount = model.wheelCount;

    if(model.wheels.length === 0)
      throw new TypeError(`Enigma constructed with a 0 length "wheels".`);
    if(model.wheels.length < model.wheelCount)
      throw new TypeError(`Enigma constructed with not enough wheels to satisfy "wheelCount".`);
    this.wheels = model.wheels.map(whl => Wheel.fromModel(model, whl));

    if(model.reflectors.length === 0)
      throw new TypeError(`Enigma constructed with a 0 length "reflectors".`);
    this.reflectors = model.reflectors.map(rfl => Reflector.fromModel(model, rfl));

    this.plugboard = !!model.plugboard;

    this.cogDrive = !!model.cogDrive;

    // Instantiate the machine
    this.#machine = new Machine(
      this.label,
      this.alphabet,
      Stator.fromModel(model),
    );

    // If only one UKW is available, just install it now.
    if(this.reflectors.length === 1)
      this.#machine.reflector = Reflector.clone(this.reflectors[0]);
  }

  get machine():Machine {
    return this.#machine;
  }

  /**
   * Resets the machine back to it's initial starting conditions
   */
  public reset():void {
    this.#machine.reset();
  }

  /**
   * Installs a Wheel from {@link Enigma.wheels} based on it's label. The wheel
   * is added to the machine as a "push" operation.
   * 
   * Additionally set's up the settings for the wheel based on `ringSetting` and
   * `startingPosition`.
   * 
   * @param label Wheel label to find from the {@link Enigma.wheels}
   * @param ringSetting Ring-setting (Ringstellung) to apply
   * @param startingPosition Starting-position (Grundstellung) to apply
   * @returns Error if any prevent the installation
   */
  public installWheel(label:string, ringSetting = 0, startingPosition = 0):(undefined | Error) {
    if(this.#machine.wheels.length >= this.wheelCount)
      return new Error(`Enigma "${this.label}" already has the maximum number of wheels installed.`);

    const optWheel = this.wheels.find(whl => whl.label === label);
    if(!optWheel)
      return new Error(`Enigma "${this.label}" does not contain a wheel labeled "${label}".`);
    
    const wheel = Wheel.clone(optWheel).setup(ringSetting, startingPosition);
    this.#machine.wheels.push(wheel);
  }

  /**
   * Installs a Reflector from {@link Enigma.reflectors} based on it's label.
   * 
   * @param label Given Reflector label to find from {@link Enigma.reflectors}
   * @returns Error if any prevent the installation
   */
  public installReflector(label:string):(undefined | Error) {
    const optRefl = this.reflectors.find(refl => refl.label === label);
    if(!optRefl)
      return new Error(`Enigma "${this.label}" does not contain a reflector labeled "${label}".`);

    const refl = Reflector.clone(optRefl);
    this.#machine.reflector = refl;
  }

  /**
   * Installs a Plugboard onto the machine, regardless of whether the model this
   * is based on supports one.
   * 
   * @param plugs Optional array of PlugWire connections
   */
  public installPlugboard(plugs:Array<PlugWire> = []):void {
    this.plugboard = true;

    this.#machine.plugboard = new Plugboard(
      this.label,
      this.alphabet.length,
      plugs,
    );
  }

  /**
   * Validates the settings of the machine.
   * 
   * @returns Array of Errors if any where found
   */
  public validate():Array<Error> {
    return this.#machine.validate();
  }

  /**
   * Encodes a single character using the current machine as it is setup.
   * 
   * Will perform any mechanical operations needed, but does NOT do formatting.
   * 
   * @param char Input character
   * @param unknownAs Fallback character for unsupported characters
   * @returns New character
   */
  public encode(char:string, unknownAs = 'X'):string {
    if(char.length === 0)
      return '';
    
    // Ensure single character
    if(char.length > 1)
      throw new Error(`Enigma.encode recieved a character longer than 1.`);

    const [ out, trace ] = this.#machine.processCharacter(char, unknownAs);
    this.debug = trace;
    return out;
  }

  /**
   * Encodes an entire string message using the current machine as it is setup.
   * 
   * Will perform formatting for the message to adhere to standard Enigma
   * operating procedures.
   * 
   * @param msg Input string
   * @param subs Formatting substitutions to use
   * @param unknownAs Fallback character for unsupported characters
   * @returns Formatted cipher text
   */
  public encodeMessage(msg:string, subs:FormatSubstitutions = FormattingStandard, unknownAs = 'X'):string {
    const [ cipher, traces ] = this.#machine.processMessage(preFormatEncoding(msg, subs), unknownAs);
    this.debug = traces;
    return postFormatEncoding(cipher);
  }

  /**
   * Decodes an entire string message using the current machine as it is setup.
   * 
   * Will perform formatting for the message to adhere to standard Enigma
   * operating procedures.
   * 
   * @param msg Cipher text
   * @param subs Formatting substitutions to use
   * @param unknownAs Fallback character for unsupported characters
   * @returns Formatted plain-text
   */
  public decodeMessage(msg:string, subs:FormatSubstitutions = FormattingStandard, unknownAs = 'X'):string {
    const [ plain, traces ] = this.#machine.processMessage(preFormatDecoding(msg), unknownAs);
    this.debug = traces;
    return postFormatDecoding(plain, subs);
  }
}
export default Enigma;
