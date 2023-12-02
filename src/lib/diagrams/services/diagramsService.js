import { getDB } from '../../shared/db/connection';

const getDiagrams = async () => {
    const db = await getDB();

    return new Promise((resolve, reject) => {
        const request = db
            .transaction('diagrams')
            .objectStore('diagrams')
            .getAll();

        request.onsuccess = (e) => resolve(e.target.result ?? []);
        request.onerror = (e) => reject(e);
    });
};

const getDiagramById = async (id) => {
    const db = await getDB();

    return new Promise((resolve, reject) => {
        const request = db
            .transaction('diagrams')
            .objectStore('diagrams')
            .get(id);

        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e);
    });
};

const createDiagram = () => ({
    id: crypto.randomUUID(),
    title: 'Untitled diagram',
    isFavorite: false,
    tables: [],
    notes: [],
});

const addDiagram = async () => {
    const db = await getDB();
    const newDiagram = createDiagram();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['diagrams'], 'readwrite');
        transaction.onerror = () => reject();

        const diagramsStore = transaction.objectStore('diagrams');
        const request = diagramsStore.add(newDiagram);
        request.onsuccess = () => resolve(newDiagram);
        request.onerror = (e) => reject(e);
    });
};

const updateDiagram = async (diagram) => {
    const db = await getDB();
    const currentDiagram = await getDiagramById(diagram.id);

    currentDiagram.title = diagram.title;
    currentDiagram.description = diagram.description;
    currentDiagram.isFavorite = diagram.isFavorite;
    currentDiagram.tables = diagram.tables;
    currentDiagram.notes = diagram.notes;

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['diagrams'], 'readwrite');
        transaction.onerror = () => reject();

        const diagramsStore = transaction.objectStore('diagrams');
        const request = diagramsStore.put(currentDiagram);
        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e);
    });
};

const deleteDiagram = async (id) => {
    const db = await getDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['diagrams'], 'readwrite');
        transaction.onerror = () => reject();

        const diagramsStore = transaction.objectStore('diagrams');
        const request = diagramsStore.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e);
    });
};

export default {
    getDiagrams,
    getDiagramById,
    addDiagram,
    updateDiagram,
    deleteDiagram,
};
