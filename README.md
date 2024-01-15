# AutoWinSetup

Personal automated setup for new Windows installs. This tool can remove included bloatware, install common apps and make a number of popular registry and GPO modifications to Windows in a matter of seconds.

*Note: All options in AutoWinSetup are configurable and the tool won't make any changes to your system unless you select them.*

## Usage

*⚠️ Some official Windows ISOs ship with a broken version of winget. To make sure setup runs correctly, open the Microsoft Store and let it update all your apps (and itself) before running AutoWinSetup.*

To automatically download and run AutoWinSetup, open PowerShell and run the following command:

`irm https://winsetup.gauci.xyz | iex`

---

or...

Manually download this repository and run `setup.bat`.

## Features

* Remove over 20 preinstalled bloatware apps bundled in Windows 11.
  * Clipchamp
  * Cortana
  * Camera
  * Clock
  * Feedback Hub
  * Get Help
  * Mail and Calendar
  * Outlook for Windows (new)
  * Maps
  * Media Player
  * OneDrive
  * Teams
  * To Do
  * Films and TV
  * News
  * Quick Assist
  * Sticky Notes
  * Tips
  * Voice Recorder
  * Weather
  * Windows Web Experience Pack (Widgets)
* One-click install for nearly 30 common apps and tools
  * NVUpdater (Lightweight NVIDIA driver update tool)
  * 7zip
  * Steam
  * Everything
  * WizTree
  * GitHub Desktop
  * Visual Studio Code
  * Spotify
  * 1Password
  * VLC
  * Plex
  * AnyBurn
  * Advanced Renamer
  * Discord
  * HxD
  * JDownloader
  * Postman
  * Private Internet Access
  * PS Remote Play
  * qBittorrent
  * TablePlus
  * TeraCopy
  * StartAllBack
  * TegraRCMGUI
  * Notion
  * VMWare Workstation Pro
  * PowerToys
  * FFmpeg
  * Rockstar Games Launcher
* Disable "Microsoft Consumer Experiences"
  * This option prevents Microsoft from automatically installing more bloatware in the future and disables "Microsoft recommendations" *(aka. ads)* across various parts of Windows.
* Disable Windows 11 (WinUI) Context Menu
* Set File Explorer to open to "This PC"
* Show File Extensions in File Explorer
* Hide "Home" tab in File Explorer
* Enable Dark Mode
* Enable "End Task" option in Taskbar
* Disable Taskbar Search Box
* Disable Taskbar "Task View" Icon
* Disable Taskbar "Chat" Icon
* Disable Taskbar "Widgets" Icon
* Disable "Previous Versions" feature
* Delete rarely used folders in user profile
  * Contacts
  * Links
  * Favorites
  * Searches
  * OneDrive
* Remove "Give Access To..." context menu item
* Remove "Scan with Microsoft Defender..." context menu item
  * This does not affect Microsoft Defender. It only removes the unnecessary scan item in right click menus.
* Remove "Add to Favorites" context menu item
* Remove "Share" content menu item
* Enable Windows Sandbox feature
* Enable ssh-agent service
  * This is useful for developers to enable passwordless Git and SSH authentication.

## To add

* Auto clear Steam installer entries at startup
* Remove startup items
* Import app configurations/data
