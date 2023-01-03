const vscode = require("vscode");
const { getNotes, editNote } = require("../utils/notesOperations");
const { updateStatusBar } = require("../utils/statusBar");

module.exports = async function (context) {
	// Check if there is an active text editor
	if (!vscode.window.activeTextEditor) {
		vscode.window.showErrorMessage(
			"Cannot view/edit a note. No active text editor found."
		);
		return;
	}

	// read the notes
	let notes = getNotes(context);
	let existingNote = notes[vscode.window.activeTextEditor.document.fileName];
	// Show the full note in an input box
	vscode.window
		.showInputBox({
			value: existingNote || "",
			// move the cursor to the end of the note
			valueSelection: [
				existingNote ? existingNote.length : 0,
				existingNote ? existingNote.length : 0,
			],
			placeHolder: "Enter a note for this tab",
			prompt: "View/Edit note for this tab",
		})
		.then(async function (note) {
			// If the user clicked "Cancel" or entered no new note, do nothing
			if (note === undefined || note === existingNote) {
				return;
			}
			// update the notes object with the new note
			await editNote(
				context,
				vscode.window.activeTextEditor.document.fileName,
				note
			);

			// Update the status bar with the new note
			updateStatusBar(note);
		});
};
