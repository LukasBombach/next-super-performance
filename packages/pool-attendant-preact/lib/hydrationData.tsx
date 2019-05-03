import { h, RenderableProps, Component } from "preact";

export interface HydrationDataDescriptor<P> {
  [key: string]: ComponentDataDescriptor<P>;
}

export interface ComponentDataDescriptor<P> {
  name: string;
  props: RenderableProps<P>;
}

export default class HydrationData extends Component {
  private static nexHid: number = 0;
  private static data: HydrationDataDescriptor<{}> = {};

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
