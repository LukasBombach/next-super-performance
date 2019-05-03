import { h, render, ComponentType, RenderableProps } from "preact";
import name from "./getComponentName";
import { HydrationDataDescriptor } from "./hydrationData";

interface ComponentMap {
  [name: string]: ComponentType<RenderableProps<any>>;
}

export default function hydrate<P>(
  components: ComponentType<P>[] = [],
  container: Element | Document = document
) {
  const markers: Element[] = Array.from(
    container.querySelectorAll('script[type="application/hydration-marker"]')
  );

  const data: HydrationDataDescriptor<any> = JSON.parse(
    container.querySelector('script[type="application/hydration-data"]')!
      .innerHTML
  );

  const componentMap: ComponentMap = components.reduce(
    (map, comp) => ({ ...map, [name(comp)]: comp }),
    {}
  );

  for (const marker of markers) {
    const el: Element = marker.nextElementSibling as Element;
    const id: string = marker.getAttribute("data-hid") as string;
    const props: RenderableProps<ComponentType<any>> = data[id].props;
    const Comp: ComponentType<any> = componentMap[data[id].name];
    render(<Comp {...props} />, el.parentElement as HTMLElement, el);
  }
}
