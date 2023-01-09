import * as vscode from "vscode";
import {
	SEARCH_NOTES_NO_NOTES_MESSAGE,
	SEARCH_NOTES_QUICKPICK_ITEM,
	SEARCH_NOTES_QUICKPICK_PLACEHOLDER,
	SEARCH_NOTES_QUICKPICK_TITLE,
} from "../constants";
import path = require("path");

export async function showQuickPick(searchResults: [string, string][]) {
	let quickPick = vscode.window.createQuickPick();

	if (searchResults.length === 0) {
		quickPick.items = [
			{
				label: SEARCH_NOTES_NO_NOTES_MESSAGE,
			},
		];
	} else {
		quickPick.items = searchResults.map(([key, value]) => {
			return SEARCH_NOTES_QUICKPICK_ITEM(key, value);
		});
	}

	// get the root path of the workspace, so we can open the file from the relative path
	const rootPath = vscode?.workspace?.workspaceFolders?.[0].uri.fsPath;

	quickPick.title = SEARCH_NOTES_QUICKPICK_TITLE;
	quickPick.placeholder = SEARCH_NOTES_QUICKPICK_PLACEHOLDER;
	quickPick.show();

	quickPick.onDidChangeSelection(async (selection) => {
		const selectedNote = selection[0];
		if (!selectedNote || searchResults.length === 0) {
			quickPick.hide();
			quickPick.dispose();
			return;
		}
		if (!selectedNote.detail) {
			quickPick.hide();
			quickPick.dispose();
			return;
		}

		if (!rootPath) {
			quickPick.hide();
			quickPick.dispose();
			return;
		}
		// execute command to open the note
		const fullPathFromRelative = path.join(rootPath, selectedNote.detail);
		await vscode.commands.executeCommand(
			"vscode.open",
			vscode.Uri.file(fullPathFromRelative)
		);

		quickPick.hide();
		quickPick.dispose();
	});
}
