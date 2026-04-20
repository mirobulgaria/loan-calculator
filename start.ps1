$ErrorActionPreference = "Stop"

function Test-Command($name) {
  return [bool](Get-Command $name -ErrorAction SilentlyContinue)
}

$port = 5173
$logPath = Join-Path $PSScriptRoot "launcher.log"

Write-Host "" 
Write-Host "Loan calculator launcher" -ForegroundColor Cyan
Write-Host "------------------------" -ForegroundColor Cyan
Write-Host ""

("[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] start.ps1 launched from '{0}'" -f (Get-Location)) | Set-Content -Path $logPath -Encoding UTF8

$pythonCmd = $null
if (Test-Command "python") { $pythonCmd = @("python") }
elseif (Test-Command "py") { $pythonCmd = @("py", "-3") }

if (-not $pythonCmd) {
  Add-Content -Path $logPath -Value ("[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] ERROR: Python not found.")
  Write-Host "ERROR: Python not found." -ForegroundColor Red
  Write-Host "- Install Python 3 from python.org (recommended), or Microsoft Store"
  Write-Host "- Then re-run this script"
  Write-Host ""
  Write-Host "Tip: You can still open index.html directly without a server." -ForegroundColor Yellow
  Write-Host ("A log was written to: {0}" -f $logPath)
  Read-Host "Press Enter to exit"
  exit 1
}

Write-Host "Starting server at http://localhost:$port" -ForegroundColor Cyan
Start-Process "http://localhost:$port"
Write-Host "Close this window to stop the server."
Write-Host ""
Add-Content -Path $logPath -Value ("[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] Using Python command: {0}" -f ($pythonCmd -join " "))
Add-Content -Path $logPath -Value ("[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] Starting http.server on port {0}" -f $port)

try {
  & $pythonCmd[0] @($pythonCmd[1..($pythonCmd.Length - 1)]) -m http.server $port 2>&1 | Tee-Object -FilePath $logPath -Append
} catch {
  Add-Content -Path $logPath -Value ("[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] ERROR: {0}" -f $_.Exception.Message)
  throw
}

