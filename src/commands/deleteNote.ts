import * as vscode from "vscode";
import { deleteNote } from "../utils/notesOperations";
import updateStatusBar from "../utils/statusBar";
import { NoteItem } from "../NoteItem";
import { DELETE_CURRENT_NOTE_COMMAND_ERROR_MESSAGE } from "../constants";

export async function deleteCurrentNoteCommand(
	context: vscode.ExtensionContext,
	refreshView: () => void
) {
	// Check if there is an active text editor
	if (!vscode.window.activeTextEditor) {
		vscode.window.showErrorMessage(DELETE_CURRENT_NOTE_COMMAND_ERROR_MESSAGE);
		return;
	}

	await deleteCommandHelper(
		context,
		vscode.window.activeTextEditor?.document.fileName,
		refreshView
	);
}

export async function deleteNoteItemCommand(
	context: vscode.ExtensionContext,
	refreshView: () => void,
	noteItem: NoteItem
) {
	await deleteCommandHelper(context, noteItem.fileName, refreshView);
}

async function deleteCommandHelper(
	context: vscode.ExtensionContext,
	fileName: string,
	refreshView: () => void
) {
	// Delete the note for the active tab
	await deleteNote(context, fileName);

	// Update the status bar with the new note if it's the active tab
	if (vscode.window.activeTextEditor?.document.fileName === fileName) {
		updateStatusBar("", context);
	}

	// Refresh the view
	refreshView();
}
