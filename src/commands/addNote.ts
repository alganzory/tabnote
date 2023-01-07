import * as vscode from "vscode";
import { addNote } from "../utils/notesOperations";
import updateStatusBar from "../utils/statusBar";
import { ADD_NOTE_COMMAND_ERROR_MESSAGE } from "../constants";

export default async function (
	context: vscode.ExtensionContext,
	refreshView: () => void
) {
	// Check if there is an active text editor
	if (!vscode.window.activeTextEditor) {
		vscode.window.showErrorMessage(ADD_NOTE_COMMAND_ERROR_MESSAGE);
		return;
	}

	// Show an input box to get the note from the user
	vscode.window.showInputBox().then(async function (note) {
		// add the note to the notes object
		await addNote(
			context,
			vscode.window.activeTextEditor!.document.fileName,
			note!
		);

		// Update the status bar with the new note
		updateStatusBar(note);

		// Refresh the view
		refreshView();
	});
}
