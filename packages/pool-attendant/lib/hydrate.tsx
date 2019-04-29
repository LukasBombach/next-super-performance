import * as React from "react";
import HydrationData from "./hydrationData";
import NameError from "./nameError";

function storeProps(props: any): string {
  return "";
}

const hydrate = (Component: React.ComponentType<any>) => (props: any) => {
  const hid = storeProps(props);
  return (
    <>
      <script type="application/hydration-marker" data-hid={hid} />
      <Component {...props} />
      );
    </>
  );
};

/* const HydrationData: React.SFC<{}> = () => (
  <script type="application/hydration-data" />
);
 */

export default hydrate;

/* 
const hydrate = <P extends object>(Component: React.ComponentType<P>) => {
  const compName = Component.displayName || Component.name;
  const hid = HydrationData.getNextHydrationId();

  if (!compName) throw new NameError();

  return class HydratedComponent extends React.Component<P> {
    static displayName = `hydrated(${compName})`;

    constructor(props: P) {
      super(props);
      hydrationData[hid] = { name: compName, props };
    }

    render() {
      return (
        <>
          <script type="application/hydration-marker" data-hid={hid} />
          <Component {...this.props as P} />
          );
        </>
      );
    }
  };
};

export default hydrate;
 */
