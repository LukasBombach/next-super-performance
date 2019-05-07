const { Component } = require("preact");
const preactCompat = require("preact/compat");

class Suspense extends Component {
  componentDidCatch(e) {
    if (e && e.then) {
      e.then(() => {
        this.setState({});
      });
      throw e;
    }
  }
  render(p) {
    console.log(JSON.stringify(p));
    return p.children;
  }
}

preactCompat.Suspense = Suspense;
module.exports = preactCompat;
