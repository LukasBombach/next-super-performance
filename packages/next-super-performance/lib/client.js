import { h, render } from "preact";
import Teaser from "../../next/components/teaser";

const markers = [
  ...document.querySelectorAll('script[type="application/hydration-marker"]')
];

const data = JSON.parse(
  document.querySelector('script[type="application/hydration-data"]').innerHTML
);

for (const marker of markers) {
  const el = marker.nextElementSibling;
  const id = marker.getAttribute("data-hid");
  const props = data[id].props;
  render(<Teaser {...props} />, el.parentElement, el);
}

console.info(
  "%cPool Attendant:",
  "color: blue",
  `Hydrated ${markers.length} components`
);
