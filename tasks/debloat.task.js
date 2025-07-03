import inquirer from "inquirer";
import { execute, printLogo, msg } from "../common.js";

const appList = [
	{
		id: "9MSSGKG348SP",
		name: "Windows Web Experience Pack (Widgets)"
	},
	{
		id: "Microsoft.Microsoft3DViewer_8wekyb3d8bbwe",
		name: "3D Viewer"
	},
	{
		id: "9NZBF4GT040C",
		name: "Bing"
	},
	{
		id: "9P1J8S7CCWWT",
		name: "Clipchamp"
	},
	{
		id: "9NHT9RB2F4HD",
		name: "Copilot"
	},
	{
		id: "9NFFX4SZZ23L Microsoft.549981C3F5F10",
		name: "Cortana"
	},
	{
		id: "9WZDNCRFJBBG",
		name: "Camera"
	},
	{
		id: "9WZDNCRFJ3PR",
		name: "Clock"
	},
	{
		id: "9NBLGGH4R32N",
		name: "Feedback Hub"
	},
	{
		id: "9PKDZBMV1H3T",
		name: "Get Help"
	},
	{
		id: "9WZDNCRFHVQM",
		name: "Mail and Calendar"
	},
	{
		id: "9NRX63209R7B",
		name: "Outlook for Windows (new) (Web App)"
	},
	{
		id: "9WZDNCRD29V9",
		name: "Microsoft 365 (Office) (Web App)"
	},
	{
		id: "9WZDNCRDTBVB Microsoft.WindowsMaps_8wekyb3d8bbwe",
		name: "Maps"
	},
	{
		id: "9WZDNCRFJ3PT",
		name: "Media Player"
	},
	{
		id: "Microsoft.MixedReality.Portal_8wekyb3d8bbwe",
		name: "Mixed Reality Portal"
	},
	{
		id: "9WZDNCRFJ1P3 Microsoft.OneDrive",
		name: "OneDrive"
	},
	{
		id: "Microsoft.Office.OneNote_8wekyb3d8bbwe",
		name: "OneNote"
	},
	{
		id: "Microsoft.People_8wekyb3d8bbwe",
		name: "People"
	},
	{
		id: "Microsoft.ScreenSketch_8wekyb3d8bbwe",
		name: "Snip & Sketch"
	},
	{
		id: "XP8BT8DW290MPQ Microsoft.Teams",
		name: "Teams"
	},
	{
		id: "9NBLGGH5R558",
		name: "To Do"
	},
	{
		id: "9WZDNCRFJ3P2",
		name: "Films and TV"
	},
	{
		id: "9WZDNCRFHVFW",
		name: "News"
	},
	{
		id: "Microsoft.YourPhone_8wekyb3d8bbwe",
		name: "Phone Link"
	},
	{
		id: "Microsoft.Windows.Photos_8wekyb3d8bbwe",
		name: "Photos"
	},
	{
		id: "9P7BP5VNWKX5",
		name: "Quick Assist"
	},
	{
		id: "9MSPC6MP8FM4 Microsoft.Whiteboard",
		name: "Whiteboard"
	},
	{
		id: "9NBLGGH4QGHW",
		name: "Sticky Notes"
	},
	{
		id: "Microsoft.Skype Microsoft.SkypeApp_kzf8qxf38zg5c",
		name: "Skype"
	},
	{
		id: "9WZDNCRDTBJJ Microsoft.Getstarted_8wekyb3d8bbwe",
		name: "Tips"
	},
	{
		id: "9WZDNCRFHWKN",
		name: "Voice Recorder"
	},
	{
		id: "9WZDNCRFJ3Q2",
		name: "Weather"
	},
	{
		id: "Microsoft.XboxApp_8wekyb3d8bbwe",
		name: "Xbox Console Companion"
	},
	{
		id: "Microsoft.XboxGameOverlay_8wekyb3d8bbwe Microsoft.XboxGamingOverlay_8wekyb3d8bbwe",
		name: "Xbox Game Bar"
	}
]

export default async function main() {
	printLogo("Remove Windows Bloatware");

	// Create choices array based on appList
	const choices = [];
	for (const app of appList) {
		choices.push({
			name: app.name,
			value: app.id,
			checked: true
		});
	}

	const answer = await inquirer.prompt({
		type: "checkbox",
		message: "Select apps to remove",
		name: "apps",
		pageSize: 20,
		loop: false,
		choices: choices
	});

	printLogo('Removing Bloatware...');

	for (const app of answer.apps) {
		const appName = appList.find(x => x.id === app).name;
		try {
			console.log(msg.info(`Removing ${appName}...`));
			let didFail = false;
			let didRemove = false;
			// Split app ids by space and remove each one separately, since one ID failing to uninstall will cause the whole command to fail
			const apps = app.split(" ");
			for (const a of apps) {
				try {
					await execute(`winget uninstall --accept-source-agreements ${a}`);
					didRemove = true;
				} catch (e) {
					// If exit code is 2316632084, the package was not found / is not installed
					didFail = e.cause === 2316632084 ? false : true;
				}
			}
			if (didFail) throw new Error();
			didRemove
				? console.log(msg.success(`✓ Success!\n`))
				: console.log(msg.warn(`⚠  Couldn't find ${appName}, it's probably not installed\n`));
			
		} catch (e) {
			console.log(msg.error(`✗ Error removing ${appName}\n`));
		}
	}

	console.log(msg.success("✓ Bloatware removal complete!\n"));
	return true;
}
