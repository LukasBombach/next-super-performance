import { h, ComponentType, RenderableProps } from "preact";
import HydrationData from "./hydrationData";
import name from "./getComponentName";

export default <P extends RenderableProps<{}>>(Component: ComponentType<P>) => (
  props: P
) => {
  const compName = name(Component);
  const hid = HydrationData.storeProps(compName, props);
  return [
    <script type="application/hydration-marker" data-hid={hid} />,
    <Component {...props} />
  ];
};
