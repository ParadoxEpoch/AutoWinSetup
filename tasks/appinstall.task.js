import inquirer from "inquirer";
import { execute, printLogo, msg } from "../common.js";
import downloadBinary from "@paradoxepoch/node-file-downloader";

const appList = [
	{
		id: "NVUpdater",
		url: "https://www.sys-worx.net/filebase/download/67/",
		name: "NV Updater (Nvidia Driver Updater)",
		launchArgs: "",
		source: "http"
	},
	{
		id: "7zip.7zip",
		name: "7zip",
		source: "winget"
	},
	{
		id: "Valve.Steam",
		name: "Steam",
		source: "winget"
	},
	{
		id: "voidtools.Everything",
		name: "Everything",
		source: "winget"
	},
	{
		id: "AntibodySoftware.WizTree",
		name: "WizTree",
		source: "winget"
	},
	{
		id: "GitHub.GitHubDesktop",
		name: "GitHub Desktop",
		source: "winget"
	},
	{
		id: "Microsoft.VisualStudioCode",
		name: "Visual Studio Code",
		source: "winget"
	},
	{
		id: "Spotify.Spotify",
		name: "Spotify",
		source: "winget"
	},
	{
		id: "AgileBits.1Password",
		name: "1Password",
		source: "winget"
	},
	{
		id: "VideoLAN.VLC",
		name: "VLC",
		source: "winget"
	},
	{
		id: "Plex.Plex",
		name: "Plex",
		source: "winget"
	},
	{
		id: "PowerSoftware.AnyBurn",
		name: "AnyBurn",
		source: "winget"
	},
	{
		id: "HulubuluSoftware.AdvancedRenamer",
		name: "Advanced Renamer",
		source: "winget"
	},
	{
		id: "Discord.Discord",
		name: "Discord",
		source: "winget"
	},
	{
		id: "MHNexus.HxD",
		name: "HxD",
		source: "winget"
	},
	{
		id: "AppWork.JDownloader",
		name: "JDownloader",
		source: "winget"
	},
	{
		id: "Postman.Postman",
		name: "Postman",
		source: "winget"
	},
	{
		id: "PrivateInternetAccess.PrivateInternetAccess",
		name: "Private Internet Access",
		source: "winget"
	},
	{
		id: "PlayStation.PSRemotePlay",
		name: "PS Remote Play",
		source: "winget"
	},
	{
		id: "qBittorrent.qBittorrent",
		name: "qBittorrent",
		source: "winget"
	},
	{
		id: "TablePlus.TablePlus",
		name: "TablePlus",
		source: "winget"
	},
	{
		id: "CodeSector.TeraCopy",
		name: "TeraCopy",
		source: "winget"
	},
	{
		id: "StartIsBack.StartAllBack",
		name: "StartAllBack",
		source: "winget"
	},
	{
		id: "eliboa.TegraRcmGUI",
		name: "TegraRcmGUI",
		source: "winget"
	},
	{
		id: "Notion.Notion",
		name: "Notion",
		source: "winget"
	},
	{
		id: "VMware.WorkstationPro",
		name: "VMware Workstation Pro",
		source: "winget"
	},
	{
		id: "Microsoft.PowerToys",
		name: "PowerToys",
		source: "winget"
	},
	{
		id: "Gyan.FFmpeg",
		name: "FFmpeg",
		source: "winget"
	},
	{
		id: "RockstarGamesLauncher",
		url: "https://gamedownloads.rockstargames.com/public/installer/Rockstar-Games-Launcher.exe",
		name: "Rockstar Games Launcher",
		launchArgs: "",
		source: "http"
	}
]

export default async function main() {
	printLogo("Install Common Apps");

	// Create choices array based on appList
	const choices = [];
	for (const app of appList) {
		choices.push({
			name: app.name,
			value: app.id,
			checked: false
		});
	}

	const answer = await inquirer.prompt({
		type: "checkbox",
		message: "Select apps to install",
		name: "apps",
		pageSize: 20,
		loop: false,
		choices: choices
	});

	printLogo('Installing apps...');

	for (const appId of answer.apps) {
		const app = appList.find(x => x.id === appId);
		console.log(msg.info(`Installing ${app.name}...`));
		try {
			if (app.source === "winget") {
				await execute(`winget install --accept-package-agreements --accept-source-agreements -e --id ${app.id}`);
			} else if (app.source === "http") {
				const tmpFile = await downloadBinary(app.url, null, {
					downloadMsg: null,
					successMsg: null
				});
				await execute(`"${tmpFile}" ${app.launchArgs || ''}`);
			} else {
				console.log(msg.error(`✗ Unknown source for ${app.name}\n`));
			}
			
			console.log(msg.success(`✓ Installation complete!\n`));
		} catch (e) {
			console.log(msg.error(`✗ Error installing ${app.name}\n`));
		}
	}

	console.log(msg.success("✓ Software installation complete!\n"));
	return true;
}