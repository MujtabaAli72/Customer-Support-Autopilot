# run-godmode.ps1
$ErrorActionPreference = "Stop"

# Set paths
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backend = Join-Path $root "backend"
$frontend = Join-Path $root "frontend-new"
$venv = Join-Path $backend ".venv"

Write-Host "🚀 Starting Customer Support Autopilot in GOD MODE 🚀" -ForegroundColor Cyan

# Function to check if command exists
function Test-CommandExists {
    param($command)
    $exists = $null -ne (Get-Command $command -ErrorAction SilentlyContinue)
    if (-not $exists) {
        Write-Error "❌ $command is not installed. Please install it and try again."
        exit 1
    }
    return $true
}

# Check prerequisites
Write-Host "🔍 Checking prerequisites..." -ForegroundColor Yellow
Test-CommandExists "python"
Test-CommandExists "uv"
Test-CommandExists "node"
Test-CommandExists "npm"

# Backend setup
Write-Host "
⚙️  Setting up backend..." -ForegroundColor Yellow
Set-Location $backend

# Create and activate virtual environment
if (-not (Test-Path $venv)) {
    Write-Host "Creating Python virtual environment..." -ForegroundColor Yellow
    python -m venv $venv
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
. "$venv\Scripts\Activate.ps1"

# Install Python dependencies
Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
uv pip install -r requirements.txt

# Run database migrations
Write-Host "Running database migrations..." -ForegroundColor Yellow
if (-not (Test-Path "alembic.ini")) {
    Write-Host "Initializing Alembic..." -ForegroundColor Yellow
    alembic init alembic
    # Copy custom env.py if exists
    if (Test-Path "alembic\env.py.template") {
        Copy-Item "alembic\env.py.template" "alembic\env.py" -Force
    }
}
alembic upgrade head

# Start backend server in new window
Write-Host "
🚀 Starting FastAPI backend server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backend'; . '$venv\Scripts\Activate.ps1'; uvicorn main:app --reload --host 0.0.0.0 --port 8000"

# Frontend setup
Write-Host "
🖥️  Setting up frontend..." -ForegroundColor Yellow
Set-Location $frontend

# Install Node.js dependencies
Write-Host "Installing Node.js dependencies..." -ForegroundColor Yellow
npm install

# Start frontend dev server in new window
Write-Host "
🚀 Starting Vite dev server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontend'; npm run dev"

# Open browser after delay
Start-Sleep -Seconds 5
Start-Process "http://localhost:5173"

Write-Host "
✅ Setup complete! Both servers are starting up..." -ForegroundColor Green
Write-Host "   - Backend: http://localhost:8000" -ForegroundColor Cyan
Write-Host "   - Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "   - API Docs: http://localhost:8000/docs" -ForegroundColor Cyan
