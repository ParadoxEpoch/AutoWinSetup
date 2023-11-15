@echo off

call :AskQuestion "Disable Windows 11 (WinUI) Context Menu?"
if "%AskResult%"=="Yes" reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve

call :AskQuestion "Set File Explorer to open to This PC?"
if "%AskResult%"=="Yes" reg.exe add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "LaunchTo" /t REG_DWORD /d 1 /f
if "%AskResult%"=="No" reg.exe delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "LaunchTo" /f

call :AskQuestion "Show File Extensions in File Explorer?"
if "%AskResult%"=="Yes" reg.exe add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "HideFileExt" /t REG_DWORD /d 0 /f
if "%AskResult%"=="No" reg.exe add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "HideFileExt" /t REG_DWORD /d 1 /f

REM call :AskQuestion "Hide Home tab in File Explorer?"
REM if "%AskResult%"=="Yes" reg.exe add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /v "HubMode" /t REG_DWORD /d 1 /f
REM if "%AskResult%"=="Yes" reg.exe delete "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace_36354489\{f874310e-b6b7-47dc-bc84-b9e6b38f5903}" /f
REM if "%AskResult%"=="No" reg.exe delete "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /v "HubMode" /f
REM if "%AskResult%"=="No" reg.exe add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace_36354489\{f874310e-b6b7-47dc-bc84-b9e6b38f5903}" /f

echo.
echo Restarting Explorer...
echo.
taskkill /f /im explorer.exe
start explorer.exe
echo.
echo Done!
echo Press any key to exit...
pause>nul
exit 0

:AskQuestion
setlocal
set "prompt=%~1"
set /P response="%prompt% (Y/N)? "
if /I "%response%" EQU "Y" (
    endlocal & set "AskResult=Yes"
) else (
    endlocal & set "AskResult=No"
)
goto :eof