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
  * Microsoft 365 (Office)
    * This is the web app / PWA version of 365.
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
* One-click install for your choice of 30 common apps and tools
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
  * Explorer Patcher
  * StartAllBack
  * TegraRCMGUI
  * Notion
  * VMWare Workstation Pro
  * PowerToys
  * FFmpeg
  * Rockstar Games Launcher
* Disable "Microsoft Consumer Experiences"
  * This option prevents Microsoft from automatically installing more bloatware in the future and disables "Microsoft recommendations" *(aka. ads)* across various parts of Windows.
* Disable Fast Startup
* Remove Duplicate Drive Entries in File Explorer Navigation Pane
  * File Explorer shows drives in the sidebar navigation pane both under "This PC" and individually. This is pointless and can slow down explorer, especially when using mapped network drives. This option disables that behaviour.
* Disable Gallery in File Explorer
  * Disables the rarely used "Gallery" option in the File Explorer navigation pane.
* Disable Windows 11 (WinUI) Context Menu
  * Disables the new, slower Windows 11 right click context menus and restores the original ("show more options") menus from Windows 10.
* Disable Lock Screen Ads
* Disable Start Menu Recommendations
* Disable Start Menu Bing Search
* Disable Edge Startup Boost
  * Edge Startup Boost keeps the Edge browser always running in the background so that it launches faster. If you don't use Edge, you should disable it.
* Disable Telemetry / Data Collection
* Enable Developer Mode
  * This is the same "Developer Mode" that can be enabled from the Settings app.
* Set File Explorer to open to "This PC"
* Show File Extensions in File Explorer
* Hide "Home" tab in File Explorer
* Prevent Auto Folder View Changes
  * By default, every time you open a folder Windows scans its contents to choose a folder view for you (eg: thumbnails, list etc). This massively slows down File Explorer when opening folders with lots of files and is generally annoying. This option disables that behaviour.
* Enable Dark Mode
* Enable "End Task" option in Taskbar
  * Adds an "End Task" option when right clicking an app in the taskbar
* Disable Taskbar Search Box
* Disable Taskbar "Task View" Icon
* Disable Taskbar "Chat" Icon
* Disable Taskbar "Widgets" Icon
* Disable "Previous Versions" feature
  * Disables the rarely used "Previous Versions" feature that can be seen in various context menus and "Properties" windows.
* Add Local Network to Intranet Zone
  * When opening an executable file from a mapped network drive, File Explorer will give you a "These files might be harmful to your computer" warning. This option adds your local network to a trusted security zone to disable these messages.
  * *⚠️ This option is currently hardcoded to add 192.168.1.\* to the Intranet Zone. If your local network is on a different subnet, this option won't work.*
* Force Enable European DMA Compliance
  * In order to comply with the new European Digital Markets Act, Microsoft was forced to make certain changes to Windows in the EU. This option patches a file in Windows to enable these changes everywhere. Some of these changes include:
    * The ability to completely uninstall Microsoft Edge and Bing Web Search
    * Enabling third-party web apps on the Windows taskbar and third-party news feeds in the widgets panel
    * A new sign-in experience that no longer automatically signs users into certain Microsoft services such as Bing and Edge
    * Certain restriction on Microsoft's ability to use the data they collect from you
* Delete rarely used folders in user profile
  * Contacts
  * Links
  * Favorites
  * Searches
* Remove Steam Game Uninstall Links
  * Installs a routine task that removes "Uninstall" links from Control Panel/Settings for your Steam games, since most users uninstall games directly via Steam anyway. This task runs on every logon.
* Remove "Give Access To..." context menu item
* Remove "Scan with Microsoft Defender..." context menu item
  * This does not affect Microsoft Defender. It only removes the unnecessary scan item in right click menus.
* Remove "Add to Favorites" context menu item
* Remove "Share" content menu item
* Remove "Cast to Device" context menu item
* Remove "Print" context menu item
* Remove Image "Rotate Left" and "Rotate Right" context menu items
* Import ExplorerPatcher Settings
  * These are my personal ExplorerPatcher settings. They're pretty solid defaults.
* Import AppData configurations
  * This will import any app configurations in the configs/Local and configs/Roaming folders.
  * By default this will import my personal settings for nv_updater, but you can add your own appdata configs to the folders mentioned above.
* Enable Windows Sandbox feature
* Enable ssh-agent service
  * This is useful for developers to enable passwordless Git and SSH authentication.

## To add

* Remove startup items
