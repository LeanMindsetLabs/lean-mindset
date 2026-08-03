# Push lean-mindset — Lean Mindset GitHub account only (no other products).
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

& (Join-Path $PSScriptRoot "activate-lean-mindset.ps1")
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$envFile = Join-Path $PWD ".env.local"
if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*([A-Z0-9_]+)=(.*)$') {
      Set-Item -Path "env:$($Matches[1])" -Value $Matches[2].Trim('"')
    }
  }
}

$targetUser = $env:LEAN_MINDSET_GITHUB_CLI_USER
$status = gh auth status 2>&1 | Out-String
if (-not $targetUser -and $status -match "Logged in to github.com account (\S+)") {
  $targetUser = $Matches[1]
}
if ($targetUser -eq "ComeAround-io") {
  Write-Error "Forbidden account. Run: npm run activate:lean-mindset"
}

if ($targetUser) {
  gh auth switch -u $targetUser 2>&1 | Out-Null
}

Write-Host "Pushing to LeanMindsetLabs/lean-mindset..." -ForegroundColor Cyan
git push origin HEAD
exit $LASTEXITCODE
