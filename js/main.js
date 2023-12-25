function applyColorToLayer(image, color) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Assurez-vous que le canvas a la même taille que l'image
    canvas.width = image.width;
    canvas.height = image.height;

    // Dessinez l'image sur le canvas
    context.drawImage(image, 0, 0, image.width, image.height);

    // Obtenez les données de l'image du canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Parcourez les pixels de l'image et ajustez la couleur en préservant la luminosité
    for (let i = 0; i < data.length; i += 4) {
        // Si le pixel n'est pas transparent, ajustez la couleur
        if (data[i + 3] !== 0) {
            const alpha = data[i + 3] / 255;

            // Ajustez la couleur en préservant la luminosité
            const lum = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
            data[i] = Math.round((1 - alpha) * data[i] + alpha * (color.r * 255 - lum) + lum);   // Rouge
            data[i + 1] = Math.round((1 - alpha) * data[i + 1] + alpha * (color.g * 255 - lum) + lum); // Vert
            data[i + 2] = Math.round((1 - alpha) * data[i + 2] + alpha * (color.b * 255 - lum) + lum); // Bleu
        }
    }

    // Mettez à jour les données de l'image sur le canvas
    context.putImageData(imageData, 0, 0);

    // Remplacez l'image source par le canvas modifié
    image.src = canvas.toDataURL();
}
function changeColors(color1, color2, color3) {
    const echarpeCouche1 = document.getElementById('echarpeCouche1');
    const echarpeCouche2 = document.getElementById('echarpeCouche2');
    const echarpeCouche3 = document.getElementById('echarpeCouche3');

    applyColorToLayer(echarpeCouche1, color1);
    applyColorToLayer(echarpeCouche2, color2);
    applyColorToLayer(echarpeCouche3, color3);
}

document.querySelector('.couleur-rouge').addEventListener('click', function () {
    changeColors({ r: 156, g: 0, b: 0 }, { r: 0, g: 255, b: 0 }, { r: 0, g: 0, b: 255 });
});

document.querySelector('.couleur-bleu').addEventListener('click', function () {
    changeColors({ r: 0, g: 0, b: 255 }, { r: 0, g: 0, b: 255 }, { r: 0, g: 0, b: 255 });
});