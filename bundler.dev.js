const Bundler = require("parcel-bundler");
const Path = require("path");
const { spawn } = require("child_process");

(async () => {
  const clientBundler = new Bundler(
    [Path.join(__dirname, "./src/client/index.html")],
    {
      outDir: "./public",
      // publicUrl: "/my-host/",
      watch: true,
      minify: false
    }
  );
  const serverBundler = new Bundler(
    [Path.join(__dirname, "./src/server/index.ts")],
    {
      outDir: "./dist",
      target: "node",
      watch: true,
      minify: false
    }
  );

  const gracefullyEndProcess = childProcesses => () => {
    childProcesses.forEach(child => {
      child.kill();
      console.log("killing process");
    });
    console.log("killed all processes");
    process.exit();
  };

  serverBundler.on("buildEnd", () => {
    const childProcesses = [];
    childProcesses.push(spawn("node", ["dist/index.js"]));
    childProcesses.forEach(child => {
      child.stdout.on("data", data => {
        console.log(data.toString());
      });
    });
    console.log("server stuff ended");
    process.on("exit", gracefullyEndProcess(childProcesses));
    process.on("SIGINT", gracefullyEndProcess(childProcesses)); // catch ctrl-c
    process.on("SIGTERM", gracefullyEndProcess(childProcesses)); // catch kill
  });
  clientBundler.on("buildEnd", () => {
    console.log("client stuff ended");
  });

  const bundleClient = await clientBundler.bundle();
  const bundleServer = await serverBundler.bundle();
})();
