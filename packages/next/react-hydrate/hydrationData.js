import * as React from "react";

export default class HydrationData extends React.Component {
  static nexHid = 0;
  static data = {};

  static storeProps(name, props) {
    const hid = (++HydrationData.nexHid).toString();
    HydrationData.data[hid] = { name, props };
    return hid;
  }

  static flushHydrationData() {
    const serializedHydrationData = JSON.stringify(HydrationData.data);
    HydrationData.nexHid = 0;
    HydrationData.data = {};
    return serializedHydrationData;
  }

  render() {
    return (
      <script
        type="application/hydration-data"
        dangerouslySetInnerHTML={{ __html: HydrationData.flushHydrationData() }}
      />
    );
  }
}
