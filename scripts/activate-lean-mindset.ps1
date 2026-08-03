# Activate Lean Mindset session — this workspace only.
# Logs out forbidden GitHub CLI accounts and verifies lean-mindset remote.
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

function Get-GhStatusText {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  $text = (gh auth status 2>&1 | Out-String)
  $ErrorActionPreference = $prev
  return $text
}

$remote = "https://github.com/LeanMindsetLabs/lean-mindset.git"
$forbidden = @("ComeAround-io")
$ownerEmail = "LeanMindsetLabs@gmail.com"

Write-Host "=== Lean Mindset credential session ===" -ForegroundColor Cyan

if ((git config --get remote.origin.url) -ne $remote) {
  Write-Error "Wrong git remote. Expected: $remote"
}

git config --local user.name "Lean Mindset Labs" | Out-Null
git config --local user.email $ownerEmail | Out-Null
Write-Host "Git identity (repo-local): Lean Mindset Labs <$ownerEmail>"

$status = Get-GhStatusText
foreach ($bad in $forbidden) {
  if ($status -match [regex]::Escape($bad)) {
    Write-Host "Logging out forbidden GitHub account: $bad" -ForegroundColor Yellow
    gh auth logout -u $bad -h github.com 2>&1 | Out-Host
  }
}

$statusAfter = Get-GhStatusText
if ($statusAfter -match "not logged in" -or $statusAfter -notmatch "Logged in") {
  Write-Host ""
  Write-Host "No GitHub account active. Log in with Lean Mindset only:" -ForegroundColor Yellow
  Write-Host "  gh auth login"
  Write-Host "  -> GitHub.com, HTTPS, browser, Google SSO as $ownerEmail"
  Write-Host "  gh api user -q .login"
  Write-Host "  -> add to .env.local as LEAN_MINDSET_GITHUB_CLI_USER=<username>"
  exit 1
}

$active = $null
if ($statusAfter -match "Logged in to github.com account (\S+)") {
  $active = $Matches[1]
}
if ($active -in $forbidden) {
  Write-Error "Forbidden account still active: $active"
}

Write-Host "Active GitHub CLI account: $active" -ForegroundColor Green
Write-Host "Lean Mindset session ready. Other product credentials should not be used here."
