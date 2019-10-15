const Bundler = require("parcel-bundler");
const Path = require("path");
const { spawn } = require("child_process");

(async () => {
  const clientBundler = new Bundler(
    [Path.join(__dirname, "./src/client/index.html")],
    {
      outDir: "./public",
      // publicUrl: "/my-host/",
      watch: false,
      minify: true
    }
  );
  const serverBundler = new Bundler(
    [Path.join(__dirname, "./src/server/index.ts")],
    {
      outDir: "./dist",
      target: "node",
      watch: false,
      minify: true
    }
  );

  const bundleClient = await clientBundler.bundle();
  const bundleServer = await serverBundler.bundle();
})();
