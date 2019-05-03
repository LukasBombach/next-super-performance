const message = [
  'Could not find "displayName" or "name" in the Component you are ',
  "trying to hydrate. This will break the pool-attendant. Please make ",
  "sure your component has one of these properties."
];

class NameError extends Error {
  constructor() {
    super(message.join());
    this.name = "NameError";
  }
}

export default function getCompnentName(component) {
  const compName = component.displayName || component.name;
  if (!compName) throw new NameError();
  return compName;
}
