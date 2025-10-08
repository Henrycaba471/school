import { animalTo } from "./animals.js";
import { fruitsRandom } from "./fruits.js";
import { thingsTo } from "./things.js";
import { wordsTo } from "./words.js";

export function loadPractices() {
    //console.log(thingsTo());

    let PracticesHtml = '';

    PracticesHtml += `<div class="themes-to-practice">
                <article class="practice-words">
                    <p>Words</p>
                    <img src="assets/img/palabra-clave.png" alt="" width="50">
                    <p>(Palabras)</p>
                </article>
                <article class="practice-animals">
                    <p>Animals</p>
                    <img src="assets/img/world-animal-day.png" alt="" width="50">
                    <p>(Animales)</p>
                </article>
                <article class="practice-fruits">
                    <p>Fruits</p>
                    <img src="assets/img/fruta.png" alt="" width="50">
                    <p>(Frutas)</p>
                </article>
                <article class="practice-things">
                    <p>Things</p>
                    <img src="assets/img/bienes.png" alt="" width="50">
                    <p>(Cosas)</p>
                </article>
                <article class="practice-mixed">
                    <p>Mixed</p>
                    <img src="assets/img/interactivo.png" alt="" width="50">
                    <p>(Mezclado)</p>
                </article>
            </div>`

    return PracticesHtml;
}

export function loadPracticeWords() {
    let words = wordsTo();
    let navPractice = '';

    let wordsToPractice = [];
    let wordsEnglishPractice = [];

    for (let i = 1; i <= 7; i++) {
        let randomWord = Math.floor(Math.random() * words.length);
        let randomCategory = words[randomWord];
        let randomWordCategory = Object.keys(randomCategory)[0];
        let keysObject = Object.keys(words[randomWord][randomWordCategory]);
        let randomIndex = Math.floor(Math.random() * keysObject.length);
        let randomKey = keysObject[randomIndex];
        let randomWordValue = randomCategory[randomWordCategory][randomKey];
        //console.log(randomKey, randomWordValue);
        wordsToPractice.push({
            word: randomKey,
            translation: randomWordValue.split(' ')[0],
        });
    }

    for (let i = 1; i <= 7; i++) {
        let randomWord = Math.floor(Math.random() * words.length);
        let randomCategory = words[randomWord];
        let randomWordCategory = Object.keys(randomCategory)[0];
        let keysObject = Object.keys(words[randomWord][randomWordCategory]);
        let randomIndex = Math.floor(Math.random() * keysObject.length);
        let randomKey = keysObject[randomIndex];
        let randomWordValue = randomCategory[randomWordCategory][randomKey];
        //console.log(randomKey, randomWordValue);
        wordsEnglishPractice.push({
            word: randomKey,
            translation: randomWordValue.split(' ')[0],
        });
    }

    wordsToPractice.forEach((word) => {
        //console.log(word.word, word.translation);
        let wordHtml = `<article class="word-item">
                            <div class="input-result-practice">
                                <p class="word-english-practice">${word.translation}</p>
                                <input type="text" class="word-input-practice" data-word="${word.word}" placeholder="Escribe la palabra en español" />
                            </div>
                        </article>`;
        navPractice += wordHtml;
    });
    wordsEnglishPractice.forEach((word) => {
        //console.log(word.word, word.translation);
        let wordHtml = `<article class="word-item">
                            <div class="input-result-practice">
                                <p class="word-english-practice">${word.word}</p>
                                <input type="text" class="word-input-practice" data-word="${word.translation}" placeholder="Escribe la palabra en inglés" />
                            </div>
                        </article>`;
        navPractice += wordHtml;
    });

    //navPractice += `<h2>Cargando contenido words...</h2>`
    return navPractice;
}

