import * as vscode from "vscode";
import {
	STATUS_BAR_FORMAT,
	STATUS_BAR_MAX_LENGTH,
	STATUS_BAR_NAME,
	STATUS_BAR_TOOLTIP,
	VIEW_EDIT_CURRENT_NOTE_COMMAND_ID,
} from "../constants";

const statusBarItem = vscode.window.createStatusBarItem();

export default function updateStatusBar(note = ""): void {
	const displayNote =
		note.length > STATUS_BAR_MAX_LENGTH
			? note.substring(0, STATUS_BAR_MAX_LENGTH) + "..."
			: note;
	statusBarItem.name = STATUS_BAR_NAME;
	statusBarItem.command = VIEW_EDIT_CURRENT_NOTE_COMMAND_ID;
	statusBarItem.text = STATUS_BAR_FORMAT(displayNote);
	statusBarItem.tooltip = STATUS_BAR_TOOLTIP(note);

	statusBarItem.show();
}
