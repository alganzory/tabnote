import path = require("path");
import * as vscode from "vscode";
export class NoteItem extends vscode.TreeItem {
	constructor(
		public readonly note: string,
		public readonly fileName: string,
		public readonly shorterFileName: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
			.TreeItemCollapsibleState.None
	) {
		super(shorterFileName, collapsibleState);
		this.tooltip = `${this.fileName}\n=====\n${this.note}`;
		this.description = `${this.note}`;
	}

	command = {
		id: "vscode.open",
		title: "Open Tab",
		arguments: [vscode.Uri.file(this.fileName), { preview: true }],
		command: "vscode.open",
	};

	iconPath = vscode.Uri.file(
		path.join(__filename, "..", "..", "media", "icons", "tab.svg")
	);
}
