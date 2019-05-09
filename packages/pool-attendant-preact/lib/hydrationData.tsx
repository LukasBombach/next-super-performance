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
    const hid = (++HydrationData.currentHid).toString();
    const name = getComponentName(Component);
    HydrationData.data[hid] = { name, props };
    return hid;
  }

  private static flushHydrationData(): string {
    const data = HydrationData.data;
    const replacer = HydrationData.stringifyReplacer;
    const serializedHydrationData = JSON.stringify(data, replacer);
    HydrationData.currentHid = 0;
    HydrationData.data = {};
    return serializedHydrationData;
  }

  private static stringifyReplacer(key: string, value: any): any {
    const propsToRemove = ["__source", "__self"];
    return propsToRemove.includes(key) ? undefined : value;
  }

  render() {
    const type = "application/hydration-data";
    const __html = HydrationData.flushHydrationData();
    return <script type={type} dangerouslySetInnerHTML={{ __html }} />;
  }
}
