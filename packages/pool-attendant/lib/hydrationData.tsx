import * as React from "react";

export interface Data {
  [key: string]: ComponentDataDescriptor;
}

export interface ComponentDataDescriptor {
  name: string;
  props: any;
}

export default class HydrationData extends React.Component {
  private static nexHid: number = 0;
  private static data: Data = {};

  public static storeProps(name: string, props: any): string {
    const hid = (++HydrationData.nexHid).toString();
    HydrationData.data[hid] = { name, props };
    return hid;
  }

  private static flushHydrationData(): string {
    const serializedHydrationData = JSON.stringify(HydrationData.data);
    HydrationData.nexHid = 0;
    HydrationData.data = {};
    return serializedHydrationData;
  }

  render() {
    return (
      <script
        type="application/hydration-data"
        dangerouslySetInnerHTML={{ __html: HydrationData.flushHydrationData() }}
      />
    );
  }
}
