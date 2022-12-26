const vscode = require("vscode");
const path = require("path");

const statusBarItem = vscode.window.createStatusBarItem();

function updateStatusBar(note = "") {
	const displayNote = note.length > 10 ? note.substring(0, 10) + "..." : note;
	statusBarItem.command = "extension.viewEditNote";
	statusBarItem.text = `**TabNote:** ${displayNote}`;
	statusBarItem.show();
}

// This function is called when the extension is activated
function activate(context) {
	console.log("Note extension is now active!");

	// upon starting VS Code, check if there is a note for the active tab, and display it in the status bar
	if (vscode.window.activeTextEditor) {
		const notes = context.workspaceState.get("notes") || {};
		if (vscode.window.activeTextEditor.document.fileName in notes) {
			updateStatusBar(
				notes[vscode.window.activeTextEditor.document.fileName]
			);
		}
	}
	else {
		updateStatusBar();
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
				let notes = context.workspaceState.get("notes") || {};
				// update the notes object with the new note
				notes[vscode.window.activeTextEditor.document.fileName] = note;
				context.workspaceState.update("notes", notes);

				// Update the status bar with the note if the tab corresponds to the active tab
				if (vscode.window.activeTextEditor.document.fileName in notes) {
					updateStatusBar(note);
				}
			});
		})
	);

	// Add a command that allows the user to view/edit the note for the active tab
	context.subscriptions.push(
		vscode.commands.registerCommand("extension.viewEditNote", function () {
			// Check if there is an active text editor
			if (!vscode.window.activeTextEditor) {
				vscode.window.showErrorMessage(
					"Cannot view/edit a note. No active text editor found."
				);
				return;
			}

			// read the notes
			let notes = context.workspaceState.get("notes") || {};
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
				.then(function (note) {
					// If the user clicked "Cancel" or entered no new note, do nothing
					if (note === undefined || note === existingNote) {
						return;
					}
					// update the notes object with the new note
					notes[vscode.window.activeTextEditor.document.fileName] =
						note;
					context.workspaceState.update("notes", notes);

					// Update the status bar with the new note
					updateStatusBar(note);
				});
		})
	);

	// Add a command that allows the user to delete the note for the active tab
	context.subscriptions.push(
		vscode.commands.registerCommand("extension.deleteNote", function () {
			// Check if there is an active text editor
			if (!vscode.window.activeTextEditor) {
				vscode.window.showErrorMessage(
					"Cannot delete a note. No active text editor found."
				);
				return;
			}

			// Delete the note for the active tab
			let notes = context.workspaceState.get("notes") || {};
			delete notes[vscode.window.activeTextEditor.document.fileName];
			context.workspaceState.update("notes", notes);

			// Update the status bar with the new note
			updateStatusBar();
		})
	);
	

	// upon opening a file, check if there is a note for it, and display it in the status bar
	vscode.window.onDidChangeActiveTextEditor(function (editor) {
		console.log("Active editor changed");
		if (!editor) {
			updateStatusBar();
			return;
		};
		const notes = context.workspaceState.get("notes") || {};
		if (editor.document.fileName in notes) {
			updateStatusBar(notes[editor.document.fileName]);
		} else {
			updateStatusBar();
		}
	});
}

// This function is called when the extension is deactivated
function deactivate() {
	console.log("Note extension is now inactive.");
}

exports.activate = activate;
exports.deactivate = deactivate;
