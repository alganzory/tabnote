const vscode = require("vscode");
const addNoteCommand = require("./addNote");
const viewEditNoteCommand = require("./viewEditNote");
const deleteNoteCommand = require("./deleteNote");

module.exports = function getRegisteredCommands(context) {
	return [
		vscode.commands.registerCommand(
			"extension.addNote",
			async () => await addNoteCommand(context)
		),
		vscode.commands.registerCommand(
			"extension.viewEditNote",
			async () => await viewEditNoteCommand(context)
		),
		vscode.commands.registerCommand(
			"extension.deleteNote",
			deleteNoteCommand
		),
	];
};
