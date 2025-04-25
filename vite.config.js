import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cdn from "vite-plugin-cdn-import";

const cdnDomain = "jsdelivr.b-cdn.net";
export default defineConfig({
  plugins: [
    vue(),
    cdn({
      modules: [
        {
          name: "video.js",
          var: "videojs",
          path: `https://${cdnDomain}/npm/video.js@8/dist/video.min.js`
        },
        {
          name: "lodash",
          var: "_",
          path: `https://${cdnDomain}/npm/lodash@4/lodash.min.js`
        }
      ]
    }),
  ],
});
