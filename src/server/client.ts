import express from "express";

export default () => {
  const app = express();
  const port = 3000;

  app.use(express.static("public"));

  app.listen(port, () => console.log(`Client listening on port ${port}!`));
  return app;
};
