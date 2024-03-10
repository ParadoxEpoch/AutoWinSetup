//import ora from 'ora';
import fs from 'fs-extra';
import { execute, executeNoFail, msg } from './common.js';

// Import tasks
import appInstall from './tasks/appinstall.task.js';
import debloat from './tasks/debloat.task.js';

const tasks = {
	debloat: debloat,
	appInstall: appInstall,
	disableConsumerExperience: async () => {
		console.log(msg.info(`==> Disabling "Microsoft Consumer Experiences"...\n`));
		await executeNoFail(`reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\CloudContent" /v "DisableWindowsConsumerFeatures" /t REG_DWORD /d 1 /f`, 'Setting DisableWindowsConsumerFeatures DWORD to 1...');
		return true;
	},
	disableFastStartup: async () => {
		console.log(msg.info(`==> Disabling Fast Startup...\n`));
		await executeNoFail(`reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power" /v "HiberbootEnabled" /t REG_DWORD /d 0 /f`, 'Setting HiberbootEnabled DWORD to 0...');
		return true;
	},
	removeDuplicateDrives: async () => {
		console.log(msg.info(`==> Removing duplicate drives from "This PC"...\n`));
		await executeNoFail(`reg delete "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Desktop\\NameSpace\\DelegateFolders\\{F5FB2C77-0E2F-4A16-A381-3E560C68BC83}" /f`, 'Removing registry key in DelegateFolders...');
		await executeNoFail(`reg delete "HKLM\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Desktop\\NameSpace\\DelegateFolders\\{F5FB2C77-0E2F-4A16-A381-3E560C68BC83}" /f`, 'Removing registry key in WoW64 DelegateFolders...');
		return true;
	},
	disableGallery: async () => {
		console.log(msg.info(`==> Disabling Gallery in File Explorer...\n`));
		await executeNoFail(`reg delete "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Desktop\\NameSpace_41040327\\{e88865ea-0e1c-4e20-9aa6-edcd0212c87c}" /f`, 'Removing registry key...');
		return true;
	},
	disableWin11CxtMenu: async () => {
		console.log(msg.info(`==> Disabling Windows 11 context menu...\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\\InProcServer32" /f /ve`, 'Adding registry key...');
		return true;
	},
	disableLockScreenAds: async () => {
		console.log(msg.info(`==> Disabling Lock Screen Ads...\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "RotatingLockScreenOverlayEnabled" /t REG_DWORD /d 0 /f`, 'Setting RotatingLockScreenOverlayEnabled DWORD to 0...');
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-338387Enabled" /t REG_DWORD /d 0 /f`, 'Setting SubscribedContent-338387Enabled DWORD to 0...');
		return true;
	},
	disableStartMenuRecommendations: async () => {
		console.log(msg.info(`==> Disabling Start Menu Recommendations...\n`));
		await executeNoFail(`reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\Explorer" /v "HideRecommendedSection" /t REG_DWORD /d 1 /f`, 'Setting HideRecommendedSection DWORD to 1...');
		return true;
	},
	disableStartMenuWebSearch: async () => {
		console.log(msg.info(`==> Disabling Start Menu Web Search...\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer" /v "DisableSearchBoxSuggestions" /t REG_DWORD /d 1 /f`, 'Setting DisableSearchBoxSuggestions DWORD to 1...');
		return true;
	},
	disableEdgeStartupBoost: async () => {
		console.log(msg.info(`==> Disabling Edge Startup Boost...\n`));
		await executeNoFail(`reg add "HKLM\\Software\\Policies\\Microsoft\\Edge" /v "StartupBoostEnabled" /t REG_DWORD /d 0 /f`, 'Setting StartupBoostEnabled DWORD to 0...');
		return true;
	},
	disableTelemetry: async () => {
		console.log(msg.info(`==> Disabling Telemetry...\n`));
		await executeNoFail(`reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f`, 'Setting AllowTelemetry DWORD to 0...');
		await executeNoFail(`sc stop DiagTrack`, 'Stopping DiagTrack service...');
		await executeNoFail(`sc config DiagTrack start= disabled`, 'Disabling DiagTrack service...');
		return true;
	},
	enableDevMode: async () => {
		console.log(msg.info(`==> Enabling Developer Mode...\n`));
		await executeNoFail(`reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\Appx" /t REG_DWORD /f /v "AllowDevelopmentWithoutDevLicense" /d "1"`, 'Setting AllowDevelopmentWithoutDevLicense DWORD to 1...');
		return true;
	},
	explorerOpenToThisPC: async () => {
		console.log(msg.info(`==> Setting File Explorer to open to "This PC"...\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "LaunchTo" /t REG_DWORD /d 1 /f`, 'Adding registry key...');
		return true;
	},
	explorerShowExtensions: async () => {
		console.log(msg.info(`==> Showing file extensions in File Explorer...\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "HideFileExt" /t REG_DWORD /d 0 /f`, 'Adding registry key...');
		return true;
	},
	explorerDisableHomeTab: async () => {
		console.log(msg.info(`==> Hiding "Home" tab in File Explorer...\n`));
		await executeNoFail(`reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "HubMode" /t REG_DWORD /d 1 /f`, 'Setting HubMode DWORD to 1...');
		await executeNoFail(`reg delete "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Desktop\\NameSpace_36354489\\{f874310e-b6b7-47dc-bc84-b9e6b38f5903}" /f`, 'Removing Home from navigation pane...');
		return true;
	},
	explorerPreventFolderViewChanges: async () => {
		console.log(msg.info(`==> Preventing automatic folder view changes in File Explorer...\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Classes\\Local Settings\\Software\\Microsoft\\Windows\\Shell\\Bags\\AllFolders\\Shell" /v "FolderType" /t REG_SZ /d "NotSpecified" /f`, 'Setting FolderType String to NotSpecified...');
		return true;
	},
	explorerEnableDarkMode: async () => {
		console.log(msg.info(`==> Enabling Dark Mode...\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "AppsUseLightTheme" /t REG_DWORD /d 0 /f`, 'Setting AppsUseLightTheme DWORD to 0...');
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "SystemUsesLightTheme" /t REG_DWORD /d 0 /f`, 'Setting SystemUsesLightTheme DWORD to 0...');
		return true;
	},
	explorerEnableTaskbarEndTask: async () => {
		console.log(msg.info(`==> Enabling "End Task" in Taskbar Context Menu...\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced\\TaskbarDeveloperSettings" /v "TaskbarEndTask" /t REG_DWORD /d 1 /f`, 'Setting TaskbarEndTask DWORD to 1...');
		return true;
	},
	explorerDisableTaskbarSearch: async () => {
		console.log(msg.info(`==> Disabling Taskbar Search Box...\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "SearchboxTaskbarMode" /t REG_DWORD /d 0 /f`, 'Setting SearchboxTaskbarMode DWORD to 0...');
		return true;
	},
	explorerDisableTaskbarTaskView: async () => {
		console.log(msg.info(`==> Removing "Task View" icon from the Taskbar..\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "ShowTaskViewButton" /t REG_DWORD /d 0 /f`, 'Setting ShowTaskViewButton DWORD to 0...');
		return true;
	},
	explorerDisableTaskbarChat: async () => {
		console.log(msg.info(`==> Removing "Chat" icon from the Taskbar..\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarMn" /t REG_DWORD /d 0 /f`, 'Setting TaskbarMn DWORD to 0...');
		return true;
	},
	explorerDisableTaskbarWidgets: async () => {
		console.log(msg.info(`==> Removing "Widgets" icon from the Taskbar..\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarDa" /t REG_DWORD /d 0 /f`, 'Setting TaskbarDa DWORD to 0...');
		return true;
	},
	explorerDisableCxtGiveAccessTo: async () => {
		console.log(msg.info(`==> Removing "Give Access To" context menu item...\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "SharingWizardOn" /t REG_DWORD /d 0 /f`, 'Setting SharingWizardOn DWORD to 0...');
		return true;
	},
	explorerDisableCxtScanWithDefender: async () => {
		console.log(msg.info(`==> Removing "Scan with Microsoft Defender" context menu item...\n`));
		await executeNoFail(`reg delete "HKCR\\CLSID\\{09A47860-11B0-4DA5-AFA5-26D86198A780}" /f`, 'Removing relevant CLSID from HKCR hive...');
		await executeNoFail(`reg delete "HKCR\\*\\shellex\\ContextMenuHandlers\\EPP" /f`, 'Removing ContextMenuHandler from HKCR\\* key...');
		await executeNoFail(`reg delete "HKCR\\Directory\\shellex\\ContextMenuHandlers\\EPP" /f`, 'Removing ContextMenuHandler from HKCR\\Directory key...');
		await executeNoFail(`reg delete "HKCR\\Drive\\shellex\\ContextMenuHandlers\\EPP" /f`, 'Removing ContextMenuHandler from HKCR\\Drive key...');
		return true;
	},
	explorerDisableCxtAddToFavorites: async () => {
		console.log(msg.info(`==> Removing "Add to Favorites" context menu item...\n`));
		await executeNoFail(`reg delete "HKCR\\*\\shell\\pintohomefile" /f`, 'Removing pintohomefile key from HKCR\\*\\shell...');
		return true;
	},
	explorerDisableCxtShare: async () => {
		console.log(msg.info(`==> Removing "Share" context menu item...\n`));
		await executeNoFail(`reg delete "HKCR\\*\\shellex\\ContextMenuHandlers\\Sharing" /f`, 'Removing ContextMenuHandler from HKCR\\* key...');
		await executeNoFail(`reg delete "HKCR\\AllFilesystemObjects\\shellex\\ContextMenuHandlers\\ModernSharing" /f`, 'Removing ContextMenuHandler from HKCR\\AllFilesystemObjects key...');
		await executeNoFail(`reg delete "HKCR\\Directory\\Background\\shellex\\ContextMenuHandlers\\Sharing" /f`, 'Removing ContextMenuHandler from HKCR\\Directory\\Background key...');
		await executeNoFail(`reg delete "HKCR\\Directory\\shellex\\ContextMenuHandlers\\Sharing" /f`, 'Removing ContextMenuHandler from HKCR\\Directory key...');
		await executeNoFail(`reg delete "HKCR\\Drive\\shellex\\ContextMenuHandlers\\Sharing" /f`, 'Removing ContextMenuHandler from HKCR\\Drive key...');
		await executeNoFail(`reg delete "HKCR\\LibraryFolder\\Background\\shellex\\ContextMenuHandlers\\Sharing" /f`, 'Removing ContextMenuHandler from HKCR\\LibraryFolder\\Background key...');
		await executeNoFail(`reg delete "HKCR\\UserLibraryFolder\\shellex\\ContextMenuHandlers\\Sharing" /f`, 'Removing ContextMenuHandler from HKCR\\UserLibraryFolder key...');
		return true;
	},
	explorerDisableCtxCastToDevice: async () => {
		console.log(msg.info(`==> Removing "Cast to Device" context menu item...\n`));
		await executeNoFail(`reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Shell Extensions\\Blocked" /v "{7AD84985-87B4-4a16-BE58-8B72A5B390F7}" /t REG_SZ /d "" /f`, 'Adding to shellex blocklist in registry...');
		return true;
	},
	explorerDisableCtxPrint: async () => {
		console.log(msg.info(`==> Removing "Print" context menu item...\n`));
		await executeNoFail(`reg add "HKCR\\SystemFileAssociations\\image\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for image files...');
		await executeNoFail(`reg add "HKCR\\batfile\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for batch files...');
		await executeNoFail(`reg add "HKCR\\cmdfile\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for cmd files...');
		await executeNoFail(`reg add "HKCR\\docxfile\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for docx files...');
		await executeNoFail(`reg add "HKCR\\fonfile\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for fon files...');
		await executeNoFail(`reg add "HKCR\\htmlfile\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for html files...');
		await executeNoFail(`reg add "HKCR\\inffile\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for inf files...');
		await executeNoFail(`reg add "HKCR\\inifile\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for ini files...');
		await executeNoFail(`reg add "HKCR\\JSEFile\\Shell\\Print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for JSE files...');
		await executeNoFail(`reg add "HKCR\\otffile\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for otf files...');
		await executeNoFail(`reg add "HKCR\\pfmfile\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for pfm files...');
		await executeNoFail(`reg add "HKCR\\regfile\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for reg files...');
		await executeNoFail(`reg add "HKCR\\rtffile\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for rtf files...');
		await executeNoFail(`reg add "HKCR\\ttcfile\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for ttc files...');
		await executeNoFail(`reg add "HKCR\\ttffile\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for ttf files...');
		await executeNoFail(`reg add "HKCR\\txtfile\\shell\\print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for txt files...');
		await executeNoFail(`reg add "HKCR\\VBEFile\\Shell\\Print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for VBE files...');
		await executeNoFail(`reg add "HKCR\\VBSFile\\Shell\\Print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for VBS files...');
		await executeNoFail(`reg add "HKCR\\WSFFile\\Shell\\Print" /v "ProgrammaticAccessOnly" /t REG_SZ /d "" /f`, 'Adding ProgrammaticAccessOnly value to print key for WSF files...');
		return true;
	},
	explorerDisableCtxImageRotation: async () => {
		console.log(msg.info(`==> Removing "Rotate left" and "Rotate right" context menu items for images...\n`));
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.avci\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.avci key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.avif\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.avif key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.bmp\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.bmp key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.dds\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.dds key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.dib\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.dib key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.gif\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.gif key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.heic\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.heic key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.heif\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.heif key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.hif\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.hif key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.ico\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.ico key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.jfif\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.jfif key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.jpe\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.jpe key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.jpeg\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.jpeg key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.jpg\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.jpg key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.jxr\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.jxr key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.png\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.png key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.rle\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.rle key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.tif\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.tif key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.tiff\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.tiff key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.wdp\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.wdp key...');
		await executeNoFail(`reg delete "HKCR\\SystemFileAssociations\\.webp\\ShellEx\\ContextMenuHandlers\\ShellImagePreview" /f`, 'Removing ShellImagePreview from HKCR\\SystemFileAssociations\\.webp key...');
		return true;
	},
	explorerDisablePreviousVersions: async () => {
		console.log(msg.info(`==> Disabling "Previous Versions" tab in properties...\n`));
		await executeNoFail(`reg delete "HKCR\\AllFilesystemObjects\\shellex\\PropertySheetHandlers\\{596AB062-B4D2-4215-9F74-E9109B0A8153}" /f`, 'Removing PropertySheetHandler from HKCR\\AllFilesystemObjects key...');
		await executeNoFail(`reg delete "HKCR\\CLSID\\{450D8FBA-AD25-11D0-98A8-0800361B1103}\\shellex\\PropertySheetHandlers\\{596AB062-B4D2-4215-9F74-E9109B0A8153}" /f`, 'Removing relevant CLSID PropertySheetHandler from HKCR hive...');
		await executeNoFail(`reg delete "HKCR\\Directory\\shellex\\PropertySheetHandlers\\{596AB062-B4D2-4215-9F74-E9109B0A8153}" /f`, 'Removing PropertySheetHandler from HKCR\\Directory key...');
		await executeNoFail(`reg delete "HKCR\\Drive\\shellex\\PropertySheetHandlers\\{596AB062-B4D2-4215-9F74-E9109B0A8153}" /f`, 'Removing PropertySheetHandler from HKCR\\Drive key...');
		console.log(msg.info(`==> Disabling "Previous Versions" context menu item...\n`));
		await executeNoFail(`reg delete "HKCR\\AllFilesystemObjects\\shellex\\ContextMenuHandlers\\{596AB062-B4D2-4215-9F74-E9109B0A8153}" /f`, 'Removing ContextMenuHandler from HKCR\\AllFilesystemObjects key...');
		await executeNoFail(`reg delete "HKCR\\CLSID\\{450D8FBA-AD25-11D0-98A8-0800361B1103}\\shellex\\ContextMenuHandlers\\{596AB062-B4D2-4215-9F74-E9109B0A8153}" /f`, 'Removing relevant CLSID ContextMenuHandler from HKCR hive...');
		await executeNoFail(`reg delete "HKCR\\Directory\\shellex\\ContextMenuHandlers\\{596AB062-B4D2-4215-9F74-E9109B0A8153}" /f`, 'Removing ContextMenuHandler from HKCR\\Directory key...');
		await executeNoFail(`reg delete "HKCR\\Drive\\shellex\\ContextMenuHandlers\\{596AB062-B4D2-4215-9F74-E9109B0A8153}" /f`, 'Removing ContextMenuHandler from HKCR\\Drive key...');
		console.log(msg.info(`==> Clearing any conflicting policies associated with "Previous Versions"...\n`));
		await executeNoFail(`reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "NoPreviousVersionsPage" /f`, 'Clearing NoPreviousVersionsPage policy for current user...');
		await executeNoFail(`reg delete "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "NoPreviousVersionsPage" /f`, 'Clearing NoPreviousVersionsPage policy for local machine...');
		await executeNoFail(`reg delete "HKCU\\Software\\Policies\\Microsoft\\PreviousVersions" /v "DisableLocalPage" /f`, 'Clearing DisableLocalPage policy for current user...');
		await executeNoFail(`reg delete "HKLM\\Software\\Policies\\Microsoft\\PreviousVersions" /v "DisableLocalPage" /f`, 'Clearing DisableLocalPage policy for local machine...');
		return true;
	},
	addLocalNetworkToIntranetZone: async () => {
		console.log(msg.info(`==> Adding local network to Intranet Trusted Sites...\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range10000" /f`, 'Creating Range10000 key...');
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range10000" /v "*" /t REG_DWORD /d 1 /f`, 'Adding * DWORD to Range10000...');
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range10000" /v ":Range" /t REG_SZ /d "192.168.1.*" /f`, 'Adding :Range String to Range10000...');
		return true;
	},
	forceEnableDMACompliance: async () => {
		console.log(msg.info(`==> Force enabling policies related to the EU Digital Markets Act...\n`));

		// Check if IntegratedServicesRegionPolicySet.json exists
		if (!await fs.pathExists('C:\\Windows\\System32\\IntegratedServicesRegionPolicySet.json')) {
			console.log(msg.error('FAILED: Couldn\'t find the region policy file. Please verify that you have the latest version of AutoWinSetup and Windows 11 Build 22631.3235 or newer.'));
			return false;
		}

		await executeNoFail(`takeown /F "C:\\Windows\\System32\\IntegratedServicesRegionPolicySet.json" /A`, 'Taking ownership of IntegratedServicesRegionPolicySet.json...');
		await executeNoFail(`icacls "C:\\Windows\\System32\\IntegratedServicesRegionPolicySet.json" /grant Administrators:F`, 'Granting Administrators full control of IntegratedServicesRegionPolicySet.json...');

		// Load the C:\Windows\System32\IntegratedServicesRegionPolicySet.json file for editing
		const policySet = await fs.readJson('C:\\Windows\\System32\\IntegratedServicesRegionPolicySet.json');

		// Grab the list of EEA regions from a policy we know to be related to compliance with the EU Digital Markets Act
		// This way if other countries legislate similar laws or join the EEA, we won't have to update the script
		const edgeIsUninstallable = policySet.policies.find(p => p.guid === '{1bca278a-5d11-4acf-ad2f-f9ab6d7f93a6}');
		if (!edgeIsUninstallable?.conditions?.region?.enabled) {
			console.log(msg.error('FAILED: Couldn\'t find EEA regions in the policy file. Please verify that you have the latest version of AutoWinSetup and Windows 11 Build 22631.3235 or newer.'));
			return false;
		};
		const euRegions = JSON.stringify(edgeIsUninstallable.conditions.region.enabled);
		//const euRegions = ["AT", "BE", "BG", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GF", "GP", "GR", "HR", "HU", "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MT", "MQ", "NL", "NO", "PL", "PT", "RE", "RO", "SE", "SI", "SK", "YT"];
		const allRegions = ["AF","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ",
		"BM","BT","BO","BQ","BA","BW","BV","BR","IO","BN","BG","BF","BI","CV","KH","CM","CA","KY","CF","TD","CL","CN","CX","CC","CO","KM","CD",
		"CG","CK","CR","HR","CU","CW","CY","CZ","CI","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","SZ","ET","FK","FO","FJ","FI","FR","GF",
		"PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN","HK","HU","IS","IN","ID",
		"IR","IQ","IE","IM","IL","IT","JM","JP","JE","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO",
		"MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ",
		"NI","NE","NG","NU","NF","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","MK","RO","RU","RW","RE","BL",
		"SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","GS","SS","ES","LK","SD","SR",
		"SJ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","UM","US","UY","UZ","VU",
		"VE","VN","VG","VI","WF","EH","YE","ZM","ZW","AX"];

		// Loop through each policy and patch the EEA regions to all regions
		console.log(msg.bold(`Searching for and patching policies with EU specific conditions...`));
		policySet.policies.forEach(p => {
			// Trim p.$comment to max 50 characters and add ellipsis if it's longer
			const description = p.$comment.length > 50 ? p.$comment.substring(0, 50) + '...' : p.$comment;

			// If the policy has a condition that matches the EEA regions, patch it to include all regions
			if (p.conditions.region?.enabled && JSON.stringify(p.conditions.region.enabled) === euRegions) {
				p.conditions.region.enabled = allRegions;
				console.log(`Found policy "${description}" and enabled it in all regions.`);
			} else if (p.conditions.region?.disabled && JSON.stringify(p.conditions.region.disabled) === euRegions){
				p.conditions.region.disabled = allRegions;
				console.log(`Found policy "${description}" and disabled it in all regions.`);
			}
		});

		// Write the updated JSON back to the file
		console.log(msg.bold(`\nWriting patched IntegratedServicesRegionPolicySet.json back to disk...`));
		await fs.writeJson('C:\\Windows\\System32\\IntegratedServicesRegionPolicySet.json', policySet, { spaces: 2 });

		// Restore original file permissions
		await executeNoFail(`icacls "C:\\Windows\\System32\\IntegratedServicesRegionPolicySet.json" /setowner "NT SERVICE\\TrustedInstaller"`, 'Restoring ownership of IntegratedServicesRegionPolicySet.json back to TrustedInstaller...');
		await executeNoFail(`icacls "C:\\Windows\\System32\\IntegratedServicesRegionPolicySet.json" /grant:r Administrators:RX`, 'Revoking full control of IntegratedServicesRegionPolicySet.json...');
		return true;
	},
	deleteExtraProfileDirs: async () => {
		console.log(msg.info(`==> Deleting superfluous folders in user profile...\n`));
		await executeNoFail('"scripts/delete-profile-dirs.bat"', 'Running deletion script...');
		return true;
	},
	removeSteamUninstallLinks: async () => {
		// Determine main drive letter
		const mainDrive = process.env.SystemDrive;
		// Create Scripts folder on main drive if it doesn't exist
		await executeNoFail(`mkdir "${mainDrive}\\Scripts"`, 'Creating Scripts folder on main drive...');
		// Make Scripts folder hidden
		await executeNoFail(`attrib +h "${mainDrive}\\Scripts"`, 'Hiding Scripts folder...');
		// Copy scripts\installable\remove-steam-uninstall-links.bat to \Scripts
		await executeNoFail(`copy "scripts\\installable\\remove-steam-uninstall-links.bat" "${mainDrive}\\Scripts"`, 'Copying remove-steam-uninstall-links.bat to Scripts folder...');
		// Create a scheduled task to run the script at logon
		await executeNoFail(`schtasks /create /tn "Remove Steam Uninstall Links" /tr "${mainDrive}\\Scripts\\remove-steam-uninstall-links.bat" /sc ONLOGON /ru SYSTEM /f`, 'Creating scheduled task to run remove-steam-uninstall-links.bat at logon...');
		return true;
	},
	importExplorerPatcherSettings: async () => {
		console.log(msg.info(`==> Importing ExplorerPatcher settings...\n`));
		await executeNoFail('reg import "scripts/ExplorerPatcher_settings.reg"', 'Importing scripts\\ExplorerPatcher_settings.reg...');
		return true;
	},
	importAppDataConfigs: async () => {
		console.log(msg.info(`==> Importing AppData configs...\n`));
		await executeNoFail('robocopy "configs\\Roaming" "%APPDATA%" /NJH /NJS /NDL /NFL /E /IS /IT /XJ /XO /R:0 /W:0', 'Merging configs\\Roaming into AppData...', { expectCode: 3 });
		await executeNoFail('robocopy "configs\\Local" "%LOCALAPPDATA%" /NJH /NJS /NDL /NFL /E /IS /IT /XJ /XO /R:0 /W:0', 'Merging configs\\Local into LocalAppData...', { expectCode: 3 });
		return true;
	},
	cleanupStartMenu: async () => {
		console.log(msg.info(`==> Cleaning up Start Menu folders...\n`));
		await executeNoFail('rmdir /s /q "%APPDATA%\\Microsoft\\Windows\\Start Menu\\Programs\\Accessibility"', 'Deleting Accessibility folder...');
		return true;
	},
	enableSandboxFeature: async () => {
		console.log(msg.info(`==> Enabling Windows Sandbox...\n`));
		await executeNoFail(`dism /online /Enable-Feature /FeatureName:"Containers-DisposableClientVM" /All /LimitAccess /NoRestart`, 'Enabling Containers-DisposableClientVM feature via DISM...');
		return true;
	},
	enableSshAgent: async () => {
		console.log(msg.info(`==> Enabling ssh-agent...\n`));
		await executeNoFail('sc config ssh-agent start= auto', 'Setting ssh-agent service to start automatically...');
		await executeNoFail('net start ssh-agent', 'Starting ssh-agent service...');
		return true;
	}
}

export default tasks;