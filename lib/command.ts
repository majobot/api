import {Message} from "./message";
import {Bootable} from "./bootable";

/**
 * Represents a command which can be used/invoked by users in the chat.
 */
export interface Command extends Bootable {
  /**
   * The name of the command.
   */
  name(): string;

  /**
   * Processes the given message according to the command.
   * @param message
   */
  process(message: Message): Promise<any>;

  /**
   * The Command vendor's name.
   */
  vendor(): string;
}