import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  https: true,
  server: {
    port: 3000,
    allowedHosts: [
      'y9p1zt-ip-191-95-150-129.tunnelmole.net'
    ]
  },
});
