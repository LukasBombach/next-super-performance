import Header from "../components/header";
import Body from "../components/body";
import { HydrationData } from "next-super-performance/hydration";

console.log(HydrationData);

export default function Home() {
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
