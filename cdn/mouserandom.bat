@echo off
setlocal

set "ps=%TEMP%\mouserandom.ps1"

> "%ps%" (
  echo Add-Type -AssemblyName System.Windows.Forms
  echo $sig = @"
  echo using System;
  echo using System.Runtime.InteropServices;
  echo public class WinAPI {
  echo   [DllImport("user32.dll")]
  echo   public static extern bool SetCursorPos(int X, int Y);
  echo }
  echo "@
  echo Add-Type -TypeDefinition $sig -PassThru > $null
  echo $scr = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
  echo $w = $scr.Width; $h = $scr.Height
  echo $rnd = New-Object System.Random
  echo while ($true) {
  echo   if ([console]::KeyAvailable) {
  echo     $k = [console]::ReadKey($true)
  echo     if ($k.KeyChar -eq '$') { break }
  echo   }
  echo   $x = $rnd.Next(0, $w)
  echo   $y = $rnd.Next(0, $h)
  echo   [WinAPI]::SetCursorPos($x, $y) | Out-Null
  echo   Start-Sleep -Milliseconds ($rnd.Next(40,250))
  echo }
  echo Write-Host "debug key to stop used"
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%ps%"

del "%ps%" >nul 2>&1
endlocal
