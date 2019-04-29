import React, { Component } from "react";

export default class Teaser extends Component {
  static defaultProps = {
    column: "1"
  };

  componentDidMount() {
    console.log("Lifecycle works: Teaser did mount");
  }

  render() {
    const { column } = this.props;
    return (
      <article
        onClick={() => console.log(`clicked on teaser with column`, column)}
      >
        <style jsx>{`
          article {
            grid-column: ${column} / ${column};
          }
        `}</style>
        <h1>Fermentum Amet Aenean</h1>
        <p onClick={() => console.log(`clicked on p with column`, column)}>
          Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
      </article>
    );
  }
}
