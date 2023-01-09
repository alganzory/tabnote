import * as vscode from "vscode";
const NOTES_KEY = "notes";

export function getNotes(context: vscode.ExtensionContext): {
	[key: string]: string;
} {
	return context.workspaceState.get(NOTES_KEY, {});
}

export function getNoteByFileName(
	context: vscode.ExtensionContext,
	fileName: string
) {
	const notes = getNotes(context);
	return notes[fileName] || "";
}

export async function setNotes(
	context: vscode.ExtensionContext,
	notes: { [key: string]: string }
) {
	return context.workspaceState.update(NOTES_KEY, notes);
}

export async function deleteNote(
	context: vscode.ExtensionContext,
	fileName: string | number
) {
	const notes = getNotes(context);
	delete notes[fileName];
	await setNotes(context, notes);
}

export async function addNote(
	context: vscode.ExtensionContext,
	fileName: string,
	note: string
) {
	const notes = getNotes(context);
	notes[fileName] = note;
	await setNotes(context, notes);
}

export async function editNote(
	context: vscode.ExtensionContext,
	fileName: string | number,
	note: any
) {
	const notes = getNotes(context);
	notes[fileName] = note;
	await setNotes(context, notes);
}
