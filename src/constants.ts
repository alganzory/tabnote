// here goes all the constant literals in the app

import path = require("path");
import * as vscode from "vscode";

export const NOTES_TREE_VIEW_ID = "notesTreeView";
export const NOTES_TREE_VIEW_TITLE = "Notes";
export const NOTES_TREE_VIEW_ICON = "tab.svg";
export const MEDIA_ICONS_PATH = path.join(
	__filename,
	"..",
	"..",
	"media",
	"icons"
);
export const MEDIA_ICONS_TAB_PATH = path.join(
	MEDIA_ICONS_PATH,
	NOTES_TREE_VIEW_ICON
);
export const NOTE_ITEM_ICON = vscode.Uri.file(MEDIA_ICONS_TAB_PATH);
export const NOTE_ITEM_TOOLTIP = (fileName: string, note: string) =>
	new vscode.MarkdownString(`${note}\n\n\`${fileName}\``);
export const NOTE_ITEM_DESCRIPTION = (note: string) => `${note}`;
export const NOTE_ITEM_COMMAND = (fileName: string) => ({
	id: "vscode.open",
	title: "Open Tab",
	arguments: [vscode.Uri.file(fileName), { preview: true }],
	command: "vscode.open",
});

export const NOTE_ITEM_SHORTER_NAME_PREFIX = "..";

export const ADD_NOTE_COMMAND_ERROR_MESSAGE =
	"Cannot add note. No active text editor found.";
export const DELETE_CURRENT_NOTE_COMMAND_ERROR_MESSAGE =
	"Cannot delete note. No active text editor found.";
export const VIEW_EDIT_CURRENT_NOTE_COMMAND_ERROR_MESSAGE =
	"Cannot view/edit note. No active text editor found.";

export const ADD_NOTE_COMMAND_ID = "extension.addNote";
export const VIEW_EDIT_CURRENT_NOTE_COMMAND_ID =
	"extension.viewEditCurrentNote";
export const DELETE_CURRENT_NOTE_COMMAND_ID = "extension.deleteCurrentNote";
export const VIEW_EDIT_NOTE_ITEM_COMMAND_ID = "extension.viewEditNoteItem";
export const DELETE_NOTE_ITEM_COMMAND_ID = "extension.deleteNoteItem";
export const REFRESH_NOTES_COMMAND_ID = "extension.refreshNotes";

export const VIEW_EDIT_NOTE_INPUT_DEFAULT_PLACEHOLDER =
	"Enter a note for this tab";
export const VIEW_EDIT_NOTE_ITEM_INPUT_PLACEHOLDER = (noteItemName: string) =>
	`Edit note for ${noteItemName}`;
export const VIEW_EDIT_NOTE_ITEM_INPUT_PROMPT = (noteItemName: string) =>
	`View/Edit note for ${noteItemName}`;
export const VIEW_EDIT_NOTE_INPUT_DEFAULT_PROMPT =
	"View/Edit note for this tab";
export const VIEW_EDIT_NOTE_INPUT_DEFAULT_VALUE = "";

export const STATUS_BAR_MAX_LENGTH = 20;
export const STATUS_BAR_FORMAT = (note: string) =>
	`$(notebook)TabNote${note ? ": " + note : ""}`;

export const EXISTING_NOTES_CONTEXT_KEY = "extension.existingNotes";
