// vite.config.mjs
import path from "path";
import { defineConfig } from "file:///D:/React-template/node_modules/vite/dist/node/index.js";
import react from "file:///D:/React-template/node_modules/@vitejs/plugin-react/dist/index.mjs";
import jsconfigPaths from "file:///D:/React-template/node_modules/vite-jsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), jsconfigPaths()],
  // https://github.com/jpuri/react-draft-wysiwyg/issues/1317
  base: "/",
  // accessing env variable is not possible here. So hard coding this.
  define: {
    global: "window"
  },
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), "node_modules/$1")
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), "src/$1")
      }
    ]
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3e3
  },
  preview: {
    // this ensures that the browser opens upon preview start
    open: true,
    // this sets a default port to 3000
    port: 3e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcUmVhY3QtdGVtcGxhdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFJlYWN0LXRlbXBsYXRlXFxcXHZpdGUuY29uZmlnLm1qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovUmVhY3QtdGVtcGxhdGUvdml0ZS5jb25maWcubWpzXCI7Ly8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlL2Rpc2N1c3Npb25zLzM0NDhcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGpzY29uZmlnUGF0aHMgZnJvbSAndml0ZS1qc2NvbmZpZy1wYXRocyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIGpzY29uZmlnUGF0aHMoKV0sXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcHVyaS9yZWFjdC1kcmFmdC13eXNpd3lnL2lzc3Vlcy8xMzE3XG4gIGJhc2U6ICcvJywgLy8gYWNjZXNzaW5nIGVudiB2YXJpYWJsZSBpcyBub3QgcG9zc2libGUgaGVyZS4gU28gaGFyZCBjb2RpbmcgdGhpcy5cbiAgZGVmaW5lOiB7XG4gICAgZ2xvYmFsOiAnd2luZG93J1xuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIHtcbiAgICAgICAgZmluZDogL15+KC4rKS8sXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ25vZGVfbW9kdWxlcy8kMScpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAvXnNyYyguKykvLFxuICAgICAgICByZXBsYWNlbWVudDogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdzcmMvJDEnKVxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgLy8gdGhpcyBlbnN1cmVzIHRoYXQgdGhlIGJyb3dzZXIgb3BlbnMgdXBvbiBzZXJ2ZXIgc3RhcnRcbiAgICBvcGVuOiB0cnVlLFxuICAgIC8vIHRoaXMgc2V0cyBhIGRlZmF1bHQgcG9ydCB0byAzMDAwXG4gICAgcG9ydDogMzAwMFxuICB9LFxuICBwcmV2aWV3OiB7XG4gICAgLy8gdGhpcyBlbnN1cmVzIHRoYXQgdGhlIGJyb3dzZXIgb3BlbnMgdXBvbiBwcmV2aWV3IHN0YXJ0XG4gICAgb3BlbjogdHJ1ZSxcbiAgICAvLyB0aGlzIHNldHMgYSBkZWZhdWx0IHBvcnQgdG8gMzAwMFxuICAgIHBvcnQ6IDMwMDBcbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUkxQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztBQUFBO0FBQUEsRUFFbEMsTUFBTTtBQUFBO0FBQUEsRUFDTixRQUFRO0FBQUEsSUFDTixRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsS0FBSyxLQUFLLFFBQVEsSUFBSSxHQUFHLGlCQUFpQjtBQUFBLE1BQ3pEO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLEtBQUssUUFBUSxJQUFJLEdBQUcsUUFBUTtBQUFBLE1BQ2hEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQTtBQUFBLElBRU4sTUFBTTtBQUFBO0FBQUEsSUFFTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBO0FBQUEsSUFFUCxNQUFNO0FBQUE7QUFBQSxJQUVOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
