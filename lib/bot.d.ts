import {PlatformClient} from './platform-client';
import {Bootable} from './bootable';

export interface Bot extends Bootable {
  /**
   * Registers a PlatformClient so it may be created and booted by the bot.
   *
   * A PlatformClient may only be registered once. Multiple registrations shall be ignored.
   * @param client
   */
  registerPlatformClient(client: new() => PlatformClient): Bot;

  /**
   * Unregisters a PlatformClient so it may no longer be bootable by the bot.
   *
   * An unregistering of a PlatformClient shall also lead to a teardown invocation, in case it has been booted.
   * @param client
   */
  unregisterPlatformClient(client: new() => PlatformClient): Bot;

  /**
   * Boots a previously registered PlatformClient.
   *
   * This method shall return the boot promise of the PlatformClient.
   *
   * The boot of an unregistered PlatformClient shall throw an Error.
   * @param client
   */
  bootPlatformClient(client: new() => PlatformClient): Promise<any>;

  /**
   * Boots a previously registered PlatformClient.
   *
   * The boot of an unregistered PlatformClient shall throw an Error.
   * @param client
   */
  bootPlatformClient(client: new() => PlatformClient): Promise<any>;

  /**
   * Returns an array containing all registered PlatformClients.
   */
  registeredPlatformClients(): Array<PlatformClient>;
}