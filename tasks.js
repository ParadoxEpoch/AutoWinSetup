import ora from 'ora';
import { msg, sleep } from './common.js';

const tasks = {
    debloat: async () => {
        const spinner = ora(msg.info(`Removing Windows bloatware...`)).start();
        await sleep(3000);
        spinner.succeed(msg.success(`Bloatware removal completed!`));
        return true;
    },
    appInstall: async () => {
        const spinner = ora(msg.info(`Installing common apps...`)).start();
        await sleep(3000);
        spinner.succeed(msg.success(`App installation complete!`));
        return false;
    },
    disableWin11CxtMenu: async () => {
        const spinner = ora(msg.info(`Disabling Windows 11 context menu...`)).start();
        await sleep(1000);
        spinner.succeed(msg.success(`Windows 11 context menu disabled!`));
        return true;
    },
    explorerOpenToThisPC: async () => {
        console.log('Setting File Explorer to open to This PC...');
    },
    explorerShowExtensions: async () => {
        console.log('Showing file extensions in File Explorer...');
    },
    explorerDisableHomeTab: async () => {
        console.log('Hiding Home tab in File Explorer...');
    },
    enableSshAgent: async () => {
        console.log('Enabling ssh-agent...');
    },
    nvinstall: async () => {
        console.log('Installing NVIDIA Graphics Driver...');
    }
}

export default tasks;