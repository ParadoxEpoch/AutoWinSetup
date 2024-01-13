//import ora from 'ora';
import { execute, executeNoFail, msg } from './common.js';

// Import tasks
import appInstall from './tasks/appinstall.task.js';
import debloat from './tasks/debloat.task.js';

const tasks = {
    debloat: debloat,
    appInstall: appInstall,
    disableWin11CxtMenu: async () => {
        console.log(msg.info(`==> Disabling Windows 11 context menu...\n`));
        await executeNoFail(`reg add "HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\\InProcServer32" /f /ve`, 'Adding registry key...');
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
	explorerDisableTaskbarSearch: async () => {
		console.log(msg.info(`==> Disabling Taskbar Search Box...\n`));
		await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "SearchboxTaskbarMode" /t REG_DWORD /d 0 /f`, 'Setting SearchboxTaskbarMode DWORD to 0...');
	},
	explorerDisableTaskbarTaskView: async () => {
        console.log(msg.info(`==> Removing "Task View" icon from the Taskbar..\n`));
        await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "ShowTaskViewButton" /t REG_DWORD /d 0 /f`, 'Setting ShowTaskViewButton DWORD to 0...');
        return true;
    },
	/* explorerDisableTaskbarChat: async () => {
        console.log(msg.info(`==> Removing "Chat" icon from the Taskbar..\n`));
        await executeNoFail(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarMn" /t REG_DWORD /d 0 /f`, 'Setting TaskbarMn DWORD to 0...');
        return true;
    }, */
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
    deleteExtraProfileDirs: async () => {
        console.log(msg.info(`==> Deleting superfluous folders in user profile...\n`));
        await executeNoFail('"scripts/delete-profile-dirs.bat"', 'Running deletion script...');
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
    },
    nvinstall: async () => {
        console.log('Installing NVIDIA Graphics Driver...');
    }
}

export default tasks;