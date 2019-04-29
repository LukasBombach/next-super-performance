import * as React from "react";

export interface HydrationData {
  [key: string]: ComponentData;
}

export interface ComponentData {
  name: string;
  props: any;
}

export const hydrationData: HydrationData = {};
let nextHydrationId = 0;

const HydrationData: React.SFC<{}> = () => (
  <script type="application/hydration-data" />
);

export default HydrationData;
