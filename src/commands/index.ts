import * as vscode from "vscode";
import addNoteCommand from "./addNote";
import { viewEditCurrentNote, videwEditNote } from "./viewEditNote";
import deleteNoteCommand from "./deleteNote";
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
			"extension.viewEditNote",
			async (noteItem: NoteItem) =>
				await videwEditNote(context, refreshView, noteItem)
		),
		vscode.commands.registerCommand(
			"extension.deleteNote",
			async () => await deleteNoteCommand(context, refreshView)
		),
	];
}
