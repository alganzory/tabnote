const vscode = require("vscode");
const addNoteCommand = require("./addNote");
const viewEditNoteCommand = require("./viewEditNote");
const deleteNoteCommand = require("./deleteNote");

module.exports = function getRegisteredCommands (context) {
	return [
		vscode.commands.registerCommand("extension.addNote", () => addNoteCommand(context)),
		vscode.commands.registerCommand(
			"extension.viewEditNote",
			() => viewEditNoteCommand(context)
		),
		vscode.commands.registerCommand(
			"extension.deleteNote",
			deleteNoteCommand
		),
	];
};
