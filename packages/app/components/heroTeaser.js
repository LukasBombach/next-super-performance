export default function HeroTeaser({ span = "1 / 1" }) {
  return (
    <article>
      <style jsx>{`
        article {
          grid-column: ${span};
          display: grid;
          grid-gap: 2%;
          grid-template-columns: 32% 32% 32%;
          background-color: #edece8;
          color: #444;
          padding: 10px;
        }
        img {
          grid-column: 1 / 3;
          width: 100%;
        }
        a {
          grid-column: 3 / 3;
        }
      `}</style>
      <img
        src="https://www.welt.de/img/wirtschaft/mobile187766748/1961627017-ci23x11-w697/Weltwirtschaftsforum-in-Davos.jpg"
        alt="Weltwirtschaftsforum in Davos"
      />
      <a>
        <h1>Fermentum Amet Aenean</h1>
        <p>
          Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
      </a>
    </article>
  );
}
