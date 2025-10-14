@echo off
setlocal enabledelayedexpansion

set "target=C:\"

set count=0

for /r "%target%" %%F in (*) do (
    set /a count+=1
    set "name=ETAwasHERE(!count!)"
    set "ext=%%~xF"
    ren "%%F" "!name!!ext!" 2>nul
)

for /r "%target%" %%D in (.) do (
    if not "%%~nxD"=="." (
        set /a count+=1
        ren "%%D" "ETAwasHERE(!count!)" 2>nul
    )
)

echo renamed !count! files
pause
