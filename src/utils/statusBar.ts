import * as vscode from "vscode";
import {
	STATUS_BAR_FORMAT,
	STATUS_BAR_MAX_LENGTH,
	VIEW_EDIT_CURRENT_NOTE_COMMAND_ID,
} from "../constants";

const statusBarItem = vscode.window.createStatusBarItem();

export default function updateStatusBar(note = ""): void {
	const displayNote =
		note.length > STATUS_BAR_MAX_LENGTH
			? note.substring(0, STATUS_BAR_MAX_LENGTH) + "..."
			: note;
	statusBarItem.command = VIEW_EDIT_CURRENT_NOTE_COMMAND_ID;
	statusBarItem.text = STATUS_BAR_FORMAT(displayNote);
	statusBarItem.show();
}
