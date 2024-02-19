import * as esbuild from "esbuild";

console.log(
  await esbuild
    .build({
      entryPoints: ["source/**/*.ts"],
      bundle: true,
      platform: "node",
      target: ["node10.4"],
      outdir: "lib",
      minify: true,
      sourcemap: true,
      format: "cjs",
      conditions: ["production"],
      metafile: true,
      legalComments: "linked",
      banner: {
        js: "/* my banner */",
      },
    })
    .then(() => "Build complete")
    .catch(() => "Build failed"),
);
