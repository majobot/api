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