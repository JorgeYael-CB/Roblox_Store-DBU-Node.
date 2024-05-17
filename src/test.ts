import fs from 'fs';

export const testingFs = () => {
    const filePath = 'src/sold/script.txt';
    const newObject = {name: 'Yael4', total: 5};

    // Lee el contenido existente del archivo si existe
    let existingContent = [];
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        if (data) {
            existingContent = JSON.parse(data);
        }
    }

    // Asegúrate de que el contenido existente sea un array
    if (!Array.isArray(existingContent)) {
        existingContent = [];
    }

    // Agrega el nuevo objeto al contenido existente
    existingContent.push(newObject);

    // Escribe el contenido actualizado de vuelta al archivo
    fs.writeFileSync(filePath, JSON.stringify(existingContent, null, 2));

    setTimeout(() => {
        const data = fs.readFileSync(filePath, 'utf8');
        console.log(JSON.parse(data));
    }, 5000);
};
