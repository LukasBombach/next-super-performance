import * as React from "react";
import HydrationData from "./hydrationData";
import name from "./getComponentName";

export default <P extends object>(Component: React.Component<P>) => (
  props: React.Props<P>
) => {
  const compName = name(Component);
  const hid = HydrationData.storeProps(compName, props);
  const Wrapper = props.wrapper || "div";

  return (
    <Wrapper data-hid={hid}>
      <Component {...props} />
    </Wrapper>
  );
};
