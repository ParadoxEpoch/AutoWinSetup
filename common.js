import chalk from 'chalk';
import {spawn} from 'child_process';
export { chalk };

export const execute = (command) => {
	return new Promise((resolve, reject) => {
		const childProcess = spawn(command, { shell: true, stdio: 'inherit' });

		childProcess.on('close', (code) => {
			if (code === 0) {
				resolve(`Child process exited with code ${code}`);
			} else {
				reject(new Error(`Child process exited with code ${code}`));
			}
		});
	});
};

export const executeNoFail = (command, infoName) => {
	console.log(msg.bold(infoName || `Running: ${command}`));
	return new Promise((resolve) => {
		const childProcess = spawn(command, { shell: true, stdio: 'inherit' });

		childProcess.on('close', (code) => {
			console.log(code === 0 ? msg.success(`✓ Success!\n`) : msg.error(`✗ Failed\n`));
			resolve(code);
		});
	});
};

const msg = {
	bold: chalk.bold,
	info: chalk.bold.blue,
	link: chalk.underline.blue,
	//error: chalk.bgRed.hex('#cccccc'),
	error: chalk.bold.red,
	warn: chalk.bold.yellow,
	success: chalk.bold.green,
	brand: chalk.bold.hex('#7f00ff')
}
export { msg };

// * Adds padding to both side of a string to center align it to the ASCII logo in the console
function centerString(text) {
	if (text.length >= 46) return text; // If text is too long to center, do nothing.
	const padding = Math.floor((46 - text.length) / 2);
	return ' '.repeat(padding) + text + ' '.repeat(padding);
}

export function printLogo(text) {
	console.clear();
	console.log(chalk.bold.cyan("~~~ ParadoxEpoch's Auto Windows Setup ~~~"));
	console.log(msg.bold("   ___                    _           _        _         _       __    __ _       "));
	console.log(msg.bold("  / _ \\__ _ _ __ __ _  __| | _____  _( )__    /_\\  _   _| |_ ___/ / /\\ \\ (_)_ __  "));
	console.log(msg.bold(" / /_)/ _` | '__/ _` |/ _` |/ _ \\ \\/ // __|  //_\\\\| | | | __/ _ \\ \\/  \\/ / | '_ \\ "));
	console.log(msg.bold("/ ___/ (_| | | | (_| | (_| | (_) >  < \\__ \\ /  _  \\ |_| | || (_) \\  /\\  /| | | | |"));
	console.log(msg.bold("\\/    \\__,_|_|  \\__,_|\\__,_|\\___/_/\\_\\|___/ \\_/ \\_/\\__,_|\\__\\___/ \\/  \\/ |_|_| |_|\n"));
	if (text) console.log(msg.success(text + '\n'))
	/* console.log('----------------------------------------------');
	console.log(msg.bold(centerString(text || `Paradox's AutoWin`)));
	console.log('----------------------------------------------\n'); */
}

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const epochToDuration = (ms) => {
	const minutes = Math.floor(ms / 60000);
	const seconds = ((ms % 60000) / 1000).toFixed(0);
	return (
		seconds === 60
			? (minutes + 1) + ':00'
			: minutes + ':' + (seconds < 10 ? '0' : '') + seconds
	);
}