import * as React from "react";

export interface HydrationData {
  [key: string]: ComponentData;
}

export interface ComponentData {
  name: string;
  props: any;
}

let nextHydrationId: number = 0;
let hydrationData: HydrationData = {};

const HydrationData: React.SFC<{}> = () => (
  <script
    type="application/hydration-data"
    dangerouslySetInnerHTML={{ __html: flushHydrationData() }}
  />
);

function storeProps(name: string, props: any): string {
  const hydrationId = (++nextHydrationId).toString();
  hydrationData[hydrationId] = { name, props };
  return hydrationId;
}

function flushHydrationData(): string {
  const serializedHydrationData = JSON.stringify(hydrationData);
  hydrationData = {};
  return serializedHydrationData;
}

export default HydrationData;
export { storeProps };
