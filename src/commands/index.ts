import * as vscode from "vscode";
import addNoteCommand from "./addNote";
import { viewEditCurrentNote, viewEditNoteItemCommand } from "./viewEditNote";
import { deleteCurrentNoteCommand, deleteNoteItemCommand } from "./deleteNote";
import { NoteItem } from "../NoteItem";
import {
	ADD_NOTE_COMMAND_ID,
	DELETE_CURRENT_NOTE_COMMAND_ERROR_MESSAGE,
	DELETE_CURRENT_NOTE_COMMAND_ID,
	DELETE_NOTE_ITEM_COMMAND_ID,
	REFRESH_NOTES_COMMAND_ID,
	VIEW_EDIT_CURRENT_NOTE_COMMAND_ID,
	VIEW_EDIT_NOTE_ITEM_COMMAND_ID,
} from "../constants";

export default function getRegisteredCommands(
	context: vscode.ExtensionContext,
	refreshView: () => void
) {
	return [
		vscode.commands.registerCommand(
			ADD_NOTE_COMMAND_ID,
			async () => await addNoteCommand(context, refreshView)
		),
		vscode.commands.registerCommand(
			VIEW_EDIT_CURRENT_NOTE_COMMAND_ID,
			async () => await viewEditCurrentNote(context, refreshView)
		),
		vscode.commands.registerCommand(
			VIEW_EDIT_NOTE_ITEM_COMMAND_ID,
			async (noteItem: NoteItem) =>
				await viewEditNoteItemCommand(context, refreshView, noteItem)
		),
		vscode.commands.registerCommand(
			DELETE_CURRENT_NOTE_COMMAND_ID,
			async () => await deleteCurrentNoteCommand(context, refreshView)
		),
		vscode.commands.registerCommand(
			DELETE_NOTE_ITEM_COMMAND_ID,
			async (noteItem: NoteItem) =>
				await deleteNoteItemCommand(context, refreshView, noteItem)
		),

		vscode.commands.registerCommand(REFRESH_NOTES_COMMAND_ID, refreshView),
	];
}
