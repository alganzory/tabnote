import path = require("path");
import * as vscode from "vscode";
import { NOTE_ITEM_COMMAND, NOTE_ITEM_DESCRIPTION, NOTE_ITEM_ICON as NOTE_ITEM_ICON_PATH, NOTE_ITEM_TOOLTIP } from "./constants";
export class NoteItem extends vscode.TreeItem {
	constructor(
		public readonly note: string,
		public readonly fileName: string,
		public readonly shorterFileName: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
			.TreeItemCollapsibleState.None
	) {
		super(shorterFileName, collapsibleState);
		this.tooltip = NOTE_ITEM_TOOLTIP(fileName, note);
		this.description = NOTE_ITEM_DESCRIPTION(note);
	}

	command = NOTE_ITEM_COMMAND(this.fileName);

	iconPath = NOTE_ITEM_ICON_PATH;
}
