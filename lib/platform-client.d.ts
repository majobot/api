import { Bootable } from "./bootable";

import { Channel } from "./channel";

import { Message } from "./message";

/**
 * Represents a client for a messaging service.
 *
 * A default constructor is necessary, so clients can be created without having to know their dependencies.
 *
 * Dependencies should be fetched in the boot() method.
 */
export interface PlatformClient extends Bootable {
  /**
   * Returns a Channel instance with the provided name.
   * If the channel is not present in the subscribed channels,
   * it will be created.
   * @param name
   */
  channel(name: string): Channel;

  /**
   * Holds a reference of all channels That have bee visited by the PlatformClient.
   */
  channelRegister(): Set<Channel>;

  /**
   * Connects the client to its corresponding, configured server.
   * Host and port parameter may be provided through configurations
   * but are not guaranteed to be provided.
   *
   * Fallback default values of exceptions should be in place for such a scenario.
   * @param username The username to authenticate with at the remote server.
   * @param password The password to authenticate with at the remote server.
   * @param host The optional hostname to connect to.
   * @param port The optional port of the host to connect to.
   */
  connect(username: string, password: string, host?: string, port?: number): Promise<any>;

  /**
   * Disconnects the client from its server.
   *
   * If the client is not configured as this method is called, nothing should happen.
   */
  disconnect(): Promise<any>;

  /**
   * An array of channels the client joined.
   */
  joinedChannels(): Array<Channel>;

  /**
   * Adds the provided callback function to the listeners for the specified event.
   *
   * In case an invalid event is specified, an exception will be thrown.
   * @param event The event to add the callback to.
   * @param callback The handler of the event.
   */
  on(event: 'line', callback: (line: string) => (any | Promise<any>)): PlatformClient;
  on(event: 'message', callback: (message: Message) => (any | Promise<any>)): PlatformClient;

  /**
   * The beginning character sequence of a message,
   * which indicates a command on the platform.
   */
  platformCommandTrigger(): string;

  /**
   * The platform's name.
   */
  platformName(): string;

  /**
   * Removes a subscribed listener from na event.
   * @param event The event to remove the listener from.
   * @param listener The listener to remove.
   */
  removeListener(event: 'line' | 'message', listener: Function): PlatformClient;

  /**
   * The name of the client's vendor.
   */
  vendorName(): string;

  /**
   * Writes string data to the underlying network connection to the server.
   *
   * @param data The data to write/send to the server.
   */
  write(data: string): Promise<any>;

  /**
   * Identical to write(data) but adds a line break (\r\n) to the data.
   *
   * @param data The data to write/send to the server.
   */
  writeLine(data: string): Promise<any>;
}