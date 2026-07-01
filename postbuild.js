'use strict';
const fs = require('fs');

const generated = fs.readFileSync('.next/standalone/server.js', 'utf8');

// Next.js embeds: const nextConfig = {...single-line-json...}
const match = generated.match(/const nextConfig = (\{[^\n]+\})/);
if (!match) {
  throw new Error('postbuild: could not find nextConfig in generated server.js');
}

const configJson = match[1];
// Prepend the env-var assignment so that config.js sees it before requiring
// any Next.js modules, which causes loadWebpackHook() errors to be swallowed
// rather than propagated (see next/dist/server/config.js).
const header = `'use strict';\nconst nextConfig = ${configJson};\nprocess.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig);\n\n`;

const iisServer = fs.readFileSync('iisnode-server.js', 'utf8').replace(/^'use strict'\n/, '');
fs.writeFileSync('.next/standalone/server.js', header + iisServer);

console.log('postbuild: server.js installed with embedded standalone config');
