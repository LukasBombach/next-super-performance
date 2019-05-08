require("next-super-performance/lib/alias")();
const { createServer } = require("http");
const next = require("next");

const app = next({ dev: process.env.NODE_ENV !== "production" });
const port = process.env.PORT || 3000;
const requestHandler = app.getRequestHandler();

app.prepare().then(() => {
  createServer(requestHandler).listen(port, () => {
    console.log(`> Custom server ready on http://localhost:${port}`);
  });
});
