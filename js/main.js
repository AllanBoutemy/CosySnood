const baseImages = [];
const layerCount = 3;

const colors = ["4E1859","E797F0","BD4791","171C31","3575AB","A2BCE5","204134","93B035","93B035","FF8142","ECAE2F","F7EF4B","881238","D2161A","E3355F","EAA3B9","D2AB8B","EDE8D8"];

for (let i = 1; i <= layerCount; i++) {
    const baseImage = new Image();
    baseImage.src = `../images/brioche${i}.png`;
    baseImages.push(baseImage);
}


function drawColorSquare(canvas, context, color) {
    context.clearRect(0, 0, 515, 325);
    // console.log(color.r,color.g,color.b);
    context.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b},0.5)`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    let imagetest = document.getElementById('imageTest');
    imagetest.src = canvas.toDataURL();
}


function applyColorToLayer(image, color,imagebase) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { alpha: true });
    const canvas2 = document.createElement('canvas');
    const context2 = canvas2.getContext('2d', { alpha: true });
    // Assurez-vous que le canvas a la même taille que l'image
    canvas.width = imagebase.width;
    canvas.height = imagebase.height;

    canvas2.width = 30;
    canvas2.height = 30;

    // Dessinez l'image sur le canvas
    context.drawImage(imagebase, 0, 0, imagebase.width, imagebase.height);

    // Obtenez les données de l'image du canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // Si le pixel n'est pas transparent
        if (data[i + 3] !== 0) {
            const lum = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
            const alpha = data[i + 3] / 255;
            const colorStrength = 0.2; // Ajustez cette valeur selon vos besoins

            // Ajuster la couleur en préservant la luminosité
            data[i] = Math.round((1 - colorStrength) * data[i] + color.r * colorStrength);   // Rouge
            data[i + 1] = Math.round((1 - colorStrength) * data[i + 1] + color.g * colorStrength); // Vert
            data[i + 2] = Math.round((1 - colorStrength) * data[i + 2] + color.b * colorStrength); // Bleu
        
/*             color.r.alpha=0.2;
            color.g.alpha=0.2;
            color.b.alpha=0.2;
            data[i] =color.r;   // Rouge
            data[i + 1] = color.g; // Vert
            data[i + 2] = color.b; // Bleu */
        }
    }
    
    // Mettez à jour les données de l'image sur le canvas
    context.putImageData(imageData, 0, 0);

    // Remplacez l'image source par le canvas modifié
    image.src = canvas.toDataURL();  // Dessinez le carré de couleur sur le deuxième canvas
   /*  drawColorSquare(canvas2, context2, color); */



}
function changeColors(color1, color2, color3) {
    const echarpeCouche1 = document.getElementById('echarpeCouche1');
    const echarpeCouche2 = document.getElementById('echarpeCouche2');
    const echarpeCouche3 = document.getElementById('echarpeCouche3');

    applyColorToLayer(echarpeCouche1, color1,baseImages[0]);
    applyColorToLayer(echarpeCouche2, color2,baseImages[1]);
    applyColorToLayer(echarpeCouche3, color3,baseImages[2]);
}

document.querySelector('.couleur-rouge').addEventListener('click', function () {
    changeColors({ r: 156, g: 0, b: 0 }, { r: 0, g: 255, b: 0 }, { r: 0, g: 0, b: 255 });
});

document.querySelector('.couleur-bleu').addEventListener('click', function () {
    changeColors({ r: 0, g: 0, b: 255 }, { r: 0, g: 0, b: 255 }, { r: 0, g: 0, b: 255 });
});