import * as vscode from "vscode";

const statusBarItem = vscode.window.createStatusBarItem();

export default function updateStatusBar(note = ""): void {
	const displayNote = note.length > 10 ? note.substring(0, 10) + "..." : note;
	statusBarItem.command = "extension.viewEditNote";
	statusBarItem.text = `**TabNote:** ${displayNote}`;
	statusBarItem.show();
}
