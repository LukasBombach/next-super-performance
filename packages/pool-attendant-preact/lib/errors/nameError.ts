const message = [
  'Could not find "displayName" or "name" in the Component you are ',
  "trying to hydrate. This will break the pool-attendant. Please make ",
  "sure your component has one of these properties."
];

export default class PoolAttendantNameError extends Error {
  constructor() {
    super(message.join());
    this.name = "PoolAttendantNameError";
  }
}
