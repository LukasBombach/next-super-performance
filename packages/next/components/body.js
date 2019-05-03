import Teaser from "./teaser";
//import { withHydration } from "next-super-performance/hydration";
// const HydratedTeaser = withHydration(Teaser);
// <HydratedTeaser column={2} />
// <HydratedTeaser column={3} />

export default function Body() {
  return (
    <main id="main-container">
      <style jsx>{`
        main {
          display: grid;
          grid-gap: 2%;
          grid-template-columns: 32% 32% 32%;
          color: #444;
          padding: 10px;
        }
      `}</style>

      <Teaser column={1} />
      <Teaser column={2} />
      <Teaser column={3} />

      <Teaser column={1} />
      <Teaser column={2} />
      <Teaser column={3} />

      <Teaser column={1} />
      <Teaser column={2} />
      <Teaser column={3} />

      <Teaser column={1} />
      <Teaser column={2} />
      <Teaser column={3} />

      <Teaser column={1} />
      <Teaser column={2} />
      <Teaser column={3} />

      <Teaser column={1} />
      <Teaser column={2} />
      <Teaser column={3} />

      <Teaser column={1} />
      <Teaser column={2} />
      <Teaser column={3} />
    </main>
  );
}
