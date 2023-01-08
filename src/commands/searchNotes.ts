import * as vscode from "vscode";
import { getNotes } from "../utils/notesOperations";
import { showQuickPick } from "../utils/quickPick";
import { SEARCH_NOTES_NO_NOTES_MESSAGE } from "../constants";

export async function searchNotesCommand(context: vscode.ExtensionContext) {
	let notes = getNotes(context);
	let searchResults = Object.entries(notes);

	if (searchResults.length === 0) {
		vscode.window.showInformationMessage(SEARCH_NOTES_NO_NOTES_MESSAGE);
	}
	showQuickPick(searchResults);
}
