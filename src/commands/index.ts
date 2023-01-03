import * as vscode from "vscode";
import addNoteCommand from "./addNote";
import viewEditNoteCommand from "./viewEditNote";
import deleteNoteCommand from "./deleteNote";

export default function getRegisteredCommands(
	context: vscode.ExtensionContext
) {
	return [
		vscode.commands.registerCommand(
			"extension.addNote",
			async () => await addNoteCommand(context)
		),
		vscode.commands.registerCommand(
			"extension.viewEditNote",
			async () => await viewEditNoteCommand(context)
		),
		vscode.commands.registerCommand(
			"extension.deleteNote",
			async () => await deleteNoteCommand(context)
		),
	];
}
