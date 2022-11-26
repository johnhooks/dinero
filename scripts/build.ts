import { build } from "https://deno.land/x/esbuild@v0.15.15/mod.js";

const start = performance.now();

await Promise.all([
  build({
    entryPoints: ["./mod.ts"],
    outfile: "dist/cjs/dinero.cjs",
    format: "cjs",
    write: true,
    bundle: true,
  }),
  build({
    entryPoints: ["./currencies.ts"],
    outfile: "dist/cjs/currencies.cjs",
    format: "cjs",
    write: true,
    bundle: true,
  }),
]);

console.log("Building CommonJS modules");
console.log(`⚡ Done in ${performance.now() - start}ms`);

Deno.exit(0);
