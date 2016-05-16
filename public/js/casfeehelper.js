
var cas = cas || {};
cas.fee = cas.fee || {};
cas.fee.helper = {

	init: function () {
		var button = document.getElementById('addNote');
		button.onclick = cas.fee.helper.addNote;
		var clearButton = document.getElementById('deleteNote');
		clearButton.onclick = cas.fee.helper.deleteAll;
		var notesArray = cas.fee.helper.getNotes();
		for (var i = 0; i < notesArray.length; i++) {
			var noteID = notesArray[i];
			var value = JSON.parse(localStorage[noteID]);
			cas.fee.helper.addToDOM(noteID, value);
		}
	},

	getNotes: function () {
		var notesArray = localStorage.getItem('notesArray');
		if (!notesArray) {
			notesArray = [];
			localStorage.setItem('notesArray', JSON.stringify(notesArray));
		} else {
			notesArray = JSON.parse(notesArray);
		}
		return notesArray;
	},

	addNote: function () {
		var notesArray = cas.fee.helper.getNotes();
		var value = document.getElementById('inputNote')
			.value;
		if (value != '') {
			var currentDate = new Date();
			var noteID = 'note' + currentDate.getTime()
			var noteText = {
				'value': value
			};
			localStorage.setItem(noteID, JSON.stringify(noteText));
			notesArray.push(noteID);
			localStorage.setItem('notesArray', JSON.stringify(notesArray));
			cas.fee.helper.addToDOM(noteID, noteText);
			document.getElementById('inputNote')
				.value = ' ';
		} else {
			alert('Bitte geben Sie etwas ein!');
		}
	},

	deleteNote: function (e) {
		var noteID = e.target.id;
		var notesArray = cas.fee.helper.getNotes();
		if (notesArray) {
			for (var i = 0; i < notesArray.length; i++) {
				if (noteID == notesArray[i]) {
					notesArray.splice(i, 1);
				}
			}
			localStorage.removeItem(noteID);
			localStorage.setItem('notesArray', JSON.stringify(notesArray));
			cas.fee.helper.deleteFromDOM(noteID);
		}
	},

	addToDOM: function (noteID, ItemObj) {
		var notes = document.getElementById('notes');
		var eintrag = document.createElement('li');
		eintrag.setAttribute('id', noteID);
		eintrag.innerHTML = ItemObj.value;
		notes.appendChild(eintrag);
		eintrag.onclick = cas.fee.helper.deleteNote;
	},

	deleteFromDOM: function (noteID) {
		var eintrag = document.getElementById(noteID);
		eintrag.parentNode.removeChild(eintrag);
	},

	deleteAll: function () {
		localStorage.clear();
		var ItemList = document.getElementById('notes');
		var notes = ItemList.childNodes;
		for (var i = notes.length - 1; i >= 0; i--) {
			ItemList.removeChild(notes[i]);
		}
		var notesArray = cas.fee.helper.getNotes();
	}
}

window.onload = cas.fee.helper.init;