export function loadPracticeAnimals() {
    let animales = animalTo();
    let htmlAnimals = '';
    const animalesToPractice = [];
    const claveAnimals = Object.keys(animales);

    for (let i = 1; i <= 20; i++) {
        let randomAnimal = Math.floor(Math.random() * claveAnimals.length);
        let animal = claveAnimals[randomAnimal];
        animalesToPractice.push({ esp: animales[animal], eng: animal });
    }

    const puntoMedio = Math.ceil(animalesToPractice.length / 2);
    const primeraMitad = animalesToPractice.slice(0, puntoMedio);
    const segundaMitad = animalesToPractice.slice(puntoMedio);

    primeraMitad.forEach((animal) => {
        let engHtml = `<article class="word-item">
                            <div class="input-result-practice">
                                <img src="assets/img/animals/palabra-clave.png" alt="" width="50">
                                <p class="word-english-practice">${animal.eng}</p>
                                <input type="text" class="word-input-practice" data-word="${animal.esp}" placeholder="Escribe la palabra en español" />
                            </div>
                        </article>`;
        htmlAnimals += engHtml;
    });
    segundaMitad.forEach((animal) => {
        let espHtml = `<article class="word-item">
                            <div class="input-result-practice">
                                <img src="assets/img/animals/${animal.esp}.png" alt="" width="50">
                                <p class="word-english-practice">${animal.esp}</p>
                                <input type="text" class="word-input-practice" data-word="${animal.eng}" placeholder="Escribe la palabra en ingles" />
                            </div>
                        </article>`;
        htmlAnimals += espHtml;
    });

    return htmlAnimals;
}

export function loadPracticeFruits() {
    let fruits = fruitsRandom();
    let htmlFruits = '';
    const fruitsToPractice = [];
    const claveFruits = Object.keys(fruits);

    for (let i = 1; i <= 20; i++) {
        let randomFruit = Math.floor(Math.random() * claveFruits.length);
        let fruit = claveFruits[randomFruit];
        fruitsToPractice.push({ esp: fruits[fruit], eng: fruit });
    }

    const puntoMedio = Math.ceil(fruitsToPractice.length / 2);
    const primeraMitad = fruitsToPractice.slice(0, puntoMedio);
    const segundaMitad = fruitsToPractice.slice(puntoMedio);

    primeraMitad.forEach((fruit) => {
        let engHtml = `<article class="word-item">
                            <div class="input-result-practice">
                                <img src="assets/img/animals/palabra-clave.png" alt="" width="50">
                                <p class="word-english-practice">${fruit.eng}</p>
                                <input type="text" class="word-input-practice" data-word="${fruit.esp}" placeholder="Escribe la palabra en español" />
                            </div>
                        </article>`;
        htmlFruits += engHtml;
    });
    segundaMitad.forEach((fruit) => {
        let espHtml = `<article class="word-item">
                            <div class="input-result-practice">
                                <img src="assets/img/fruits/${fruit.esp}.png" alt="" width="50">
                                <p class="word-english-practice">${fruit.esp}</p>
                                <input type="text" class="word-input-practice" data-word="${fruit.eng}" placeholder="Escribe la palabra en ingles" />
                            </div>
                        </article>`;
        htmlFruits += espHtml;
    });

    return htmlFruits;
}

export function loadPracticeThings() {
    let things = thingsTo();
    let htmlThings = '';
    const thingsToPractice = [];
    const claveThings = Object.keys(things);

    for (let i = 1; i <= 20; i++) {
        let randomThing = Math.floor(Math.random() * claveThings.length);
        let thing = claveThings[randomThing];
        thingsToPractice.push({ esp: things[thing], eng: thing });
    }

    const puntoMedio = Math.ceil(thingsToPractice.length / 2);
    const primeraMitad = thingsToPractice.slice(0, puntoMedio);
    const segundaMitad = thingsToPractice.slice(puntoMedio);

    primeraMitad.forEach((thing) => {
        let engHtml = `<article class="word-item">
                            <div class="input-result-practice">
                                <img src="assets/img/animals/palabra-clave.png" alt="" width="50">
                                <p class="word-english-practice">${thing.eng}</p>
                                <input type="text" class="word-input-practice" data-word="${thing.esp}" placeholder="Escribe la palabra en español" />
                            </div>
                        </article>`;
        htmlThings += engHtml;
    });
    segundaMitad.forEach((thing) => {
        let espHtml = `<article class="word-item">
                            <div class="input-result-practice">
                                <img src="assets/img/cosas/${thing.esp}.png" alt="" width="50">
                                <p class="word-english-practice">${thing.esp}</p>
                                <input type="text" class="word-input-practice" data-word="${thing.eng}" placeholder="Escribe la palabra en ingles" />
                            </div>
                        </article>`;
        htmlThings += espHtml;
    });

    return htmlThings;
}

