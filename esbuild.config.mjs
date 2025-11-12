import esbuild from "esbuild";
import process from "node:process";

const isProd = process.argv.includes("production");
const isWatch = process.argv.includes("watch");

const ctx = await esbuild.context({
  entryPoints: ["src/main.ts"],
  outfile: "main.js",
  bundle: true,
  format: "cjs",
  platform: "browser",
  target: "es2018",
  sourcemap: isProd ? false : "inline",
  external: ["obsidian", "electron", "fs", "path", "os"],
  logLevel: "info"
});

if (isWatch) {
  await ctx.watch();
  console.log("Watching...");
} else {
  await ctx.rebuild();
  await ctx.dispose();
  console.log("Built.");
}