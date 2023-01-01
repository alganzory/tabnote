const { getNotes } = require("../utils/notesOperations");
const { updateStatusBar } = require("../utils/statusBar");

module.exports = function (editor, context) {
	console.log("Active editor changed");
	if (!editor) {
		updateStatusBar();
		return;
	}
	const notes = getNotes(context);
	if (editor.document.fileName in notes) {
		updateStatusBar(notes[editor.document.fileName]);
	} else {
		updateStatusBar();
	}
};
