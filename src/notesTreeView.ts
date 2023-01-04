import * as vscode from "vscode";
import { getNotes } from "./utils/notesOperations";

export class NotesTreeView implements vscode.TreeDataProvider<vscode.TreeItem> {
	private _context: vscode.ExtensionContext;
	private _treeView: vscode.TreeView<vscode.TreeItem>;

	constructor(context: vscode.ExtensionContext) {
		this._context = context;

		this._treeView = vscode.window.createTreeView("notesTreeView", {
			treeDataProvider: this,
		});
	}

	getTreeItem(element: Note): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {
		// Return the list of notes as the children of the root node
		if (!element) {
			const notes = getNotes(this._context);
			return Object.keys(notes).map((fileName) => {
				const note = notes[fileName];
				return new Note(
					note,
					fileName,
					this.getShorterFileName(fileName)
				);
			});
		}
		return Promise.resolve([]);
	}

	getShorterFileName(fileName: string): string {
		const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
		const workspaceFolderPath = workspaceFolder?.uri.fsPath;
		const relativePath = fileName.replace(workspaceFolderPath!, "..");
		return relativePath;
	}

	private _onDidChangeTreeData: vscode.EventEmitter<
		Note | undefined | null | void
	> = new vscode.EventEmitter<Note | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<Note | undefined | null | void> =
		this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}

class Note extends vscode.TreeItem {
	constructor(
		public readonly note: string,
		private fileName: string,
		private shorterFileName: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
			.TreeItemCollapsibleState.None
	) {
		super(shorterFileName, collapsibleState);
		this.tooltip = `${this.fileName}`;
		this.description = `${this.note}`;
	}
}
