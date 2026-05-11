import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    // mupdf-wasm uses top-level await (TLA); the default Vite/esbuild
    // target (chrome87/firefox78/safari14) predates TLA support, so bump
    // build & dev to the first versions that ship it.
    build: {
      target: ['chrome89', 'firefox89', 'safari15', 'edge89'],
    },
    optimizeDeps: {
      // mupdf has top-level await and imports Node-only modules (node:fs,
      // module) that get externalised in browsers. Pre-bundling chokes on
      // both; serve it as-is and let the native ESM loader handle TLA.
      exclude: ['mupdf'],
      esbuildOptions: {
        target: 'es2022',
      },
    },
  };
});
