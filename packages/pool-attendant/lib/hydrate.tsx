import * as React from "react";
import NameError from "./nameError";
import { storeProps } from "./hydrationData";

export default <P extends object>(Component: React.ComponentType<P>) => (
  props: P
) => {
  const compName = Component.displayName || Component.name;
  if (!compName) throw new NameError();
  const hid = storeProps(compName, props);

  return (
    <>
      <script type="application/hydration-marker" data-hid={hid} />
      <Component {...props} />
    </>
  );
};
