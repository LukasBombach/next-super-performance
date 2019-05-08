import HeroTeaser from "./heroTeaser";
import Teaser from "./teaser";

export default function Header({ heroSpan = "1 / 4" }) {
  return (
    <header>
      <style jsx>{`
        header {
          display: grid;
          grid-gap: 2%;
          grid-template-columns: 32% 32% 32%;
          background-color: #edece8;
          color: #444;
          padding: 10px;
        }
      `}</style>
      <HeroTeaser span={heroSpan} />
      <Teaser column={1} />
      <Teaser column={2} />
      <Teaser column={3} />
    </header>
  );
}
