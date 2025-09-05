import { readFileSync } from "fs";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "pulumi-pretty": resolve(__dirname, "../src"),
    },
  },
  server: {
    proxy: {
      "/preview.json": {
        target: "localhost",
        bypass: (_, res) => {
          res?.writeHead(200, { "Content-Type": "application/json" });
          res?.write(
            readFileSync(resolve(__dirname, "../local/preview.json")).toString(
              "utf-8"
            )
          );
          res?.end();
        },
      },
    },
  },
});
