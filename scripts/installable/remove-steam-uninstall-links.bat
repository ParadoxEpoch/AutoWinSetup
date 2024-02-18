@title Removing Steam Uninstall Entries...
@net session >nul 2>&1
@if %errorlevel% == 0 (
    @for /F "delims=" %%a in ('reg query HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall ^| findstr /C:"Steam App"') do @reg delete "%%a" /f
    @for /F "delims=" %%a in ('reg query HKLM\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall ^| findstr /C:"Steam App"') do @reg delete "%%a" /f
    @echo Success!
) else (
    @echo You do not have Administrator Rights. Try right clicking and choosing 'Run as administrator'
    @pause>nul
)