const vscode = require("vscode");

const statusBarItem = vscode.window.createStatusBarItem();

function updateStatusBar(note = "") {
	const displayNote = note.length > 10 ? note.substring(0, 10) + "..." : note;
	statusBarItem.command = "extension.viewEditNote";
	statusBarItem.text = `**TabNote:** ${displayNote}`;
	statusBarItem.show();
}

module.exports = {
	updateStatusBar,
};
