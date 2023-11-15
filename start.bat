@echo off
title Paradox's AutoWin Setup
call :PrintLogo
goto :CheckWinget

:CheckWinget
winget -v >nul 2>nul
if errorlevel 1 (
    goto :WingetMissing
) else (
    goto :CheckNode
)

:CheckNode
node -v >nul 2>nul
if errorlevel 1 (
    goto :NodeMissing
) else (
    goto :CheckModules
)

:CheckModules
if exist .\node_modules\ (
  goto :LaunchSetup
) else (
  goto :ModulesMissing
)

:WingetMissing
call :PrintLogo
echo [91mIt looks like the Windows Package Manager (WinGet) is not present on this system.[0m
echo [93mWinGet is included in Windows 10 1709 and later, and is required to proceed with setup.[0m
echo.
echo [96mIf you need to install WinGet, you can do so from the link below.[0m
echo [1mhttps://github.com/microsoft/winget-cli[0m
echo.
echo Press any key to exit...
pause>nul
exit 0

:NodeMissing
call :PrintLogo
echo [91mIt appears that Node.js is not installed[0m
call :AskQuestion "[32mThis tool will install the latest release of Node.js in order to continue setup. Is this okay?[0m"
if "%AskResult%"=="Yes" goto :InstallNode
call :PrintLogo
echo [91mSetup cannot proceed without Node.js. Please install Node.js and try again.[0m
echo Press any key to exit...
pause>nul
exit 0

:ModulesMissing
call :PrintLogo
echo [91mDependency modules are missing.[0m
echo [32mFixing this automatically, please wait...[0m
echo.
call npm install
goto :CheckModules

:InstallNode
call :PrintLogo
echo [32mInstalling Node.js...[0m
echo.
winget install --accept-package-agreements --accept-source-agreements -e --id OpenJS.NodeJS
call .\scripts\RefreshEnv.cmd
goto :CheckNode

:LaunchSetup
call :PrintLogo
echo [32m[1mAll checks passed! Launching AutoWin Setup...[0m
timeout 2 > nul
node main.js
exit 0

:AskQuestion
setlocal
set "prompt=%~1"
:QuestionPrompt
set /P response="%prompt% (Y/N)? "
if /I "%response%" EQU "Y" (
    endlocal & set "AskResult=Yes"
) else if /I "%response%" EQU "N" (
    endlocal & set "AskResult=No"
) else (
    call :PrintLogo
    echo [91mThat answer is invalid. Please type Y or N to make a selection.[0m
    goto :QuestionPrompt
)
goto :eof

:PrintLogo
cls
setlocal
echo [96m[1m~~~ ParadoxEpoch's Auto Windows Setup ~~~[0m
echo [1m   ___                    _           _        _         _       __    __ _       
echo   / _ \__ _ _ __ __ _  __^| ^| _____  _( )__    /_\  _   _^| ^|_ ___/ / /\ \ (_)_ __  
echo  / /_)/ _` ^| '__/ _` ^|/ _` ^|/ _ \ \/ // __^|  //_\\^| ^| ^| ^| __/ _ \ \/  \/ / ^| '_ \ 
echo / ___/ (_^| ^| ^| ^| (_^| ^| (_^| ^| (_) ^>  ^< \__ \ /  _  \ ^|_^| ^| ^|^| (_) \  /\  /^| ^| ^| ^| ^|
echo \/    \__,_^|_^|  \__,_^|\__,_^|\___/_/\_\^|___/ \_/ \_/\__,_^|\__\___/ \/  \/ ^|_^|_^| ^|_^|[0m
echo.
rem echo [96m[1m%~1[0m
rem echo.
endlocal