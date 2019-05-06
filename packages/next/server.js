require("next-super-performance/lib/alias")();
const { createServer } = require("http");
const next = require("next");

const app = next({ dev: process.env.NODE_ENV !== "production" });
const port = process.env.PORT || 3000;
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(handle).listen(port, () => {
    console.log(`> [Server] Ready on http://localhost:${port}`);
  });
});
