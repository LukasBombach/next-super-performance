import Header from "../components/header";
import Body from "../components/body";
import { HydrationData } from "next-super-performance/hydration";

// console.log(HydrationData.toString());

/**
<HydrationData />
 */

export default function Home() {
  console.log(typeof HydrationData);
  console.log(HydrationData);
  console.log(HydrationData.prototype.render.toString());
  console.log(<HydrationData />);
  return (
    <section>
      <style jsx>{`
        section {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }
      `}</style>
      <Header heroSpan="1 / 4" />
      <Body />
      <HydrationData />
    </section>
  );
}
