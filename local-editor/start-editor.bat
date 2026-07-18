@echo off
setlocal

where py >nul 2>nul
if not errorlevel 1 (
  set "EDITOR_PYTHON=py -3"
  goto start_server
)

where python >nul 2>nul
if not errorlevel 1 (
  set "EDITOR_PYTHON=python"
  goto start_server
)

echo Python was not found.
echo Install Python, then run this file again.
pause
exit /b 1

:start_server
pushd "%~dp0.."
start "KYUKAO Local Editor Server" cmd /k %EDITOR_PYTHON% -m http.server 8000
timeout /t 1 /nobreak >nul
start "" "http://localhost:8000/local-editor/"
popd

echo The editor is opening in your browser.
echo Keep the server window open while editing.
endlocal
