'use strict'
// IISNode-compatible Next.js standalone server.
// postbuild.js prepends: const nextConfig = {...}; process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig);
// That env-var must be set before requiring Next.js so config.js silently skips
// loadWebpackHook() failures (webpack is not in the standalone trace).
const http = require('http')
const net = require('net')
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

// The SignalR chat hub is mapped at the .NET API root ("/hubs/chat"), not
// under "/api". The site runs https in production while the API is still
// plain http, so the browser can't connect to it directly (mixed-content
// block on both the negotiate XHR and the ws:// upgrade). Requests under
// "/hubs/" are proxied here — straight to the .NET backend, not to the local
// Next.js instance — including the raw WebSocket upgrade.
let hubBackend = null
try {
  const origin = (process.env.DOTNET_API_URL || '').replace(/\/api\/?$/, '')
  if (origin) hubBackend = new URL(origin)
} catch {
  hubBackend = null
}

function isHubRequest(url) {
  return hubBackend && typeof url === 'string' && url.startsWith('/hubs/')
}

function proxyHubRequest(req, res) {
  const proxyReq = http.request(
    {
      hostname: hubBackend.hostname,
      port: hubBackend.port || 80,
      path: req.url,
      method: req.method,
      headers: { ...req.headers, host: hubBackend.host },
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers)
      proxyRes.pipe(res, { end: true })
    }
  )
  proxyReq.on('error', (err) => {
    console.error('Hub proxy error:', err.message)
    if (!res.headersSent) res.writeHead(502)
    res.end()
  })
  req.pipe(proxyReq, { end: true })
}

function proxyHubUpgrade(req, clientSocket, head) {
  const upstream = net.connect(hubBackend.port || 80, hubBackend.hostname, () => {
    const headers = { ...req.headers, host: hubBackend.host }
    let raw = `${req.method} ${req.url} HTTP/1.1\r\n`
    for (const [key, value] of Object.entries(headers)) {
      raw += `${key}: ${value}\r\n`
    }
    raw += '\r\n'
    upstream.write(raw)
    if (head && head.length) upstream.write(head)
    upstream.pipe(clientSocket)
    clientSocket.pipe(upstream)
  })
  upstream.on('error', (err) => {
    console.error('Hub upgrade proxy error:', err.message)
    clientSocket.destroy()
  })
  clientSocket.on('error', () => upstream.destroy())
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
      if (isHubRequest(req.url)) return proxyHubRequest(req, res)

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

    proxy.on('upgrade', (req, clientSocket, head) => {
      if (isHubRequest(req.url)) return proxyHubUpgrade(req, clientSocket, head)
      clientSocket.destroy()
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
