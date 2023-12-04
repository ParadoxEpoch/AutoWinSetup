:::::::::::::::::::::::::::::::::::::::::::::::
::   ---        Process Elevator       ---   ::
::                                           ::
::   This script will invoke UAC to launch   ::
::        a process with admin rights        ::
:::::::::::::::::::::::::::::::::::::::::::::::
@echo off
TITLE Process Elevator
cls
:ascii
echo [96m[1m~~~ ParadoxEpoch's Auto Windows Setup ~~~[0m
echo [1m   ___                    _           _        _         _       __    __ _       
echo   / _ \__ _ _ __ __ _  __^| ^| _____  _( )__    /_\  _   _^| ^|_ ___/ / /\ \ (_)_ __  
echo  / /_)/ _` ^| '__/ _` ^|/ _` ^|/ _ \ \/ // __^|  //_\\^| ^| ^| ^| __/ _ \ \/  \/ / ^| '_ \ 
echo / ___/ (_^| ^| ^| ^| (_^| ^| (_^| ^| (_) ^>  ^< \__ \ /  _  \ ^|_^| ^| ^|^| (_) \  /\  /^| ^| ^| ^| ^|
echo \/    \__,_^|_^|  \__,_^|\__,_^|\___/_/\_\^|___/ \_/ \_/\__,_^|\__\___/ \/  \/ ^|_^|_^| ^|_^|[0m
echo.

:init
setlocal DisableDelayedExpansion
set cmdInvoke=1
set winSysFolder=System32
set "batchPath=%~0"
for %%k in (%0) do set batchName=%%~nk
set "vbsGetPrivileges=%temp%\OEgetPriv_%batchName%.vbs"
setlocal EnableDelayedExpansion

:checkPrivileges
NET FILE 1>NUL 2>NUL
if '%errorlevel%' == '0' ( goto gotPrivileges ) else ( goto getPrivileges )

:getPrivileges
if '%1'=='ELEV' (echo ELEV & shift /1 & goto gotPrivileges)
echo.
echo Requesting privilege escalation...

echo Set UAC = CreateObject^("Shell.Application"^) > "%vbsGetPrivileges%"
echo args = "ELEV " >> "%vbsGetPrivileges%"
echo For Each strArg in WScript.Arguments >> "%vbsGetPrivileges%"
echo args = args ^& strArg ^& " "  >> "%vbsGetPrivileges%"
echo Next >> "%vbsGetPrivileges%"

if '%cmdInvoke%'=='1' goto InvokeCmd 

echo UAC.ShellExecute "!batchPath!", args, "", "runas", 1 >> "%vbsGetPrivileges%"
goto ExecElevation

:InvokeCmd
echo args = "/c """ + "!batchPath!" + """ " + args >> "%vbsGetPrivileges%"
echo UAC.ShellExecute "%SystemRoot%\%winSysFolder%\cmd.exe", args, "", "runas", 1 >> "%vbsGetPrivileges%"

:ExecElevation
"%SystemRoot%\%winSysFolder%\WScript.exe" "%vbsGetPrivileges%" %*
exit /B

:gotPrivileges
setlocal & cd /d %~dp0
if '%1'=='ELEV' (del "%vbsGetPrivileges%" 1>nul 2>nul  &  shift /1)

::::::::::::::::::::::::::::::::::::::::::::::
:: Run TestKit Launcher in Windows Terminal ::
::::::::::::::::::::::::::::::::::::::::::::::
wt %~dp0was.cmd