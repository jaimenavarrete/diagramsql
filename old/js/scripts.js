const addNoteForm = document.getElementById('add-note');
const addNoteFormStyles = window.getComputedStyle(addNoteForm);
const resizeBar = document.getElementById('resize-bar');

const notes = [];

// Resize form
let isResizeBarGrabbed = false;

// Alerts
const successAlert = (message) => iziToast.show({
    title: '&#10004; Success',
    titleColor: '#FFFFFF',
    titleSize: '18px',
    message,
    messageColor: '#FFFFFF',
    messageSize: '16px',
    backgroundColor: '#2ECC71',
    progressBarColor: '#FFFFFF',
    position: 'topCenter',
});

const errorAlert = (message) => iziToast.show({
    title: '&#10006; Error',
    titleColor: '#FFFFFF',
    titleSize: '18px',
    message,
    messageColor: '#FFFFFF',
    messageSize: '16px',
    backgroundColor: '#E14D45',
    progressBarColor: '#FFFFFF',
    position: 'topCenter'
});

const createNoteCardElement = (note) => {
    const $noteCard = document.createElement('div');

    $noteCard.classList.add('note');
    $noteCard.style.setProperty("--note-color", note.color);
    $noteCard.style.position = 'absolute';
    $noteCard.style.left = note.positionX + 'px';
    $noteCard.style.top = note.positionY + 'px';
    $noteCard.draggable = true;

    if(note.image) {
        const $image = document.createElement('img');
        $image.classList.add('note-icon');
        $image.src = URL.createObjectURL(note.image);
        $image.draggable = false;

        $noteCard.appendChild($image);
    }

    const $title = document.createElement('h3');
    $title.classList.add('note-title');
    $title.textContent = note.title;

    const $description = document.createElement('p');
    $description.textContent = note.description;

    $noteCard.append($title, $description);

    return $noteCard;
}

const createNote = (noteFormInputs) => ({
    title: noteFormInputs.title.value,
    description: noteFormInputs.description.value || "[No description]",
    image: noteFormInputs.image.files[0], 
    color: noteFormInputs.color.value,
    positionX: initialWidth / 2,
    positionY: initialHeight / 2,
});

const addNote = (noteFormInputs) => {
    const note = createNote(noteFormInputs);
    notes.push(note);

    // Insert note card element into canvas
    const $noteCardElement = createNoteCardElement(note)
    canvas.appendChild($noteCardElement);

    successAlert('The note was created successfully');
}

const submitForm = (e) => {
    e.preventDefault();
    addNote(e.target.elements);
};

const resizeForm = (e) => {
    if(!isResizeBarGrabbed) return;

    const currentFormWidth = parseFloat(addNoteFormStyles.getPropertyValue('width'));

    addNoteForm.style.width = (currentFormWidth + e.movementX) + 'px';
};

// Submit add-note form event
addNoteForm.addEventListener('submit', submitForm);

// Resize form events
resizeBar.addEventListener('mousedown', (e) => isResizeBarGrabbed = true);
resizeBar.addEventListener('mouseup', (e) => isResizeBarGrabbed = false);
document.addEventListener('mousemove', resizeForm);