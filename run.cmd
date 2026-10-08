@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js 22.12 or newer, then run this file again.
  pause
  exit /b 1
)

if not exist "node_modules\.bin\vite.cmd" (
  call npx --yes pnpm@10.4.1 install --frozen-lockfile
  if errorlevel 1 goto failed
)

call npm run build
if errorlevel 1 goto failed

if not defined PORT set "PORT=3000"
start "" "http://localhost:%PORT%/"
call npm start
if errorlevel 1 goto failed
exit /b 0

:failed
echo PIMXSUPPORT could not start. See the error above.
pause
exit /b 1
