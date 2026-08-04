# Configure Vercel + Supabase for www.leanmindset.app (Lean Mindset only).
# Requires in web/.env.local (gitignored):
#   SUPABASE_ACCESS_TOKEN=sbp_...   (Account → Access Tokens)
#   VERCEL_TOKEN=...                (Vercel → Account → Tokens, LeanMindsetLabs team)
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

$envFile = Join-Path $root ".env.local"
if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*([A-Z0-9_]+)=(.*)$') {
      Set-Item -Path "env:$($Matches[1])" -Value $Matches[2].Trim('"')
    }
  }
}

$siteUrl = "https://www.leanmindset.app"
$apex = "leanmindset.app"
$www = "www.leanmindset.app"
$vercelAlias = "https://leanmindset.vercel.app"
$supabaseRef = if ($env:LEAN_MINDSET_SUPABASE_REF) { $env:LEAN_MINDSET_SUPABASE_REF } else { "fdsccpcapzgzyxnuweit" }

$vercelProjectJson = Join-Path $root ".vercel/project.json"
if (-not (Test-Path $vercelProjectJson)) {
  Write-Error "Missing .vercel/project.json — run: npx vercel link --scope lean-mindset-labs --project leanmindset"
}
$vercelMeta = Get-Content $vercelProjectJson -Raw | ConvertFrom-Json
$teamId = $vercelMeta.orgId
$project = $vercelMeta.projectName

Write-Host "=== Lean Mindset production domain ===" -ForegroundColor Cyan
Write-Host "Site URL: $siteUrl"
Write-Host "Vercel: $project ($teamId)"

function Invoke-Json {
  param(
    [string]$Method,
    [string]$Uri,
    [hashtable]$Headers,
    [object]$Body = $null
  )
  $params = @{
    Method  = $Method
    Uri     = $Uri
    Headers = $Headers
  }
  if ($null -ne $Body) {
    $params.Body = ($Body | ConvertTo-Json -Depth 6)
    $params.Headers["Content-Type"] = "application/json"
  }
  return Invoke-RestMethod @params
}

# --- Supabase auth URLs ---
if (-not $env:SUPABASE_ACCESS_TOKEN) {
  Write-Host "SKIP Supabase: SUPABASE_ACCESS_TOKEN not set in .env.local" -ForegroundColor Yellow
} else {
  Write-Host "Updating Supabase auth URLs..." -ForegroundColor Cyan
  $sbHeaders = @{ Authorization = "Bearer $($env:SUPABASE_ACCESS_TOKEN)" }
  $uriList = @(
    "$siteUrl/**"
    "https://$apex/**"
    "$vercelAlias/**"
    "http://localhost:3000/**"
  ) -join ","
  $authBody = @{
    site_url       = $siteUrl
    uri_allow_list = $uriList
  }
  $authResult = Invoke-Json -Method Patch `
    -Uri "https://api.supabase.com/v1/projects/$supabaseRef/config/auth" `
    -Headers $sbHeaders -Body $authBody
  Write-Host "Supabase site_url: $($authResult.site_url)" -ForegroundColor Green
}

# --- Vercel ---
if (-not $env:VERCEL_TOKEN) {
  Write-Host ""
  Write-Host "BLOCKED Vercel: VERCEL_TOKEN not set." -ForegroundColor Yellow
  Write-Host "1. Log out wrong account: npx vercel logout"
  Write-Host "2. Create token at https://vercel.com/account/tokens (LeanMindsetLabs@gmail.com, scope: lean-mindset-labs)"
  Write-Host "3. Add VERCEL_TOKEN=... to web/.env.local"
  Write-Host "4. Re-run: npm run configure:domain"
  exit 1
}

$vHeaders = @{ Authorization = "Bearer $($env:VERCEL_TOKEN)" }
$teamQuery = "?teamId=$teamId"

Write-Host "Adding Vercel domains..." -ForegroundColor Cyan
foreach ($entry in @(
    @{ name = $www; redirect = $null }
    @{ name = $apex; redirect = $www }
  )) {
  $body = @{ name = $entry.name }
  if ($entry.redirect) {
    $body.redirect = "https://$($entry.redirect)"
    $body.redirectStatusCode = 308
  }
  try {
    $added = Invoke-Json -Method Post `
      -Uri "https://api.vercel.com/v10/projects/$project/domains$teamQuery" `
      -Headers $vHeaders -Body $body
    Write-Host "  + $($entry.name) (verified=$($added.verified))" -ForegroundColor Green
  } catch {
    $msg = $_.ErrorDetails.Message
    if ($msg -match "already exists|domain_already_in_use") {
      Write-Host "  = $($entry.name) already on project" -ForegroundColor DarkYellow
    } else {
      throw
    }
  }
}

Write-Host "Setting NEXT_PUBLIC_SITE_URL on Production + Preview..." -ForegroundColor Cyan
$envBody = @{
  key   = "NEXT_PUBLIC_SITE_URL"
  value = $siteUrl
  type  = "plain"
  target = @("production", "preview")
}
Invoke-Json -Method Post `
  -Uri "https://api.vercel.com/v10/projects/$project/env$teamQuery&upsert=true" `
  -Headers $vHeaders -Body $envBody | Out-Null
Write-Host "  NEXT_PUBLIC_SITE_URL=$siteUrl" -ForegroundColor Green

Write-Host "Triggering production redeploy..." -ForegroundColor Cyan
$deployBody = @{
  name    = $project
  target  = "production"
  gitSource = $null
}
try {
  $deploy = Invoke-Json -Method Post `
    -Uri "https://api.vercel.com/v13/deployments$teamQuery" `
    -Headers $vHeaders -Body @{
      name   = $project
      target = "production"
    }
  Write-Host "Deploy queued: $($deploy.url)" -ForegroundColor Green
} catch {
  Write-Host "Redeploy via API skipped — redeploy from Vercel dashboard after env save." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Done. Verify:" -ForegroundColor Cyan
Write-Host "  curl -I $siteUrl"
Write-Host "  curl -I https://$apex"
