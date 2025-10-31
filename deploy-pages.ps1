# deploy-pages.ps1
# PowerShell helper to deploy this folder to GitHub Pages (main branch)
# Usage: Open PowerShell, cd to this folder, and run: .\deploy-pages.ps1

Set-Location -Path "C:\Users\pc\Desktop\my_portfolio11"

Write-Host "Running deploy-pages.ps1 in $(Get-Location)"

# 1) Ensure git is available
try {
    git --version > $null 2>&1
} catch {
    Write-Error "Git does not appear to be installed or not on PATH. Install Git for Windows: https://git-scm.com/download/win"
    exit 1
}

# 2) Initialize repo if needed
if (-not (Test-Path ".git")) {
    git init
    Write-Host "Initialized a new git repository."
} else {
    Write-Host "Repository already initialized."
}

# 3) Set local repo user (won't override global config)
git config user.name "Karthik Reddy"
git config user.email "karthikreddyannapureddy@gmail.com"

# 4) Stage and commit changes
git add --all
# Commit safely: if there is nothing to commit, git commit will exit non-zero
$commitOutput = git commit -m "Initial commit for GitHub Pages" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "No new changes to commit or commit failed. Message:"
    Write-Host $commitOutput
} else {
    Write-Host "Committed changes."
}

# 5) Ensure branch is 'main'
git branch -M main

# 6) Add remote (remove and re-add to be safe)
$remoteUrl = "https://github.com/karthikreddyannapureddy-hub/myportfolio.git"
# Remove existing origin if present
git remote remove origin 2>$null

git remote add origin $remoteUrl
Write-Host "Remote 'origin' set to $remoteUrl"

# 7) Push to GitHub (will prompt for credentials or PAT if required)
Write-Host "Attempting to push to origin/main (you may be prompted for credentials or a PAT)..."

# Attempt push
git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Warning "Push failed. Common causes: the remote repository doesn't exist, or authentication is required."
    Write-Host "If authentication is required, create a Personal Access Token (PAT) at: https://github.com/settings/tokens (grant 'repo' scope) and use it as your password for HTTPS pushes."
    Write-Host "Or set up SSH keys and use the SSH remote URL instead."
    exit 1
} else {
    Write-Host "Push succeeded. If using GitHub Pages, go to your repository Settings → Pages and enable Pages from the 'main' branch (root)."
}
