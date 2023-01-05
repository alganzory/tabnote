import * as vscode from "vscode";
import { getNotes, editNote } from "../utils/notesOperations";
import updateStatusBar from "../utils/statusBar";
import { NoteItem } from "../NoteItem";

export async function viewEditCurrentNote(
	context: vscode.ExtensionContext,
	refreshView: () => void
) {
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

	if (!existingNote || existingNote === "") {
		return;
	}

	await viewEditNoteHelper(
		existingNote,
		context,
		refreshView,
		vscode.window.activeTextEditor.document.fileName
	);
}

export async function videwEditNoteItemCommand(
	context: vscode.ExtensionContext,
	refreshView: () => void,
	noteItem: NoteItem
) {
	// read the notes
	let notes = getNotes(context);
	let existingNote = notes[noteItem.fileName];

	if (!existingNote || existingNote === "") {
		return;
	}

	await viewEditNoteHelper(
		existingNote,
		context,
		refreshView,
		noteItem.fileName
	);
}

async function viewEditNoteHelper(
	existingNote = "",
	context: vscode.ExtensionContext,
	refreshView: () => void,
	fileName: string
) {
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
			await editNote(context, fileName, note);

			// Update the status bar with the new note if it's the active tab
			if (vscode.window.activeTextEditor) {
				if (
					vscode.window.activeTextEditor.document.fileName ===
					fileName
				) {
					updateStatusBar(note);
				}
			}

			// Refresh the view
			refreshView();
		});
}
