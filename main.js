// Imports
import inquirer from 'inquirer';
import { executeNoFail, printLogo, msg, sleep } from './common.js';
import tasks from './tasks.js';

async function main() {
	printLogo('Select the tasks you want me to perform');
	const answer = await inquirer.prompt({
		type: 'checkbox',
		message: 'Select tasks',
		name: 'tasks',
		loop: false,
		pageSize: 20,
		choices: [
			new inquirer.Separator('----- Software Installation -----'),
			{name: 'Remove Windows Bloatware', value: 'debloat', checked: true},
			{name: 'Install Common Apps', value: 'appInstall', checked: true},
			{name: 'Disable "Microsoft Consumer Experiences" (bloatware and ads)', value: 'disableConsumerExperience', checked: true},
			new inquirer.Separator('----- Explorer Tweaks -----'),
			{name: 'Disable Windows 11 (WinUI) Context Menu', value: 'disableWin11CxtMenu', checked: true},
			{name: 'Disable Lock Screen Ads', value: 'disableLockScreenAds', checked: true},
			{name: 'Disable Start Menu Recommendations', value: 'disableStartMenuRecommendations', checked: false},
			{name: 'Disable Start Menu Bing Search', value: 'disableStartMenuWebSearch', checked: true},
			{name: 'Disable Edge Startup Boost', value: 'disableEdgeStartupBoost', checked: true},
			{name: 'Disable Telemetry Data Collection', value: 'disableTelemetry', checked: true},
			{name: 'Enable Developer Mode', value: 'enableDevMode', checked: true},
			{name: 'Set File Explorer to open to This PC', value: 'explorerOpenToThisPC', checked: true},
			{name: 'Show File Extensions in File Explorer', value: 'explorerShowExtensions', checked: true},
			{name: 'Hide Home tab in File Explorer', value: 'explorerDisableHomeTab', checked: true},
			{name: 'Enable Dark Mode', value: 'explorerEnableDarkMode', checked: true},
			{name: 'Enable "End Task" in Taskbar Context Menu', value: 'explorerEnableTaskbarEndTask', checked: true},
			{name: 'Disable Taskbar Search Box', value: 'explorerDisableTaskbarSearch', checked: true},
			{name: 'Disable Taskbar "Task View" Icon', value: 'explorerDisableTaskbarTaskView', checked: true},
			{name: 'Disable Taskbar "Chat" Icon', value: 'explorerDisableTaskbarChat', checked: true},
			{name: 'Disable Taskbar "Widgets" Icon', value: 'explorerDisableTaskbarWidgets', checked: true},
			{name: 'Disable "Previous Versions" and remove context menu item', value: 'explorerDisablePreviousVersions', checked: true},
			{name: 'Delete Superfluous Folders in User Profile', value: 'deleteExtraProfileDirs', checked: false},
			new inquirer.Separator('----- Remove Context Menu Items -----'),
			{name: 'Remove "Give Access To..."', value: 'explorerDisableCxtGiveAccessTo', checked: true},
			{name: 'Remove "Scan with Microsoft Defender..."', value: 'explorerDisableCxtScanWithDefender', checked: true},
			{name: 'Remove "Add to Favorites"', value: 'explorerDisableCxtAddToFavorites', checked: true},
			{name: 'Remove "Share"', value: 'explorerDisableCxtShare', checked: true},
			new inquirer.Separator('----- Other Tasks -----'),
			{name: 'Enable Windows Sandbox', value: 'enableSandboxFeature', checked: false},
			{name: 'Enable ssh-agent', value: 'enableSshAgent', checked: false}
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
		await sleep(1000);
	}

	console.log(msg.success('==> All tasks completed!\n'));

	const startOver = await inquirer.prompt({
		type: 'confirm',
		name: 'do',
		message: 'Would you like to do something else?',
		default: true,
	});

	if (startOver.do) main();
	else {
		const reboot = await inquirer.prompt({
			type: 'confirm',
			name: 'do',
			message: 'Do you want to reboot now?',
			default: false
		});
		if (reboot.do) {
			await executeNoFail('shutdown /r /t 0', 'Rebooting Windows...');
			await sleep(2500);
		} else {
			const restartExplorer = await inquirer.prompt({
				type: 'confirm',
				name: 'do',
				message: 'Can we restart Explorer at least? 👉👈',
				default: true
			});
			if (restartExplorer.do) {
				await executeNoFail('taskkill /f /im explorer.exe', 'Killing Explorer...');
				await executeNoFail('start explorer.exe', 'Relaunching Explorer...');
			}
		}
	}

}

main();