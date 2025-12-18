## npm install
## Verifica proxy (IMPORTANTE)
En vite.config.js debes tener algo así:
server: {
  proxy: {
    "/api": {
      target: "http://localhost:5050",
      changeOrigin: true,
    },
  },
},

## npm run dev
