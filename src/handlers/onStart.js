const vscode = require("vscode");
const { getNotes } = require("../utils/notesOperations");
const { updateStatusBar } = require("../utils/statusBar");

module.exports = function (context) {
	if (vscode.window.activeTextEditor) {
		const notes = getNotes(context);
		if (vscode.window.activeTextEditor.document.fileName in notes) {
			updateStatusBar(
				notes[vscode.window.activeTextEditor.document.fileName]
			);
		}
	} else {
		updateStatusBar();
	}
};
