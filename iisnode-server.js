'use strict'
// IISNode-compatible Next.js standalone server.
// Copied to .next/standalone/server.js automatically by the postbuild script.
//
// Why this exists:
//   Next.js generates server.js with `parseInt(process.env.PORT, 10) || 3000`.
//   IISNode sets PORT to a Windows named pipe (\\.\pipe\...), not a number.
//   parseInt of a pipe path returns NaN → fallback to 3000 → EADDRINUSE.
//   This file detects the named pipe and uses http.createServer directly.

const path = require('path')
const http  = require('http')

const dir = path.join(__dirname)

process.env.NODE_ENV = 'production'
process.chdir(__dirname)

// If PORT is a named pipe string (iisnode), keep it as-is.
// If PORT is a number string or undefined, parse it as TCP port.
const portEnv     = process.env.PORT
const currentPort = portEnv && isNaN(Number(portEnv))
  ? portEnv                          // named pipe from iisnode
  : (parseInt(portEnv, 10) || 3000)  // plain TCP port

const hostname = process.env.HOSTNAME || '0.0.0.0'

let keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10)
if (
  Number.isNaN(keepAliveTimeout) ||
  !Number.isFinite(keepAliveTimeout) ||
  keepAliveTimeout < 0
) {
  keepAliveTimeout = undefined
}

// Load config injected by Next.js build
const nextConfig = JSON.parse(process.env.__NEXT_PRIVATE_STANDALONE_CONFIG || '{}')

require('next')

if (typeof currentPort === 'string') {
  // ── iisnode named-pipe path ──────────────────────────────────────────────
  const next   = require('next')
  const app    = next({ dev: false, dir, conf: nextConfig })
  const handle = app.getRequestHandler()

  app.prepare().then(() => {
    const server = http.createServer((req, res) => handle(req, res))
    if (keepAliveTimeout !== undefined) server.keepAliveTimeout = keepAliveTimeout
    server.listen(currentPort, () => {
      console.log('> Ready on named pipe', currentPort)
    })
    server.on('error', (err) => { console.error(err); process.exit(1) })
  })
} else {
  // ── Direct TCP port ───────────────────────────────────────────────────────
  const { startServer } = require('next/dist/server/lib/start-server')
  startServer({
    dir,
    isDev: false,
    config: nextConfig,
    hostname,
    port: currentPort,
    allowRetry: false,
    keepAliveTimeout,
  }).catch((err) => { console.error(err); process.exit(1) })
}
