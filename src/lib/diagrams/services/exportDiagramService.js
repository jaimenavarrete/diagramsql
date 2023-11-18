import html2canvas from 'html2canvas';

const saveFile = (fileUrl, extension) => {
    const link = document.createElement('a');
    document.body.append(link);
    link.download = `diagram.${extension}`;
    link.href = fileUrl;
    link.click();
    link.remove();
};

export const exportImage = async (element, tables) => {
    const margin = 50;

    const lowestY = tables.map((table) => table.positionY),
        highestY = tables.map((table) => table.positionY + table.height);

    const lowestX = tables.map((table) => table.positionX),
        highestX = tables.map((table) => table.positionX + table.width);

    const height = Math.max(...highestY) - Math.min(...lowestY) + margin;
    const width = Math.max(...highestX) - Math.min(...lowestX) + margin;

    const canvas = await html2canvas(element, {
        height: height,
        width: width,
        x: Math.min(...lowestX) - margin / 2,
        y: Math.min(...lowestY) - margin / 2,

        onclone: (clonedDoc) => {
            // Reset scaling to avoid rendering problems
            const canvas = clonedDoc.getElementById('canvas');
            canvas.style.transform = 'scale(1)';

            // Remove elements shadow to avoid rendering problems
            /** @type {HTMLElement[]} */
            const tables = Array.from(canvas.querySelectorAll('.table'));
            for (let table of tables) {
                table.style.boxShadow = 'none';
            }

            // Remove active classes to avoid colored elements in image
            /** @type {HTMLElement[]} */
            const selectedElements = Array.from(
                canvas.querySelectorAll('.selected-table,.is-active')
            );
            for (let selected of selectedElements) {
                selected.classList.remove('selected-table', 'is-active');
            }
        },
    });

    saveFile(canvas.toDataURL(), 'png');
};
