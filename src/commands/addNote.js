const vscode = require("vscode");
const { addNote } = require("../utils/notesOperations");
const { updateStatusBar } = require("../utils/statusBar");

module.exports = function (context) {
	// Check if there is an active text editor
	if (!vscode.window.activeTextEditor) {
		vscode.window.showErrorMessage(
			"Cannot add a note. No active text editor found."
		);
		return;
	}

	// Show an input box to get the note from the user
	vscode.window.showInputBox().then(function (note) {
		// add the note to the notes object
		addNote(
			context,
			vscode.window.activeTextEditor.document.fileName,
			note
		);

		updateStatusBar(note);
	});
};
