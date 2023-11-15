@echo off
setlocal

:: Check for admin privileges
net session >nul 2>&1
if %errorLevel% == 0 (
    echo Running as administrator, continuing...
) else (
    echo Please run this script as an administrator!
    pause >nul
    exit /B
)

:: Create a temporary PS1 file
echo Set-Service ssh-agent -StartupType Automatic > temp.ps1
echo Start-Service ssh-agent >> temp.ps1
echo Get-Service ssh-agent >> temp.ps1

:: Check and set execution policy
powershell -Command "& { if ((Get-ExecutionPolicy) -eq 'Restricted') {Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Force} }"

:: Run the commands in the PS1 file with admin privileges
powershell -ExecutionPolicy Bypass -File temp.ps1

:: Remove the temporary PS1 file
del temp.ps1

endlocal
pause