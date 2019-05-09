import { h, RenderableProps, Component, ComponentType } from "preact";
import { getComponentName } from "./util";

export interface HydrationDataDescriptor<P> {
  [key: string]: ComponentDataDescriptor<P>;
}

export interface ComponentDataDescriptor<P> {
  name: string;
  props: RenderableProps<P>;
}

export default class HydrationData extends Component {
  private static currentHid: number = 0;
  private static data: HydrationDataDescriptor<{}> = {};

  public static storeProps<P>(Component: ComponentType<P>, props: any): string {
    const name = getComponentName(Component);
    const hid = (++HydrationData.currentHid).toString();
    HydrationData.data[hid] = { name, props };
    return hid;
  }

  private static flushHydrationData(): string {
    const serializedHydrationData = JSON.stringify(HydrationData.data);
    HydrationData.currentHid = 0;
    HydrationData.data = {};
    return serializedHydrationData;
  }

  render() {
    const type = "application/hydration-data";
    const __html = HydrationData.flushHydrationData();
    return <script type={type} dangerouslySetInnerHTML={{ __html }} />;
  }
}
