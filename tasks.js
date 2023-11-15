//import ora from 'ora';
import { execute, msg, sleep, printLogo } from './common.js';

// Import tasks
import appInstall from './tasks/appinstall.task.js';
import debloat from './tasks/debloat.task.js';

const tasks = {
    debloat: debloat,
    appInstall: appInstall,
    disableWin11CxtMenu: async () => {
        printLogo('Explorer Tweaks');
        console.log(msg.info(`Disabling Windows 11 context menu...\n`));
        try {
            await execute(`reg add "HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\\InProcServer32" /f /ve`);
            console.log(msg.success(`\n✓ Success!`));
        } catch (e) {
            console.log(msg.error(`\n✗ Failed`));
        }
        return true;
    },
    explorerOpenToThisPC: async () => {
        printLogo('Explorer Tweaks');
        console.log(msg.info(`Setting File Explorer to open to "This PC"...\n`));
        try {
            await execute(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "LaunchTo" /t REG_DWORD /d 1 /f`);
            console.log(msg.success(`\n✓ Success!`));
        } catch (e) {
            console.log(msg.error(`\n✗ Failed`));
        }
        return true;
    },
    explorerShowExtensions: async () => {
        printLogo('Explorer Tweaks');
        console.log(msg.info(`Showing file extensions in File Explorer...\n`));
        try {
            await execute(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "HideFileExt" /t REG_DWORD /d 0 /f`);
            console.log(msg.success(`\n✓ Success!`));
        } catch (e) {
            console.log(msg.error(`\n✗ Failed`));
        }
        return true;
    },
    explorerDisableHomeTab: async () => {
        printLogo('Explorer Tweaks');
        console.log(msg.info(`Hiding "Home" tab in File Explorer...\n`));
        try {
            await execute(`reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "HubMode" /t REG_DWORD /d 1 /f`);
            await execute(`reg delete "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Desktop\\NameSpace_36354489\\{f874310e-b6b7-47dc-bc84-b9e6b38f5903}" /f`);
            console.log(msg.success(`\n✓ Success!`));
        } catch (e) {
            console.log(msg.error(`\n✗ Failed`));
        }
        return true;
    },
    enableSshAgent: async () => {
        printLogo('Enable ssh-agent');
        console.log(msg.info(`Enabling ssh-agent...\n`));
        try {
            await execute('elevate.cmd "enable-ssh-agent.bat"');
            console.log(msg.success(`\n✓ Success!`));
        } catch (e) {
            console.log(msg.error(`\n✗ Failed`));
        }
    },
    nvinstall: async () => {
        console.log('Installing NVIDIA Graphics Driver...');
    }
}

export default tasks;