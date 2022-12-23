const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

if (vscode.workspace.workspaceFolders.length === 0) {
	vscode.window.showErrorMessage("Error: No workspace folders found");
}

const VSCODE_DIR = path.join(
	vscode.workspace.workspaceFolders?.[0].uri.fsPath,
	".vscode"
);

const NOTES_FILE = path.join(VSCODE_DIR, "notes.json");

const statusBarItem = vscode.window.createStatusBarItem();

function updateStatusBar(note = "") {
	const displayNote = note.length > 10 ? note.substring(0, 10) + "..." : note;
	statusBarItem.command = "extension.showNote";
	statusBarItem.text = `**TabNote:** ${displayNote}`;
	statusBarItem.show();
}

// This function is called when the extension is activated
function activate(context) {
	console.log("Note extension is now active!");

	if (!fs.existsSync(VSCODE_DIR)) {
		fs.mkdirSync(VSCODE_DIR);
	}
	// upon starting VS Code, check if there is a note for the active tab, and display it in the status bar
	if (fs.existsSync(NOTES_FILE) && vscode.window.activeTextEditor) {
		let notes = JSON.parse(fs.readFileSync(NOTES_FILE).toString());
		if (vscode.window.activeTextEditor.document.fileName in notes) {
			updateStatusBar(
				notes[vscode.window.activeTextEditor.document.fileName]
			);
		}
	}
	// Add a command that allows the user to add a note to the active tab
	context.subscriptions.push(
		vscode.commands.registerCommand("extension.addNote", function () {
			// Check if there is an active text editor
			if (!vscode.window.activeTextEditor) {
				vscode.window.showErrorMessage(
					"Cannot add a note. No active text editor found."
				);
				return;
			}

			// Show an input box to get the note from the user
			vscode.window.showInputBox().then(function (note) {
				// Save the note in a JSON file in the workspace
				let notes = {};
				// read the notes from the notes.json file, if it exists
				if (fs.existsSync(NOTES_FILE)) {
					notes = JSON.parse(fs.readFileSync(NOTES_FILE).toString());
				}
				// update the notes object with the new note
				notes[vscode.window.activeTextEditor.document.fileName] = note;
				// write the updated notes object to the notes.json file
				fs.writeFileSync(NOTES_FILE, JSON.stringify(notes));

				// Update the status bar with the note if the tab corresponds to the active tab
				if (vscode.window.activeTextEditor.document.fileName in notes) {
					updateStatusBar(note);
				}
			});
		})
	);

	// Add a command that allows the user to edit the note for the active tab
	context.subscriptions.push(
		vscode.commands.registerCommand("extension.editNote", function () {
			// Check if there is an active text editor
			if (!vscode.window.activeTextEditor) {
				vscode.window.showErrorMessage(
					"Cannot add a note. No active text editor found."
				);
				return;
			}

			// read the current note from the notes.json file
			let currentNote = "";
			if (fs.existsSync(NOTES_FILE)) {
				let notes = JSON.parse(fs.readFileSync(NOTES_FILE).toString());
				currentNote =
					vscode.window.activeTextEditor.document.fileName in notes
						? notes[
								vscode.window.activeTextEditor.document.fileName
						  ]
						: "";
			}

			// Show an input box to get the new note from the user
			vscode.window
				.showInputBox({ value: currentNote })
				.then(function (note) {
					// Update the note in the JSON file
					if (fs.existsSync(NOTES_FILE)) {
						// read the notes from the notes.json file
						let notes = JSON.parse(
							fs.readFileSync(NOTES_FILE).toString()
						);
						// update the notes object with the new note
						notes[
							vscode.window.activeTextEditor.document.fileName
						] = note;
						// write the updated notes object to the notes.json file
						fs.writeFileSync(NOTES_FILE, JSON.stringify(notes));
					}
					// Update the status bar with the new note
					updateStatusBar(note);
				});
		})
	);

	// Add a command that allows the user to delete the note for the active tab
	context.subscriptions.push(
		vscode.commands.registerCommand("extension.deleteNote", function () {
			// Delete the note from the JSON file
			if (fs.existsSync(NOTES_FILE)) {
				// read the notes from the notes.json file
				let notes = JSON.parse(fs.readFileSync(NOTES_FILE).toString());
				// delete the note for the active tab
				delete notes[vscode.window.activeTextEditor.document.fileName];
				// write the updated notes object to the notes.json file
				fs.writeFileSync(NOTES_FILE, JSON.stringify(notes));
			}
			// Update the status bar with the new note
			updateStatusBar("");
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("extension.showNote", function () {
			// Check if there is an active text editor
			if (!vscode.window.activeTextEditor) {
				vscode.window.showErrorMessage(
					"Cannot show note. No active text editor found."
				);
				return;
			}

			// read the notes from the notes.json file
			let notes = {};
			if (fs.existsSync(NOTES_FILE)) {
				notes = JSON.parse(fs.readFileSync(NOTES_FILE).toString());
			}

			let existingNote =
				notes[vscode.window.activeTextEditor.document.fileName];
			// Show the full note in an input box
			vscode.window
				.showInputBox({
					value: existingNote || "",
					// move the cursor to the end of the note
					valueSelection: [
						existingNote ? existingNote.length : 0,
						existingNote ? existingNote.length : 0,
					],
					placeHolder: "Enter a note for this tab",
					prompt: "View/Edit note for this tab",
				})
				.then(function (newNote) {
					// If the user clicked "Cancel" or entered no new note, do nothing
					if (newNote === undefined || newNote === existingNote) {
						return;
					}
					// update the notes object with the new note
					notes[vscode.window.activeTextEditor.document.fileName] =
						newNote;
					// write the updated notes object to the notes.json file
					fs.writeFileSync(NOTES_FILE, JSON.stringify(notes));
					// Update the status bar with the note if the tab corresponds to the active tab
					if (
						vscode.window.activeTextEditor.document.fileName in
						notes
					) {
						updateStatusBar(newNote);
					}
				});
		})
	);

	// upon opening a file, check if there is a note for it, and display it in the status bar
	vscode.window.onDidChangeActiveTextEditor(function (editor) {
		console.log("Active editor changed");
		if (!editor) return;
		if (fs.existsSync(NOTES_FILE)) {
			let notes = JSON.parse(fs.readFileSync(NOTES_FILE).toString());
			if (editor.document.fileName in notes) {
				updateStatusBar(notes[editor.document.fileName]);
			} else {
				updateStatusBar("");
			}
		}
	});
}

// This function is called when the extension is deactivated
function deactivate() {
	console.log("Note extension is now inactive.");
}

exports.activate = activate;
exports.deactivate = deactivate;
