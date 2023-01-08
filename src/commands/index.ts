import * as vscode from "vscode";
import addNoteCommand from "./addNote";
import { viewEditCurrentNote, viewEditNoteItemCommand } from "./viewEditNote";
import { deleteCurrentNoteCommand, deleteNoteItemCommand } from "./deleteNote";
import { NoteItem } from "../NoteItem";
import {
	ADD_NOTE_COMMAND_ID,
	DELETE_CURRENT_NOTE_COMMAND_ID,
	DELETE_NOTE_ITEM_COMMAND_ID,
	REFRESH_NOTES_COMMAND_ID,
	VIEW_EDIT_CURRENT_NOTE_COMMAND_ID,
	VIEW_EDIT_NOTE_ITEM_COMMAND_ID,
	EXISTING_NOTES_CONTEXT_KEY,
	SEARCH_NOTES_COMMAND_ID,
	EXISTING_NOTES_LENGTH_CONTEXT_KEY,
} from "../constants";
import { getNotes } from "../utils/notesOperations";
import { searchNotesCommand } from "./searchNotes";

export default function getRegisteredCommands(
	context: vscode.ExtensionContext,
	refreshView: () => void
) {
	function refreshNotes() {
		// refresh the notes in the view
		refreshView();
		// refresh the notes in the custom context

		const notes = getNotes(context);
		vscode.commands.executeCommand(
			"setContext", // vscode internal command
			EXISTING_NOTES_CONTEXT_KEY,
			Object.keys(notes)
		);
		vscode.commands.executeCommand(
			"setContext", // vscode internal command
			EXISTING_NOTES_LENGTH_CONTEXT_KEY,
			Object.keys(notes).length
		);
	}

	refreshNotes();

	return [
		vscode.commands.registerCommand(
			ADD_NOTE_COMMAND_ID,
			async () => await addNoteCommand(context, refreshNotes)
		),
		vscode.commands.registerCommand(
			VIEW_EDIT_CURRENT_NOTE_COMMAND_ID,
			async () => await viewEditCurrentNote(context, refreshNotes)
		),
		vscode.commands.registerCommand(
			VIEW_EDIT_NOTE_ITEM_COMMAND_ID,
			async (noteItem: NoteItem) =>
				await viewEditNoteItemCommand(context, refreshNotes, noteItem)
		),
		vscode.commands.registerCommand(
			DELETE_CURRENT_NOTE_COMMAND_ID,
			async () => await deleteCurrentNoteCommand(context, refreshNotes)
		),
		vscode.commands.registerCommand(
			DELETE_NOTE_ITEM_COMMAND_ID,
			async (noteItem: NoteItem) =>
				await deleteNoteItemCommand(context, refreshNotes, noteItem)
		),

		vscode.commands.registerCommand(
			SEARCH_NOTES_COMMAND_ID,
			async () => await searchNotesCommand(context)
		),
		vscode.commands.registerCommand(REFRESH_NOTES_COMMAND_ID, refreshNotes),
	];
}
