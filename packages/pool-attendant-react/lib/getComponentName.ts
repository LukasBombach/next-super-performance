import NameError from "./nameError";

export default function getCompnentName(component: React.Component): string {
  const compName = component.displayName || component.name;
  if (!compName) throw new NameError();
  return compName;
}
