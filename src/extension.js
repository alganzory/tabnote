const vscode = require("vscode");

const getRegisteredCommands = require("./commands");
const onTabChange = require("./handlers/onTabChange");
const onStart = require("./handlers/onStart");

// This function is called when the extension is activated
function activate(context) {
	console.log("Note extension is now active!");

	// upon starting VS Code, check if there is a note for the active tab, and display it in the status bar
	onStart(context);

	// Push all the commands to the context
	context.subscriptions.push(...getRegisteredCommands(context));

	// upon opening a file, check if there is a note for it, and display it in the status bar
	vscode.window.onDidChangeActiveTextEditor((editor) => onTabChange(editor, context));
}

// This function is called when the extension is deactivated
function deactivate() {
	console.log("Note extension is now inactive.");
}

exports.activate = activate;
exports.deactivate = deactivate;
