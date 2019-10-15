import express from "express";

export default ({ port }) => {
  const server = express()
    .use(express.static("public"))
    .listen(port, () => console.log(`Listening on ${PORT}`));

  return server;
};
