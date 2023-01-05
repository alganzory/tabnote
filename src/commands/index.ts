import * as vscode from "vscode";
import addNoteCommand from "./addNote";
import { viewEditCurrentNote, videwEditNoteItemCommand } from "./viewEditNote";
import { deleteCurrentNoteCommand, deleteNoteItemCommand } from "./deleteNote";
import { NoteItem } from "../NoteItem";

export default function getRegisteredCommands(
	context: vscode.ExtensionContext,
	refreshView: () => void
) {
	return [
		vscode.commands.registerCommand(
			"extension.addNote",
			async () => await addNoteCommand(context, refreshView)
		),
		vscode.commands.registerCommand(
			"extension.viewEditCurrentNote",
			async () => await viewEditCurrentNote(context, refreshView)
		),
		vscode.commands.registerCommand(
			"extension.viewEditNoteItemCommand",
			async (noteItem: NoteItem) =>
				await videwEditNoteItemCommand(context, refreshView, noteItem)
		),
		vscode.commands.registerCommand(
			"extension.deleteCurrentNote",
			async () => await deleteCurrentNoteCommand(context, refreshView)
		),
		vscode.commands.registerCommand(
			"extension.deleteNoteItemCommand",
			async (noteItem: NoteItem) =>
				await deleteNoteItemCommand(context, refreshView, noteItem)
		),

		vscode.commands.registerCommand("extension.refreshNotes", refreshView),
	];
}
