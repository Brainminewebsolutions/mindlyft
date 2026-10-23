<#
.SYNOPSIS
  Builds the production frontend (Next.js standalone for IISNode on Simply/Site4Now) and zips it.

.DESCRIPTION
  1. npm ci                       (skip with -SkipInstall)
  2. type-check + lint            (skip with -SkipChecks)
  3. next build                   uses .env.production; postbuild.js installs the IISNode server.js
  4. copy .next/static and public into .next/standalone
  5. zip .next/standalone into release/ (skip with -NoZip)

  The contents of .next/standalone (or the zip) are what gets uploaded to the site root.

.EXAMPLE
  npm run build:prod
  powershell -ExecutionPolicy Bypass -File scripts/build-production.ps1 -SkipInstall -SkipChecks
#>
param(
  [switch]$SkipInstall,
  [switch]$SkipChecks,
  [switch]$NoZip
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Step($text) { Write-Host "`n==> $text" -ForegroundColor Cyan }
function Fail($text) { Write-Host "`nBUILD FAILED: $text" -ForegroundColor Red; exit 1 }
function Run($cmd) {
  Write-Host "    > $cmd" -ForegroundColor DarkGray
  cmd /c $cmd
  if ($LASTEXITCODE -ne 0) { Fail "'$cmd' exited with code $LASTEXITCODE" }
}

$started = Get-Date

# ── Pre-flight ────────────────────────────────────────────────────────────────
Step "Pre-flight checks"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Fail "Node.js is not installed or not on PATH." }
Write-Host "    Node $(node --version), npm $(npm --version)"

if (-not (Test-Path ".env.production")) { Fail ".env.production is missing - the build would point at the wrong API." }

# .env.local overrides .env.production during `next build`, which would ship dev settings
foreach ($f in @(".env.local", ".env.production.local")) {
  if (Test-Path $f) { Fail "$f exists and would override .env.production. Rename it before building for production." }
}

# Show which API this build will talk to (URLs only, no secrets)
Get-Content ".env.production" |
  Where-Object { $_ -match '^\s*(NEXT_PUBLIC_DOTNET_API_URL|DOTNET_API_URL|NEXT_PUBLIC_APP_URL)\s*=' } |
  ForEach-Object { Write-Host "    $($_.Trim())" }

# ── Install ───────────────────────────────────────────────────────────────────
if (-not $SkipInstall) {
  Step "Installing dependencies (npm ci)"
  Write-Host "    > npm ci" -ForegroundColor DarkGray
  cmd /c "npm ci"
  if ($LASTEXITCODE -ne 0) {
    Fail ("npm ci failed. If it says package.json and package-lock.json are out of sync, run 'npm install' " +
          "once to refresh the lock file, commit package-lock.json, then run this script again.")
  }
}

# ── Quality gate ──────────────────────────────────────────────────────────────
if (-not $SkipChecks) {
  Step "Type-check"
  Run "npm run typecheck"
  Step "Lint"
  Run "npm run lint"
}

# ── Build ─────────────────────────────────────────────────────────────────────
Step "Building (next build + postbuild)"
if (Test-Path ".next") { Remove-Item ".next" -Recurse -Force }

$env:NODE_ENV = "production"
$env:NEXT_TELEMETRY_DISABLED = "1"
Run "npm run build"   # npm runs postbuild.js automatically afterwards

$standalone = Join-Path $root ".next\standalone"
$serverJs   = Join-Path $standalone "server.js"
if (-not (Test-Path $serverJs)) { Fail ".next/standalone/server.js was not produced. Is output: 'standalone' still set in next.config.ts?" }
if (-not (Select-String -Path $serverJs -Pattern "__NEXT_PRIVATE_STANDALONE_CONFIG" -Quiet)) {
  Fail "server.js is missing __NEXT_PRIVATE_STANDALONE_CONFIG - postbuild.js did not run. IISNode would crash on start."
}

# ── Assemble standalone folder ────────────────────────────────────────────────
Step "Copying static assets into the standalone folder"
$staticDest = Join-Path $standalone ".next\static"
New-Item -ItemType Directory -Force $staticDest | Out-Null
Copy-Item ".next\static\*" $staticDest -Recurse -Force

if (Test-Path "public") {
  $publicDest = Join-Path $standalone "public"
  New-Item -ItemType Directory -Force $publicDest | Out-Null
  Copy-Item "public\*" $publicDest -Recurse -Force
}

# web.config lives on the server already; ship it too if one is kept in the repo
if (Test-Path "web.config") {
  Copy-Item "web.config" $standalone -Force
  Write-Host "    web.config included"
} else {
  Write-Host "    No web.config in the project - the one already on the server will be used." -ForegroundColor Yellow
}

$sizeMb = [math]::Round(((Get-ChildItem $standalone -Recurse -File | Measure-Object Length -Sum).Sum / 1MB), 1)
Write-Host "    Standalone folder: $sizeMb MB"

# ── Zip ───────────────────────────────────────────────────────────────────────
$zipPath = $null
if (-not $NoZip) {
  Step "Creating release zip"
  $releaseDir = Join-Path $root "release"
  New-Item -ItemType Directory -Force $releaseDir | Out-Null
  $zipPath = Join-Path $releaseDir ("mindlyftai-frontend-{0}.zip" -f (Get-Date -Format "yyyyMMdd-HHmm"))
  if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

  # Windows' built-in tar writes proper zips much faster than Compress-Archive
  if (Get-Command tar.exe -ErrorAction SilentlyContinue) {
    tar.exe -a -c -f $zipPath -C $standalone .
    if ($LASTEXITCODE -ne 0) { Fail "tar could not create the zip." }
  } else {
    Compress-Archive -Path (Join-Path $standalone "*") -DestinationPath $zipPath
  }
  $zipMb = [math]::Round((Get-Item $zipPath).Length / 1MB, 1)
  Write-Host "    $zipPath ($zipMb MB)"
}

# ── Done ──────────────────────────────────────────────────────────────────────
$elapsed = [math]::Round(((Get-Date) - $started).TotalMinutes, 1)
Write-Host "`nProduction build ready in $elapsed min." -ForegroundColor Green
Write-Host "  Upload the CONTENTS of: $standalone"
if ($zipPath) { Write-Host "  or extract this zip into the site root: $zipPath" }
Write-Host "  Test locally first:     node .next\standalone\server.js   (then open http://localhost:3000)"
