import inquirer from "inquirer";
import { execute, printLogo, msg } from "../common.js";

const appList = [
    {
        id: "9P1J8S7CCWWT",
        name: "Clipchamp"
    },
    {
        id: "9NFFX4SZZ23L",
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
        id: "9WZDNCRDTBVB",
        name: "Maps"
    },
    {
        id: "9WZDNCRFJ3PT",
        name: "Media Player"
    },
    {
        id: "9WZDNCRFJ1P3 Microsoft.OneDrive",
        name: "OneDrive"
    },
    {
        id: "9WZDNCRFJBMP XP8BT8DW290MPQ Microsoft.Teams",
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
        id: "9P7BP5VNWKX5",
        name: "Quick Assist"
    },
    {
        id: "9NBLGGH4QGHW",
        name: "Sticky Notes"
    },
    {
        id: "9WZDNCRDTBJJ",
        name: "Tips"
    },
    {
        id: "9WZDNCRFHWKN",
        name: "Voice Recorder"
    },
    {
        id: "9WZDNCRFJ3Q2",
        name: "Weather"
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
            await execute(`winget uninstall --accept-source-agreements --id ${app}`);
            console.log(msg.success(`✓ Success!\n`));
        } catch (e) {
            console.log(msg.error(`✗ Error removing ${appName}\n`));
        }
    }

    console.log(msg.success("✓ Bloatware removal complete!\n"));
    return true;
}