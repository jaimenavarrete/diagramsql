import { db } from '../../shared/db/connection';

const getDiagrams = () => {
    return new Promise((resolve, reject) => {
        const request = db
            .transaction('diagrams')
            .objectStore('diagrams')
            .getAll();

        request.onsuccess = (e) => resolve(e.target.result ?? []);
        request.onerror = (e) => reject(e);
    });
};

const getDiagramById = (id) => {
    return new Promise((resolve, reject) => {
        const request = db
            .transaction('diagrams')
            .objectStore('diagrams')
            .get(id);

        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = () => reject();
    });
};

const createDiagram = () => ({
    id: crypto.randomUUID(),
    title: 'Untitled diagram',
    isFavorite: false,
    tables: [],
    notes: [],
});

const addDiagram = () => {
    return new Promise((resolve, reject) => {
        const newDiagram = createDiagram();

        const transaction = db.transaction(['diagrams'], 'readwrite');
        transaction.onerror = () => reject();

        const diagramsStore = transaction.objectStore('diagrams');
        const request = diagramsStore.add(newDiagram);
        request.onsuccess = () => resolve(newDiagram);
        request.onerror = (e) => reject(e);
    });
};

export default {
    getDiagrams,
    getDiagramById,
    addDiagram,
};
