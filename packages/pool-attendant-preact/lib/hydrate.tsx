import { h, render, ComponentType } from "preact";
import showHydrationWarnings from "./errors/hydrationWarnings";
import {
  getMarkers,
  getData,
  getComponentMap,
  readMarker,
  getComponent,
  getProps,
  DATA_SELECTOR
} from "./util";

export default function hydrate<P>(
  components: ComponentType<P>[] = [],
  container: Element | Document = document
) {
  const markers = getMarkers(container);
  const dataScript = container.querySelector(DATA_SELECTOR);
  const data = getData(dataScript);
  const componentMap = getComponentMap(components);

  // TODO import and run this in DEV env only
  showHydrationWarnings(dataScript, data, components, markers);

  for (const marker of markers) {
    const { id, el, parent } = readMarker(marker);
    const Component = getComponent(componentMap, data, id);
    const props = getProps(data, id);
    if (Component) render(<Component {...props} />, parent, el);
  }
}
