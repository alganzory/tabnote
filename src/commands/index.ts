import * as vscode from "vscode";
import addNoteCommand from "./addNote";
import viewEditNoteCommand from "./viewEditNote";
import deleteNoteCommand from "./deleteNote";

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
			"extension.viewEditNote",
			async () => await viewEditNoteCommand(context, refreshView)
		),
		vscode.commands.registerCommand(
			"extension.deleteNote",
			async () => await deleteNoteCommand(context, refreshView)
		),
	];
}
