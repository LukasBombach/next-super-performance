import { ComponentType, RenderableProps } from "preact";
import NameError from "./nameError";

export default function getCompnentName(
  component: ComponentType<RenderableProps<any>>
): string {
  const compName = component.displayName || component.name;
  if (!compName) throw new NameError();
  return compName;
}
