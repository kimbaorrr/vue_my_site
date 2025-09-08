// vite.config.js
import { defineConfig } from "file:///D:/Web/my_site/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Web/my_site/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import cdn from "file:///D:/Web/my_site/node_modules/vite-plugin-cdn-import/dist/index.js";
var cdnDomain = "jsdelivr.b-cdn.net";
var vite_config_default = defineConfig({
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
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXZWJcXFxcbXlfc2l0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcV2ViXFxcXG15X3NpdGVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dlYi9teV9zaXRlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IGNkbiBmcm9tIFwidml0ZS1wbHVnaW4tY2RuLWltcG9ydFwiO1xuXG5jb25zdCBjZG5Eb21haW4gPSBcImpzZGVsaXZyLmItY2RuLm5ldFwiO1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIGNkbih7XG4gICAgICBtb2R1bGVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcInZpZGVvLmpzXCIsXG4gICAgICAgICAgdmFyOiBcInZpZGVvanNcIixcbiAgICAgICAgICBwYXRoOiBgaHR0cHM6Ly8ke2NkbkRvbWFpbn0vbnBtL3ZpZGVvLmpzQDgvZGlzdC92aWRlby5taW4uanNgXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcImxvZGFzaFwiLFxuICAgICAgICAgIHZhcjogXCJfXCIsXG4gICAgICAgICAgcGF0aDogYGh0dHBzOi8vJHtjZG5Eb21haW59L25wbS9sb2Rhc2hANC9sb2Rhc2gubWluLmpzYFxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSksXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa08sU0FBUyxvQkFBb0I7QUFDL1AsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sU0FBUztBQUVoQixJQUFNLFlBQVk7QUFDbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLE1BQ0YsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLEtBQUs7QUFBQSxVQUNMLE1BQU0sV0FBVyxTQUFTO0FBQUEsUUFDNUI7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixLQUFLO0FBQUEsVUFDTCxNQUFNLFdBQVcsU0FBUztBQUFBLFFBQzVCO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
