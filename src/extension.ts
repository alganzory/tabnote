import * as vscode from "vscode";
import getRegisteredCommands from "./commands";
import onTabChange from "./handlers/onTabChange";
import onStart from "./handlers/onStart";
import onRenameFile from "./handlers/onRenameFile";
import { NotesTreeDataProvider } from "./NotesTreeDataProvider";

export function activate(context: vscode.ExtensionContext) {
	// upon starting VS Code, check if there is a note for the active tab, and display it in the status bar
	onStart(context);

	// Create the tree view
	const notesTreeProvider = new NotesTreeDataProvider(context);
	vscode.window.registerTreeDataProvider("notesTreeView", notesTreeProvider);

	// Push all the commands to the context
	context.subscriptions.push(
		...getRegisteredCommands(context, () => notesTreeProvider.refresh())
	);

	// upon opening a file, check if there is a note for it, and display it in the status bar
	vscode.window.onDidChangeActiveTextEditor((editor) =>
		onTabChange(editor, context)
	);

	// upon renaming a file, check if there is a note for it, and display it in the status bar
	vscode.workspace.onDidRenameFiles((event) => onRenameFile(event, context));
}

// This function is called when the extension is deactivated
export function deactivate() {}
