'use strict'
// IISNode-compatible Next.js standalone server.
// postbuild.js prepends: const nextConfig = {...}; process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig);
// That env-var must be set before requiring Next.js so config.js silently skips
// loadWebpackHook() failures (webpack is not in the standalone trace).
const http = require('http')
const path = require('path')

process.env.NODE_ENV = 'production'
process.chdir(__dirname)

// nextConfig is declared by the prepended header from postbuild.js
const { startServer } = require('next/dist/server/lib/start-server')

const portEnv = process.env.PORT
const isNamedPipe = portEnv && isNaN(Number(portEnv))
const hostname = process.env.HOSTNAME || '0.0.0.0'

let keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10)
if (!Number.isFinite(keepAliveTimeout) || keepAliveTimeout < 0) {
  keepAliveTimeout = undefined
}

if (isNamedPipe) {
  // IISNode named-pipe path.
  // startServer cannot listen on Windows named pipes, so we start Next.js on
  // a pseudo-unique local TCP port and proxy the named pipe connection to it.
  const localPort = 49000 + (process.pid % 1000)

  startServer({
    dir: __dirname,
    isDev: false,
    config: nextConfig,
    hostname: '127.0.0.1',
    port: localPort,
    allowRetry: true,
    keepAliveTimeout,
  }).then(() => {
    const proxy = http.createServer((req, res) => {
      const proxyReq = http.request(
        {
          hostname: '127.0.0.1',
          port: localPort,
          path: req.url,
          method: req.method,
          headers: req.headers,
        },
        (proxyRes) => {
          res.writeHead(proxyRes.statusCode, proxyRes.headers)
          proxyRes.pipe(res, { end: true })
        }
      )
      proxyReq.on('error', (err) => {
        console.error('Proxy error:', err.message)
        if (!res.headersSent) res.writeHead(502)
        res.end()
      })
      req.pipe(proxyReq, { end: true })
    })

    proxy.listen(portEnv, () => {
      console.log('> Ready on named pipe', portEnv)
    })
    proxy.on('error', (err) => { console.error(err); process.exit(1) })
  }).catch((err) => { console.error(err); process.exit(1) })
} else {
  // Direct TCP port path.
  startServer({
    dir: __dirname,
    isDev: false,
    config: nextConfig,
    hostname,
    port: parseInt(portEnv, 10) || 3000,
    allowRetry: false,
    keepAliveTimeout,
  }).catch((err) => { console.error(err); process.exit(1) })
}
