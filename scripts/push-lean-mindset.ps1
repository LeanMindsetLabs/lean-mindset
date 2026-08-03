# Push lean-mindset only — temporarily switch gh to the Lean Mindset GitHub user, then restore prior account.
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

$remote = "https://github.com/LeanMindsetLabs/lean-mindset.git"

if ((git config --get remote.origin.url) -ne $remote) {
  Write-Error "Wrong repo. Run from Lean Mindset web/ (remote must be $remote)."
}

# Load optional LEAN_MINDSET_GITHUB_CLI_USER from .env.local (gitignored)
$envFile = Join-Path $PWD ".env.local"
if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*([A-Z0-9_]+)=(.*)$') {
      Set-Item -Path "env:$($Matches[1])" -Value $Matches[2].Trim('"')
    }
  }
}

$targetUser = $env:LEAN_MINDSET_GITHUB_CLI_USER
if (-not $targetUser) {
  Write-Error "Set LEAN_MINDSET_GITHUB_CLI_USER in .env.local (run: gh auth login with LeanMindsetLabs Google, then gh api user -q .login)."
}

$prevUser = $null
$status = gh auth status 2>&1 | Out-String
if ($status -match "Logged in to github.com account (\S+)") {
  $prevUser = $Matches[1]
}

Write-Host "Switching GitHub CLI to $targetUser for this push only..."
gh auth switch -u $targetUser 2>&1 | Out-Host
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "LeanMindsetLabs is not logged in yet. Run once (does not remove other accounts):"
  Write-Host "  gh auth login"
  Write-Host "  -> GitHub.com, HTTPS, browser, Google SSO as LeanMindsetLabs@gmail.com"
  Write-Host "  gh api user -q .login   # paste result into .env.local as LEAN_MINDSET_GITHUB_CLI_USER"
  exit 1
}

git push origin HEAD
$pushExit = $LASTEXITCODE

if ($prevUser -and $prevUser -ne $targetUser) {
  Write-Host "Restoring GitHub CLI account: $prevUser"
  gh auth switch -u $prevUser 2>&1 | Out-Null
}

exit $pushExit
