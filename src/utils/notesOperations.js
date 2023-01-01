const NOTES_KEY = "notes";

function getNotes(context) {
	return context.workspaceState.get(NOTES_KEY, {});
}

async function setNotes(context, notes) {
	return context.workspaceState.update(NOTES_KEY, notes);
}

async function deleteNote(context, fileName) {
	const notes = getNotes(context);
	delete notes[fileName];
	await setNotes(context, notes);
}

async function addNote(context, fileName, note) {
	const notes = getNotes(context);
	notes[fileName] = note;
	await setNotes(context, notes);
}

async function editNote(context, fileName, note) {
	const notes = getNotes(context);
	notes[fileName] = note;
	await setNotes(context, notes);
}

module.exports = {
	getNotes,
	setNotes,
	deleteNote,
	addNote,
	editNote,
};
