const addNoteForm = document.getElementById('add-note');

const createNoteCard = (title, description) => {
    const $noteCard = document.createElement('div');
    $noteCard.classList.add('note');
    $noteCard.style.position = 'absolute';
    $noteCard.style.left = (initialWidth / 2) + 'px';
    $noteCard.style.top = (initialHeight / 2) + 'px';

    const $title = document.createElement('h3');
    $title.classList.add('note-title');
    $title.textContent = title;

    const $description = document.createElement('p');
    $description.textContent = description;

    $noteCard.append($title, $description);

    // Insert note into canvas
    canvas.appendChild($noteCard);
}

addNoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const { title, description } = e.target.elements;

    createNoteCard(title.value, description.value);
})