// Imports
import inquirer from 'inquirer';
import { printLogo, msg, sleep } from './common.js';
import tasks from './tasks.js';

printLogo('Select the tasks you want me to perform');

const answer = await inquirer.prompt({
    type: 'checkbox',
    message: 'Select tasks',
    name: 'tasks',
    pageSize: 20,
    choices: [
        new inquirer.Separator('----- Software Installation -----'),
        {name: 'Remove Windows Bloatware', value: 'debloat', checked: true},
        {name: 'Install Common Apps', value: 'appInstall', checked: true},
        new inquirer.Separator('----- Explorer Tweaks -----'),
        {name: 'Disable Windows 11 (WinUI) Context Menu', value: 'disableWin11CxtMenu', checked: true},
        {name: 'Set File Explorer to open to This PC', value: 'explorerOpenToThisPC', checked: true},
        {name: 'Show File Extensions in File Explorer', value: 'explorerShowExtensions', checked: true},
        {name: 'Hide Home tab in File Explorer', value: 'explorerDisableHomeTab', checked: true},
        new inquirer.Separator('----- Other Tasks -----'),
        {name: 'Enable ssh-agent', value: 'enableSshAgent', checked: true},
        //{name: 'Install NVIDIA Graphics Driver', value: 'nvinstall', checked: false},
    ],
    validate: function(answer) {
        return answer.length < 1 ? 'So... we\'re doing nothing? Pick something pls.' : true;
    }
});

printLogo();

const taskCompleted = {};

for (const task of answer.tasks) {
    taskCompleted[task] = false;
    const result = await tasks[task]();
    taskCompleted[task] = result;
}

console.log(msg.success('\nAll tasks completed! Exiting in 5 seconds...'));
await sleep(5000);
process.exit(0);