const NOTES_KEY = "notes";

function getNotes(context) {
	return context.workspaceState.get(NOTES_KEY, {});
}

function setNotes(context, notes) {
	return context.workspaceState.update(NOTES_KEY, notes);
}

function deleteNote(context, fileName) {
	const notes = getNotes(context);
	delete notes[fileName];
	setNotes(context, notes);
}

function addNote(context, fileName, note) {
	const notes = getNotes(context);
	notes[fileName] = note;
	setNotes(context, notes);
}

function editNote(context, fileName, note) {
	const notes = getNotes(context);
	notes[fileName] = note;
	setNotes(context, notes);
}

module.exports = {
	getNotes,
	setNotes,
	deleteNote,
	addNote,
	editNote,
};
