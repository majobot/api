export type BootableState = 'uninitialized' | 'boot' | 'initialized' | 'teardown' | 'destructed' | 'error';

/**
 * Represents an entity, which lazy-loads its dependencies on its own.
 *
 * E.g. fetching remote information.
 */
export interface Bootable {
  /**
   * Starts the initialization of the Bootable.
   *
   * The Promise indicates the state of the initialization.
   */
  boot(): Promise<any>;

  /**
   * Returns the current state of the bootable.
   */
  state(): BootableState;

  /**
   * Starts the destruction of the Bootable.
   *
   * The Promise indicates the state of the destruction.
   */
  teardown(): Promise<any>;
}



/**
 * Represents a channel in a messaging service.
 */
export interface Channel {
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
   * Send a message to the current channel.
   * @param message The message to send.
   */
  sendMessage(message: string): Promise<any>;
}



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



/**
 * Represents a received message.
 */
export interface Message {
  /**
   * The channel to which the message has been sent.
   */
  channel(): Channel;

  /**
   * The content of the message.
   */
  content(): string;

  /**
   * A collection of the users mentioned in the message.
   */
  mentionedUsers(): Array<string>;

  /**
   * The (user-)name of the user who sent the message.
   */
  senderName(): string;
}



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