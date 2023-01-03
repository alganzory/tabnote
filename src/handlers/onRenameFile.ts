const { getNotes, setNotes } = require("../utils/notesOperations");

module.exports = async function (event, context) {
	event?.files.forEach(async (file) => {
		const oldFileName = file.oldUri;
		const newFileName = file.newUri;

		// get the notes
		const notes = getNotes(context);

		// check if there is a note for the old file name
		if (oldFileName in notes) {
			// update the key value pair with the new file name as the key
			notes[newFileName] = notes[oldFileName];
			delete notes[oldFileName];

			// save the updated notes object
			await setNotes(context, notes);
		}
	});
};
