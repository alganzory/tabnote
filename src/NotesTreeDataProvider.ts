import * as vscode from "vscode";
import { getNotes } from "./utils/notesOperations";
import { NoteItem } from "./NoteItem";
import { NOTE_ITEM_SHORTER_NAME_PREFIX } from "./constants";

export class NotesTreeDataProvider
	implements vscode.TreeDataProvider<vscode.TreeItem>
{
	private _context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		this._context = context;
	}

	getTreeItem(element: NoteItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: vscode.TreeItem): Thenable<NoteItem[]> {
		// Return the list of notes as the children of the root node
		if (!element) {
			const notes = getNotes(this._context);
			return Promise.resolve(
				Object.keys(notes).map((fileName) => {
					const note = notes[fileName];
					const newNoteItem = new NoteItem(
						note,
						fileName,
						this.getShorterFileName(fileName)
					);
					return newNoteItem;
				})
			);
		}
		return Promise.resolve([]);
	}

	private getShorterFileName(fileName: string): string {
		const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
		const workspaceFolderPath = workspaceFolder?.uri.fsPath;
		const relativePath = fileName.replace(
			workspaceFolderPath!,
			NOTE_ITEM_SHORTER_NAME_PREFIX
		);
		return relativePath;
	}

	private _onDidChangeTreeData: vscode.EventEmitter<
		NoteItem | undefined | null | void
	> = new vscode.EventEmitter<NoteItem | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<
		NoteItem | undefined | null | void
	> = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}
