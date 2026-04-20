@echo off
setlocal

set PORT=5173

echo.
echo Loan calculator launcher
echo ------------------------
echo.

set LOG=%~dp0launcher.log
echo [%date% %time%] start.cmd launched from "%cd%" > "%LOG%"

set PY=

where python >nul 2>nul
if not errorlevel 1 set PY=python

if "%PY%"=="" (
  where py >nul 2>nul
  if not errorlevel 1 set PY=py -3
)

if "%PY%"=="" (
  echo [%date% %time%] ERROR: Python not found. >> "%LOG%"
  echo ERROR: Python not found.
  echo - Install Python 3 from python.org
  echo - OR install from Microsoft Store
  echo - Then re-run this script
  echo.
  echo A log was written to: "%LOG%"
  pause
  exit /b 1
)

start "" "http://localhost:%PORT%"
echo Starting server at http://localhost:%PORT%
echo Close this window to stop the server.
echo.
echo [%date% %time%] Using Python command: %PY% >> "%LOG%"
echo [%date% %time%] Starting http.server on port %PORT% >> "%LOG%"
%PY% -m http.server %PORT% >> "%LOG%" 2>&1

