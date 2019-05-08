import { h, ComponentType, RenderableProps, Fragment } from "preact";
import HydrationData from "./hydrationData";
import name from "./getComponentName";

export default <P extends RenderableProps<{}>>(Component: ComponentType<P>) => (
  props: P
) => {
  const compName = name(Component);
  const hid = HydrationData.storeProps(compName, props);
  return (
    <Fragment>
      <script type="application/hydration-marker" data-hid={hid} />
      <Component {...props} />
    </Fragment>
  );
};
