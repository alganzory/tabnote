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
		this.tooltip = `${this.fileName}`;
		this.description = `${this.note}`;
	}
}
