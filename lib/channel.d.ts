import { PlatformClient } from "./platform-client";

import { Command } from './command';

/**
 * Represents a channel in a messaging service.
 */
export interface Channel {
  /**
   * Adds a command to the channel.
   * 
   * The provided constructor function may not require any parameters.
   * The newly created Command shall be booted by the Channel instance.
   * @param command 
   */
  addCommand(command: new() => Command): Channel;

  /**
   * Removes a command instance to the channel.
   *
   * The Channel shall invoke the teardown method on the Command.
   * @param command 
   */
  removeCommand(command: new() => Command): Channel;

  /**
   * Returns all commands available/registered in the channel.
   */
  commands(): Array<Command>;

  /**
   * Join the current channel.
   */
  join(): Promise<any>;

  /**
   * Leave the current channel.
   */
  leave(): Promise<any>;

  /**
   * The name of the current channel.
   */
  name(): string;

  /**
   * The platform of the current channel.
   */
  platform(): PlatformClient;

  /**
   * Send a message to the current channel.
   * @param message The message to send.
   */
  sendMessage(message: string): Promise<any>;
}