import * as vscode from "vscode";
import { getNotes, editNote } from "../utils/notesOperations";
import updateStatusBar from "../utils/statusBar";
import { NoteItem } from "../NoteItem";
import {
	VIEW_EDIT_CURRENT_NOTE_COMMAND_ERROR_MESSAGE,
	VIEW_EDIT_NOTE_INPUT_DEFAULT_PLACEHOLDER,
	VIEW_EDIT_NOTE_INPUT_DEFAULT_PROMPT,
	VIEW_EDIT_NOTE_INPUT_DEFAULT_VALUE,
	VIEW_EDIT_NOTE_ITEM_INPUT_PLACEHOLDER,
	VIEW_EDIT_NOTE_ITEM_INPUT_PROMPT,
} from "../constants";

export async function viewEditCurrentNote(
	context: vscode.ExtensionContext,
	refreshView: () => void
) {
	// Check if there is an active text editor
	if (!vscode.window.activeTextEditor) {
		vscode.window.showErrorMessage(
			VIEW_EDIT_CURRENT_NOTE_COMMAND_ERROR_MESSAGE
		);
		return;
	}

	// read the notes
	let notes = getNotes(context);
	let existingNote = notes[vscode.window.activeTextEditor.document.fileName];

	await viewEditNoteHelper(
		existingNote,
		context,
		refreshView,
		vscode.window.activeTextEditor.document.fileName
	);
}

export async function viewEditNoteItemCommand(
	context: vscode.ExtensionContext,
	refreshView: () => void,
	noteItem: NoteItem
) {
	// read the notes
	let notes = getNotes(context);
	let existingNote = notes[noteItem.fileName];

	await viewEditNoteHelper(
		existingNote,
		context,
		refreshView,
		noteItem.fileName,
		VIEW_EDIT_NOTE_ITEM_INPUT_PLACEHOLDER(noteItem.shorterFileName),
		VIEW_EDIT_NOTE_ITEM_INPUT_PROMPT(noteItem.shorterFileName)
	);
}

async function viewEditNoteHelper(
	existingNote = "",
	context: vscode.ExtensionContext,
	refreshView: () => void,
	fileName: string,
	placeHolder: string = VIEW_EDIT_NOTE_INPUT_DEFAULT_PLACEHOLDER,
	prompt: string = VIEW_EDIT_NOTE_INPUT_DEFAULT_PROMPT
) {
	vscode.window
		.showInputBox({
			value: existingNote || VIEW_EDIT_NOTE_INPUT_DEFAULT_VALUE,
			// move the cursor to the end of the note
			valueSelection: [
				existingNote ? existingNote.length : 0,
				existingNote ? existingNote.length : 0,
			],
			placeHolder: placeHolder,
			prompt: prompt,
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
					updateStatusBar(note, context);
				}
			}

			// Refresh the view
			refreshView();
		});
}
