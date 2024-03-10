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
			{name: 'Remove Windows Bloatware...', value: 'debloat', checked: false},
			{name: 'Install Common Apps...', value: 'appInstall', checked: false},
			new inquirer.Separator('----- Windows Tweaks -----'),
			{name: 'Disable "Microsoft Consumer Experiences" (bloatware and ads)', value: 'disableConsumerExperience', checked: false},
			{name: 'Disable Fast Startup', value: 'disableFastStartup', checked: false},
			{name: 'Remove Duplicate Drive Entries in Navigation Pane', value: 'removeDuplicateDrives', checked: false},
			{name: 'Disable Gallery in File Explorer', value: 'disableGallery', checked: false},
			{name: 'Disable Windows 11 (WinUI) Context Menu', value: 'disableWin11CxtMenu', checked: false},
			{name: 'Disable Lock Screen Ads', value: 'disableLockScreenAds', checked: false},
			{name: 'Disable Start Menu Recommendations', value: 'disableStartMenuRecommendations', checked: false},
			{name: 'Disable Start Menu Bing Search', value: 'disableStartMenuWebSearch', checked: false},
			{name: 'Disable Edge Startup Boost', value: 'disableEdgeStartupBoost', checked: false},
			{name: 'Disable Telemetry Data Collection', value: 'disableTelemetry', checked: false},
			{name: 'Enable Developer Mode', value: 'enableDevMode', checked: false},
			{name: 'Set File Explorer to open to This PC', value: 'explorerOpenToThisPC', checked: false},
			{name: 'Show File Extensions in File Explorer', value: 'explorerShowExtensions', checked: false},
			{name: 'Hide Home tab in File Explorer', value: 'explorerDisableHomeTab', checked: false},
			{name: 'Prevent Auto Folder View Changes', value: 'explorerPreventFolderViewChanges', checked: false},
			{name: 'Enable Dark Mode', value: 'explorerEnableDarkMode', checked: false},
			{name: 'Enable "End Task" in Taskbar Context Menu', value: 'explorerEnableTaskbarEndTask', checked: false},
			{name: 'Disable Taskbar Search Box', value: 'explorerDisableTaskbarSearch', checked: false},
			{name: 'Disable Taskbar "Task View" Icon', value: 'explorerDisableTaskbarTaskView', checked: false},
			{name: 'Disable Taskbar "Chat" Icon', value: 'explorerDisableTaskbarChat', checked: false},
			{name: 'Disable Taskbar "Widgets" Icon', value: 'explorerDisableTaskbarWidgets', checked: false},
			{name: 'Disable "Previous Versions" and remove context menu item', value: 'explorerDisablePreviousVersions', checked: false},
			{name: 'Add Local Network to Intranet Zone', value: 'addLocalNetworkToIntranetZone', checked: false},
			{name: 'Force Enable European DMA Compliance', value: 'forceEnableDMACompliance', checked: false},
			{name: 'Delete Superfluous Folders in User Profile', value: 'deleteExtraProfileDirs', checked: false},
			new inquirer.Separator('----- Install Routine Tasks -----'),
			{name: 'Remove Steam Game Uninstall Links', value: 'removeSteamUninstallLinks', checked: false},
			new inquirer.Separator('----- Remove Context Menu Items -----'),
			{name: 'Remove "Give Access To..."', value: 'explorerDisableCxtGiveAccessTo', checked: false},
			{name: 'Remove "Scan with Microsoft Defender..."', value: 'explorerDisableCxtScanWithDefender', checked: false},
			{name: 'Remove "Add to Favorites"', value: 'explorerDisableCxtAddToFavorites', checked: false},
			{name: 'Remove "Share"', value: 'explorerDisableCxtShare', checked: false},
			{name: 'Remove "Cast to Device"', value: 'explorerDisableCtxCastToDevice', checked: false},
			{name: 'Remove "Print"', value: 'explorerDisableCtxPrint', checked: false},
			{name: 'Remove Image "Rotate Left" and "Rotate Right"', value: 'explorerDisableCtxImageRotation', checked: false},
			new inquirer.Separator('----- Other Tasks -----'),
			{name: 'Import ExplorerPatcher Settings', value: 'importExplorerPatcherSettings', checked: false},
			{name: 'Import AppData configs', value: 'importAppDataConfigs', checked: false},
			//{name: 'Clean up Start Menu folders', value: 'cleanupStartMenu', checked: false},
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
			message: 'Do you want to reboot now? (some changes won\'t take effect until you do)',
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