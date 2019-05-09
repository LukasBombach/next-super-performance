import { ComponentType } from "preact";
import {
  HydrationDataDescriptor,
  ComponentDataDescriptor
} from "../hydrationData";
import { ComponentMap, getComponentName as getName } from "../util";

export default function showHydrationWarnings<P>(
  dataScript: Element | null,
  data: HydrationDataDescriptor<any>,
  components: ComponentType<P>[],
  markers: Element[]
): void {
  const numComps: number = components.length;
  const numMarkers: number = markers.length;
  const missingComponents = getComponentsMissingInData(data, components);
  const unmarkedComponents = getUnmarkedComponents(data, components);
  const missingComponentNames = missingComponents.map(comp => getName(comp));
  const unmarkedComponentNames = unmarkedComponents.map(({ name }) => name);
  const hasMissingComponents: boolean = !!missingComponents.length;
  const hasUnmarkedComponents: boolean = !!unmarkedComponents.length;
  const hasComps: boolean = !!numComps;
  const hasMarkers: boolean = !!numMarkers;
  const warn = (msg: string) => console.warn(msg);

  if (!dataScript) {
    // prettier-ignore
    warn(`You provided ${numComps} components to hydrate but did not include <HydrationData /> on your page. Your components will therefore be hydrated without top level props`);
  }

  if (hasMarkers && !hasComps) {
    // prettier-ignore
    warn(`You used withHydration ${numMarkers} times but did not provide any components. Therefore no components will be hydrated`);
  }

  if (hasComps && !hasMarkers) {
    // prettier-ignore
    warn(`You provided ${numComps} components to hydrate but did not use withHydration on your components. Therefore no components will be hydrated`);
  }

  if (hasMissingComponents) {
    // prettier-ignore
    warn(`You are using withHydration with ${missingComponentNames.join(", ")}, but did not provide these components in your call of \`hydrate()\``);
  }

  if (hasUnmarkedComponents) {
    // prettier-ignore
    warn(`You are providing ${unmarkedComponentNames.join(", ")}, but do not have any instances of these components on your page`);
  }
}

function getComponentsMissingInData<P>(
  data: HydrationDataDescriptor<any>,
  components: ComponentType<P>[]
): ComponentType<P>[] {
  const dataValues = Object.values(data);
  const compExistsInData = (comp: ComponentType<P>) =>
    dataValues.some(({ name }) => name === getName(comp));
  return components.filter((comp: ComponentType<P>) => !compExistsInData(comp));
}

function getUnmarkedComponents<P>(
  data: HydrationDataDescriptor<any>,
  components: ComponentType<P>[]
): ComponentDataDescriptor<P>[] {
  const dataValues = Object.values(data);
  const compNames = components.map(comp => getName(comp));
  const nameExistsInComps = (name: string) =>
    compNames.some(compName => name === compName);
  return dataValues.filter(
    ({ name }: ComponentDataDescriptor<P>) => !nameExistsInComps(name)
  );
}
