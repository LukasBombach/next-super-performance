import * as React from "react";
import name from "./getComponentName";

export default Component => props => {
  const compName = name(Component);
  const hid = HydrationData.storeProps(compName, props);
  const Wrapper = props.wrapper || "div";

  return (
    <Wrapper data-hid={hid}>
      <Component {...props} />
    </Wrapper>
  );
};
