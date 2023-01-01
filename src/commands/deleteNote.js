const vscode = require("vscode");
const { deleteNote } = require("../utils/notesOperations");
const { updateStatusBar } = require("../utils/statusBar");

module.exports = async function () {
	// Check if there is an active text editor
	if (!vscode.window.activeTextEditor) {
		vscode.window.showErrorMessage(
			"Cannot delete a note. No active text editor found."
		);
		return;
	}

	// Delete the note for the active tab
	await deleteNote [vscode.window.activeTextEditor.document.fileName];

	// Update the status bar with the new note
	updateStatusBar();
};
