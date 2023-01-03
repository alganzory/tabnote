import * as vscode from "vscode";
import { deleteNote } from "../utils/notesOperations";
import updateStatusBar from "../utils/statusBar";

export default async function (context: vscode.ExtensionContext) {
	// Check if there is an active text editor
	if (!vscode.window.activeTextEditor) {
		vscode.window.showErrorMessage(
			"Cannot delete a note. No active text editor found."
		);
		return;
	}

	// Delete the note for the active tab
	await deleteNote(context, vscode.window.activeTextEditor.document.fileName);

	// Update the status bar with the new note
	updateStatusBar();
}
