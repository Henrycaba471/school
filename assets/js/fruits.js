const fruits = {
    // Frutas comunes
    Apple: "manzana",
    Banana: "plátano",
    Orange: "naranja",
    Grape: "uva",
    Strawberry: "fresa",
    Watermelon: "sandía",
    Pineapple: "piña",
    Mango: "mango",
    Lemon: "limón",
    Cherry: "cereza",
    Peach: "durazno",
    Pear: "pera",
    Kiwi: "kiwi",
    Apricot: "albaricoque",
    Avocado: "aguacate",
    Blueberry: "arándano",
    Blackberry: "mora",
    Coconut: "coco",
    Fig: "higo",
    Grapefruit: "pomelo",
    Guava: "guayaba",
    Lime: "lima",
    Melon: "melón",
    Nectarine: "nectarina",
    Papaya: "papaya",
    Plum: "ciruela",
    Raspberry: "frambuesa",
    Tangerine: "mandarina"
};

export function loadFruits() {
    let fruitsHtml = '';

    Object.entries(fruits).forEach(([key, value]) => {
        //console.log(`Inglés: ${key}, Español: ${value}`);
        fruitsHtml += `<article class="fruits-article" data-thing="${key}-${value.toLowerCase()}">
                <img src="assets/img/fruits/${value.toLowerCase()}.png" alt="${value.toLowerCase()}" width="200">
                <span>${key}</span><span class="thing-spanish">(${value})</span>
            </article>`
    });

    //console.log(thingsEnglish);
    return fruitsHtml;
}

export function fruitsRandom() {
    return fruits;
}