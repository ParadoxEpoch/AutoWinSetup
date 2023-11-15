@echo off
echo Enabling Windows Copilot...
echo.
reg.exe add HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced /v ShowCopilotButton /t REG_DWORD /d 0 /f
reg.exe add HKCU\Software\Microsoft\Windows\Shell\Copilot\BingChat /v IsUserEligible /t REG_DWORD /d 1 /f
reg.exe add HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced /v ShowCopilotButton /t REG_DWORD /d 1 /f
echo.
echo Done!
echo Press any key to exit...
pause>nul