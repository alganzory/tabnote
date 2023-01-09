import * as vscode from "vscode";
import { getNotes } from "../utils/notesOperations";
import updateStatusBar from "../utils/statusBar";

export default function (
	editor: vscode.TextEditor | undefined,
	context: vscode.ExtensionContext
) {
	if (!editor) {
		updateStatusBar("", context);
		return;
	}
	const notes = getNotes(context);
	if (editor.document.fileName in notes) {
		updateStatusBar(notes[editor.document.fileName], context);
	} else {
		updateStatusBar("", context);
	}
}
