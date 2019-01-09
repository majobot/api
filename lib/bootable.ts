export type BootableState = 'uninitialized' | 'boot' | 'initialized' | 'teardown' | 'destructed' | 'error';

/**
 * Represents an entity, which lazy-loads its dependencies on its own.
 *
 * E.g. fetching remote information.
 */
export interface Bootable {
  new(): any;

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
