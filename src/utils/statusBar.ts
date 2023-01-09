import * as vscode from "vscode";
import {
	ADD_NOTE_COMMAND_ID,
	STATUS_BAR_FORMAT,
	STATUS_BAR_MAX_LENGTH,
	STATUS_BAR_NAME,
	STATUS_BAR_TOOLTIP,
	VIEW_EDIT_CURRENT_NOTE_COMMAND_ID,
} from "../constants";
import { getNoteByFileName } from "./notesOperations";

const statusBarItem = vscode.window.createStatusBarItem();

export default function updateStatusBar(
	note = "",
	context: vscode.ExtensionContext
): void {
	const displayNote =
		note.length > STATUS_BAR_MAX_LENGTH
			? note.substring(0, STATUS_BAR_MAX_LENGTH) + "..."
			: note;
	statusBarItem.name = STATUS_BAR_NAME;
	
	// commmand depends on whether or not the current tab has a note
	let currentTab = vscode.window.activeTextEditor;
	statusBarItem.command = ADD_NOTE_COMMAND_ID;
	if (currentTab) {
		let currentTabPath = currentTab.document.fileName;
		let currentTabNote = getNoteByFileName(context, currentTabPath);
		if (currentTabNote) {
			statusBarItem.command = VIEW_EDIT_CURRENT_NOTE_COMMAND_ID;
		}
	}

	statusBarItem.text = STATUS_BAR_FORMAT(displayNote);
	statusBarItem.tooltip = STATUS_BAR_TOOLTIP(note);

	statusBarItem.show();
}
