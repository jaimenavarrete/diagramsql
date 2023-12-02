let db;

const createDiagramsObjectStore = (dbCreated) => {
    const objectStore = dbCreated.createObjectStore('diagrams', {
        keyPath: 'id',
    });

    objectStore.createIndex('title', 'title', { unique: false });
    objectStore.createIndex('description', 'description', { unique: false });
    objectStore.createIndex('isFavorite', 'isFavorite', { unique: false });
    objectStore.createIndex('tables', 'description', { unique: false });
    objectStore.createIndex('notes', 'description', { unique: false });
};

const openDB = () => {
    return new Promise((resolve, reject) => {
        const DBOpenRequest = window.indexedDB.open('diagramsql', 4);

        DBOpenRequest.onupgradeneeded = (event) => {
            // @ts-ignore
            const db = event.target.result;
            createDiagramsObjectStore(db);
        };

        DBOpenRequest.onsuccess = () => resolve(DBOpenRequest.result);
        DBOpenRequest.onerror = () => reject();
    });
};

const getDB = async () => (db ??= await openDB());

export { getDB };
