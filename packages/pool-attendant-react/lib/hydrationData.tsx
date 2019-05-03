import * as React from "react";

export interface HydrationDataDescriptor<P> {
  [key: string]: ComponentDataDescriptor<P>;
}

export interface ComponentDataDescriptor<P> {
  name: string;
  props?: React.Props<P>;
  children?: (React.Props<P> | null)[];
}

export default class HydrationData extends React.Component {
  private static nexHid: number = 0;
  private static data: HydrationDataDescriptor<{}> = {};

  public static storePropsFromChildren(nodes: React.ReactNode[]): string {
    const hid = (++HydrationData.nexHid).toString();
    const children = nodes.map(node => HydrationData.getProps(node));
    HydrationData.data[hid] = { name, children };
    return hid;
  }

  private static getProps(node: React.ReactNode): React.Props<{}> | null {
    if (!node) return null;
    if (typeof node === "number") return null;
    if (typeof node === "boolean") return null;
    if (typeof (node as any).props !== "undefined") return null; // TODO REMOVE THIS SHORTCUT
    return (node as React.ReactElement).props;
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