export function loadPracticeMixed() {
    let words = wordsTo();
    let animales = animalTo();
    let fruits = fruitsRandom();
    let things = thingsTo();
    let htmlMixed = '';
    const mixedToPractice = [];

    // Palabras
    for (let i = 1; i <= 8; i++) {
        let randomWord = Math.floor(Math.random() * words.length);
        let randomCategory = words[randomWord];
        let randomWordCategory = Object.keys(randomCategory)[0];
        let keysObject = Object.keys(words[randomWord][randomWordCategory]);
        let randomIndex = Math.floor(Math.random() * keysObject.length);
        let randomKey = keysObject[randomIndex];
        let randomWordValue = randomCategory[randomWordCategory][randomKey];
        mixedToPractice.push({ esp: randomKey, eng: randomWordValue.split(' ')[0], img: 'palabra-clave.png', type: 'words' });
    }

    // Animales
    const claveAnimals = Object.keys(animales);
    for (let i = 1; i <= 8; i++) {
        let randomAnimal = Math.floor(Math.random() * claveAnimals.length);
        let animal = claveAnimals[randomAnimal];
        mixedToPractice.push({ esp: animales[animal], eng: animal, img: 'animals/' + animales[animal] + '.png', type: 'animals' });
    }

    // Frutas
    const claveFruits = Object.keys(fruits);
    for (let i = 1; i <= 8; i++) {
        let randomFruit = Math.floor(Math.random() * claveFruits.length);
        let fruit = claveFruits[randomFruit];
        mixedToPractice.push({ esp: fruits[fruit], eng: fruit, img: 'fruits/' + fruits[fruit] + '.png', type: 'fruits' });
    }

    // Cosas
    const claveThings = Object.keys(things);
    for (let i = 1; i <= 8; i++) {
        let randomThing = Math.floor(Math.random() * claveThings.length);
        let thing = claveThings[randomThing];
        mixedToPractice.push({ esp: things[thing], eng: thing, img: 'cosas/' + things[thing] + '.png', type: 'things' });
    }

    const puntoMedio = Math.ceil(mixedToPractice.length / 2);
    const primeraMitad = mixedToPractice.slice(0, puntoMedio);
    const segundaMitad = mixedToPractice.slice(puntoMedio);
    //console.log(mixedToPractice);
    primeraMitad.forEach((item) => {
        let engHtml = `<article class="word-item">
                            <div class="input-result-practice">
                                <img src="assets/img/${item.img}" alt="" width="50">
                                <p class="word-english-practice">${item.eng}</p>
                                <input type="text" class="word-input-practice" data-word="${item.esp}" placeholder="Escribe la palabra en español" />
                            </div>
                        </article>`;
        htmlMixed += engHtml;
    });
    segundaMitad.forEach((item) => {
        let espHtml = `<article class="word-item">
                            <div class="input-result-practice">
                                <img src="assets/img/${item.img}" alt="" width="50">
                                <p class="word-english-practice">${item.esp}</p>
                                <input type="text" class="word-input-practice" data-word="${item.eng}" placeholder="Escribe la palabra en ingles" />
                            </div>
                        </article>`;
        htmlMixed += espHtml;
    });
    return htmlMixed;
}