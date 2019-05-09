import { h, ComponentType, RenderableProps, Fragment } from "preact";
import HydrationData from "./hydrationData";

export default <P extends RenderableProps<{}>>(Component: ComponentType<P>) => (
  props: P
) => {
  const hid = HydrationData.storeProps(Component, props);
  return (
    <Fragment>
      <script type="application/hydration-marker" data-hid={hid} />
      <Component {...props} />
    </Fragment>
  );
};
