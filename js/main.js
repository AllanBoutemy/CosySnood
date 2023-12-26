const baseImages = [];
const layerCount = 3;let colorStrength = 0.5;

const colors = ["4E1859","E797F0","BD4791","171C31","3575AB","A2BCE5","204134","93B035","93B035","FF8142","ECAE2F","F7EF4B","881238","D2161A","E3355F","EAA3B9","D2AB8B","EDE8D8"];

for (let i = 1; i <= layerCount; i++) {
    const baseImage = new Image();
    baseImage.src = `images/brioche${i}.png`;
    baseImages.push(baseImage);
}


function drawColorSquare(canvas, context, color) {
    context.clearRect(0, 0, 515, 325);
    context.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b},0.5)`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    let imagetest = document.getElementById('imageTest');
    imagetest.src = canvas.toDataURL();
}

function makeImageResponsive(canvas, imagebase) {
    // Obtenez la largeur de l'écran
    const screenWidth = window.innerWidth;

    // Définissez la largeur du canvas en fonction de la largeur de l'écran
    canvas.width = screenWidth < 768 ? screenWidth : imagebase.width;

    // Calculez la hauteur du canvas en conservant le rapport hauteur/largeur de l'image d'origine
    canvas.height = (canvas.width / imagebase.width) * imagebase.height;

    // Dessinez l'image sur le canvas
    const context = canvas.getContext('2d', { alpha: true });
    context.drawImage(imagebase, 0, 0, canvas.width, canvas.height);
}
function applyColorToLayer(image, color,imagebase) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { alpha: true });

    canvas.width = imagebase.width;
    canvas.height = imagebase.height; 
   /*  makeImageResponsive(canvas, imagebase);*/


    // Dessinerl'image sur le canvas
    context.drawImage(imagebase, 0, 0, imagebase.width, imagebase.height);

    // Obtenir les données de l'image du canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // Si le pixel n'est pas transparent
        if (data[i + 3] !== 0) {
            const lum = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
            const alpha = data[i + 3] / 255;
             // Ajustez cette valeur pour l'intensité

            // Ajuster la couleur en préservant la luminosité
            data[i] = Math.round((1 - colorStrength) * data[i] + color.r * colorStrength);// Rouge
            data[i + 1] = Math.round((1 - colorStrength) * data[i + 1] + color.g * colorStrength); // Vert
            data[i + 2] = Math.round((1 - colorStrength) * data[i + 2] + color.b * colorStrength); // Bleu
    
        }
    }
    
    // Appliquer l'image sur le canvas
    context.putImageData(imageData, 0, 0);

    // Convertir l'image canvas vers une image src
    image.src = canvas.toDataURL();  

}
function changeColors(color1, color2, color3) {
    const echarpeCouche1 = document.getElementById('echarpeCouche1');
    const echarpeCouche2 = document.getElementById('echarpeCouche2');
    const echarpeCouche3 = document.getElementById('echarpeCouche3');

    applyColorToLayer(echarpeCouche1, color1,baseImages[0]);
    applyColorToLayer(echarpeCouche2, color2,baseImages[1]);
    applyColorToLayer(echarpeCouche3, color3,baseImages[2]);
}

/* document.querySelector('.couleur-rouge').addEventListener('click', function () {
    changeColors({ r: 156, g: 0, b: 0 }, { r: 0, g: 255, b: 0 }, { r: 0, g: 0, b: 255 });
});

document.querySelector('.couleur-bleu').addEventListener('click', function () {
    changeColors({ r: 0, g: 0, b: 255 }, { r: 0, g: 0, b: 255 }, { r: 0, g: 0, b: 255 });
}); */


// Gestionnaire d'événement de clic pour les couleurs de la couche 1
document.querySelectorAll('.colorBox .colorList')[0].addEventListener('click', function (event) {
    if (event.target.classList.contains('color')) {
        // Obtenez la couleur au format hexadécimal (ex: #4E1859)
        const colorElement = event.target;
        const computedStyles = window.getComputedStyle(colorElement);
        const colorHex = computedStyles.backgroundColor;
        const colorObj = hexToRgb(colorHex);
        // Appliquer la couleur à la couche 1
        applyColorToLayer(document.getElementById('echarpeCouche1'), colorObj, baseImages[0]);
    }
});

// Gestionnaire d'événement de clic pour les couleurs de la couche 2
document.querySelectorAll('.colorBox .colorList')[1].addEventListener('click', function (event) {
    if (event.target.classList.contains('color')) {
        // Obtenez la couleur au format hexadécimal (ex: #4E1859)
        const colorElement = event.target;
        const computedStyles = window.getComputedStyle(colorElement);
        const colorHex = computedStyles.backgroundColor;
        const colorObj = hexToRgb(colorHex);
        // Appliquer la couleur à la couche 1
        applyColorToLayer(document.getElementById('echarpeCouche2'), colorObj, baseImages[1]);}
});

// Gestionnaire d'événement de clic pour les couleurs de la couche 3
document.querySelectorAll('.colorBox .colorList')[2].addEventListener('click', function (event) {
    // Code similaire pour la couche 3
    if (event.target.classList.contains('color')) {
        // Obtenez la couleur au format hexadécimal (ex: #4E1859)
        const colorElement = event.target;
        const computedStyles = window.getComputedStyle(colorElement);
        const colorHex = computedStyles.backgroundColor;
        const colorObj = hexToRgb(colorHex);
        // Appliquer la couleur à la couche 1
        applyColorToLayer(document.getElementById('echarpeCouche3'), colorObj, baseImages[2]);}
});

function hexToRgb(hex) {

    const colorRgb = extractRgbValues(hex);

    if (colorRgb) {
        console.log(colorRgb); // Cela devrait afficher { r: 234, g: 163, b: 185 }
    } else {
        console.error("Format de couleur inattendu");
    }



    // Retourner un objet de couleur
    return colorRgb;
}

function extractRgbValues(rgbString) {
    const match = rgbString.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
        const [, r, g, b] = match;
        return { r: parseInt(r), g: parseInt(g), b: parseInt(b) };
    }
    return null; // Retourne null si le format n'est pas celui attendu
}