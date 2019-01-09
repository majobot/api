import {Channel} from "./channel";

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