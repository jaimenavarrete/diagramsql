const addNoteForm = document.getElementById('add-note');

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

const createNoteCard = (title, description, image) => {
    const $noteCard = document.createElement('div');
    $noteCard.classList.add('note');
    $noteCard.style.position = 'absolute';
    $noteCard.style.left = (initialWidth / 2) + 'px';
    $noteCard.style.top = (initialHeight / 2) + 'px';
    $noteCard.draggable = true;

    if(image) {
        const $image = document.createElement('img');
        $image.classList.add('note-icon');
        $image.src = URL.createObjectURL(image);
        $image.draggable = false;

        $noteCard.appendChild($image);
    }

    const $title = document.createElement('h3');
    $title.classList.add('note-title');
    $title.textContent = title;

    const $description = document.createElement('p');
    $description.textContent = description;

    $noteCard.append($title, $description);

    // Insert note into canvas
    canvas.appendChild($noteCard);

    successAlert('The note was created successfully');
}

addNoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const { title, description, image } = e.target.elements;

    createNoteCard(title.value, description.value, image.files[0]);
})