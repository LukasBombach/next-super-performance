import * as React from "react";
import HydrationData from "./hydrationData";

interface HydrateProps extends React.HTMLAttributes<{}> {
  tag: string;
}

const Hydrate: React.FunctionComponent<HydrateProps> = ({
  tag = "div",
  children,
  ...attrs
}) => {
  const hid = HydrationData.storePropsFromChildren(
    React.Children.toArray(children)
  );
  return React.createElement(tag, { "data-hid": hid, ...attrs }, children);
};

export default Hydrate;
