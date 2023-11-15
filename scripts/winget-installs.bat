@echo off
#winget install -e --id Rainmeter.Rainmeter
#winget install -e --id SoftwareFreedomConservancy.QEMU
#winget install -e --id RARLab.WinRAR
#winget install -e --id Brave.Brave
#winget install -e --id CrystalDewWorld.CrystalDiskInfo
#winget install -e --id REALiX.HWiNFO

echo Installing Apps...
winget install --accept-package-agreements --accept-source-agreements -e --id OpenJS.NodeJS
winget install -e --id 7zip.7zip
winget install -e --id Valve.Steam
winget install -e --id voidtools.Everything
winget install -e --id AntibodySoftware.WizTree
winget install -e --id GitHub.GitHubDesktop
winget install -e --id Microsoft.VisualStudioCode
winget install -e --id Spotify.Spotify
winget install -e --id AgileBits.1Password
winget install -e --id VideoLAN.VLC
winget install -e --id Plex.Plex
winget install -e --id PowerSoftware.AnyBurn
winget install -e --id HulubuluSoftware.AdvancedRenamer
winget install -e --id Discord.Discord
winget install -e --id MHNexus.HxD
winget install -e --id AppWork.JDownloader
winget install -e --id Postman.Postman
winget install -e --id PrivateInternetAccess.PrivateInternetAccess
winget install -e --id PlayStation.PSRemotePlay
winget install -e --id qBittorrent.qBittorrent
winget install -e --id TablePlus.TablePlus
winget install -e --id CodeSector.TeraCopy
winget install -e --id StartIsBack.StartAllBack
winget install -e --id eliboa.TegraRcmGUI
winget install -e --id Notion.Notion
winget install -e --id VMware.WorkstationPro
winget install -e --id Microsoft.PowerToys
echo.
echo Installation Complete!
echo Press any key to exit...
pause>nul