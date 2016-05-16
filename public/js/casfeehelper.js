/**
 * This file provides all functionality for the local storage example.
 *
 * @version 1.0
 *
 */

var cas = cas || {};
cas.fee = cas.fee || {};
cas.fee.helper = {

	/**
  * Initialize application.
  * 
  */
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
	
	/**
  * Read notes from local storage.
  * @return {Object} JSON Array
  */
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
	/**
  * Add note to local storage.
  * 
  */
	addNote: function () {
		var notesArray = cas.fee.helper.getNotes();
		var value = document.getElementById('inputNote').value;
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
	/**
  * Delete note from local storage.
  * @param {Object} element DOM element 
  */
	deleteNote: function (element) {
		var noteID = element.target.id;
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
	/**
  * Add note to DOM.
  * @param {String} nodeID note identifier
	* @param {Object} ItemObj object containing value information
  */
	addToDOM: function (noteID, ItemObj) {
		var notes = document.getElementById('notes');
		var eintrag = document.createElement('li');
		eintrag.setAttribute('id', noteID);
		eintrag.innerHTML = ItemObj.value;
		notes.appendChild(eintrag);
		eintrag.onclick = cas.fee.helper.deleteNote;
	},
	/**
  * Delete note from DOM.
  * @param {String} nodeID note identifier
  */
	deleteFromDOM: function (noteID) {
		var eintrag = document.getElementById(noteID);
		eintrag.parentNode.removeChild(eintrag);
	},
	/**
  * Delete all notes from local storage and DOM.
  */
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