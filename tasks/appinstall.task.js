import inquirer from "inquirer";
import { execute, printLogo, msg } from "../common.js";

const appList = [
    {
        id: "7zip.7zip",
        name: "7zip"
    },
    {
        id: "Valve.Steam",
        name: "Steam"
    },
    {
        id: "voidtools.Everything",
        name: "Everything"
    },
    {
        id: "AntibodySoftware.WizTree",
        name: "WizTree"
    },
    {
        id: "GitHub.GitHubDesktop",
        name: "GitHub Desktop"
    },
    {
        id: "Microsoft.VisualStudioCode",
        name: "Visual Studio Code"
    },
    {
        id: "Spotify.Spotify",
        name: "Spotify"
    },
    {
        id: "AgileBits.1Password",
        name: "1Password"
    },
    {
        id: "VideoLAN.VLC",
        name: "VLC"
    },
    {
        id: "Plex.Plex",
        name: "Plex"
    },
    {
        id: "PowerSoftware.AnyBurn",
        name: "AnyBurn"
    },
    {
        id: "HulubuluSoftware.AdvancedRenamer",
        name: "Advanced Renamer"
    },
    {
        id: "Discord.Discord",
        name: "Discord"
    },
    {
        id: "MHNexus.HxD",
        name: "HxD"
    },
    {
        id: "AppWork.JDownloader",
        name: "JDownloader"
    },
    {
        id: "Postman.Postman",
        name: "Postman"
    },
    {
        id: "PrivateInternetAccess.PrivateInternetAccess",
        name: "Private Internet Access"
    },
    {
        id: "PlayStation.PSRemotePlay",
        name: "PS Remote Play"
    },
    {
        id: "qBittorrent.qBittorrent",
        name: "qBittorrent"
    },
    {
        id: "TablePlus.TablePlus",
        name: "TablePlus"
    },
    {
        id: "CodeSector.TeraCopy",
        name: "TeraCopy"
    },
    {
        id: "StartIsBack.StartAllBack",
        name: "StartAllBack"
    },
    {
        id: "eliboa.TegraRcmGUI",
        name: "TegraRcmGUI"
    },
    {
        id: "Notion.Notion",
        name: "Notion"
    },
    {
        id: "VMware.WorkstationPro",
        name: "VMware Workstation Pro"
    },
    {
        id: "Microsoft.PowerToys",
        name: "PowerToys"
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
            checked: true
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

    for (const app of answer.apps) {
        const appName = appList.find(x => x.id === app).name;
        try {
            console.log(msg.info(`Installing ${appName}...`));
            await execute(`winget install -e --id ${app}`);
            console.log(msg.success(`✓ Installation complete!\n`));
        } catch (e) {
            console.log(msg.error(`✗ Error installing ${appName}\n`));
        }
    }

    console.log(msg.success("Software installation complete!"));
    return true;
}