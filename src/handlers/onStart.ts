import * as vscode from "vscode";
import { getNotes } from "../utils/notesOperations";
import updateStatusBar from "../utils/statusBar";

export default function (context: vscode.ExtensionContext) {
	if (vscode.window.activeTextEditor) {
		const notes = getNotes(context);
		if (vscode.window.activeTextEditor.document.fileName in notes) {
			updateStatusBar(
				notes[vscode.window.activeTextEditor.document.fileName]
			);
		} else {
			updateStatusBar();
		}
	} else {
		updateStatusBar();
	}
}
