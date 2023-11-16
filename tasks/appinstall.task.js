import inquirer from "inquirer";
import { execute, printLogo, msg } from "../common.js";
import axios from 'axios';
import fs from 'fs';
import tmp from 'tmp';
import progress from 'progress-stream';
import ProgressBar from 'cli-progress';

tmp.setGracefulCleanup();

const appList = [
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
                await execute(`winget install -e --id ${app.id}`);
            } else if (app.source === "http") {
                const tmpFile = await downloadBinary(app.url);
                await execute(`"${tmpFile}" ${app.launchArgs || ''}`);
            } else {
                console.log(msg.error(`✗ Unknown source for ${app.name}\n`));
            }
            
            console.log(msg.success(`✓ Installation complete!\n`));
        } catch (e) {
            console.log(msg.error(`✗ Error installing ${app.name}\n`));
        }
    }

    console.log(msg.success("Software installation complete!"));
    return true;
}

const downloadBinary = async (url) => {
    try {
        const response = await axios.get(url, {
            responseType: 'stream',
            maxRedirects: 5,
        });

        const tmpFile = tmp.tmpNameSync({ postfix: '.exe' });

        const writer = fs.createWriteStream(tmpFile);

        var str;
        if (response.headers['content-length'] !== undefined) {

            const progressBar = new ProgressBar.SingleBar({}, ProgressBar.Presets.shades_classic);
            progressBar.start(parseInt(response.headers['content-length']), 0);

            str = progress({
                length: response.headers['content-length'],
                time: 100,
            });

            str.on('progress', function (progress) {
                progressBar.update(progress.transferred);
            });

            response.data.pipe(str).pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', () => {
                    progressBar.stop();
                    resolve(tmpFile);
                });
                writer.on('error', reject);
            });
        } else {
            console.log(msg.bold("Downloading, please wait..."));
            response.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', () => resolve(tmpFile));
                writer.on('error', reject);
            });
        }
        return tmpFile;
    } catch (err) {
        console.log(msg.error('Error downloading file'));
        console.error(err);
    }
};