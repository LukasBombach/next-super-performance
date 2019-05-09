import { ComponentType, RenderableProps } from "preact";
import { HydrationDataDescriptor } from "../hydrationData";
import NameError from "../errors/nameError";

export const MARKER_SELECTOR = 'script[type="application/hydration-marker"]';
export const DATA_SELECTOR = 'script[type="application/hydration-data"]';

export interface ComponentMap {
  [name: string]: ComponentType<RenderableProps<any>>;
}

export function getComponentName(
  component: ComponentType<RenderableProps<any>>
): string {
  const compName = component.displayName || component.name;
  if (!compName) throw new NameError();
  return compName;
}

export function getMarkers(container: Element | Document): Element[] {
  const elementCollection = container.querySelectorAll(MARKER_SELECTOR);
  return Array.from(elementCollection);
}

export function getData(
  dataScript: Element | null
): HydrationDataDescriptor<any> {
  return dataScript ? JSON.parse(dataScript.innerHTML) : {};
}

export function getComponentMap<P>(
  components: ComponentType<P>[]
): ComponentMap {
  return components.reduce(
    (map, comp) => ({ ...map, [getComponentName(comp)]: comp }),
    {}
  );
}

export function readMarker(
  marker: Element
): { id: string; el: Element; parent: Element } {
  const id: string = marker.getAttribute("data-hid") as string;
  const el: Element = marker.nextElementSibling as Element;
  const parent: Element = el.parentElement as Element;
  return { id, el, parent };
}

export function getComponent(
  componentMap: ComponentMap,
  data: HydrationDataDescriptor<any>,
  id: string
): ComponentType<any> {
  return componentMap[data[id].name];
}

export function getProps(
  data: HydrationDataDescriptor<any>,
  id: string
): RenderableProps<ComponentType<any>> {
  return data[id] ? data[id].props : {};
}
