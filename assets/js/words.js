const words = [
    {
        pronouns: {
            yo: 'i ai',
            tú: 'you iu:',
            él: 'he hi:',
            ella: 'she shi',
            nosotros: 'we wi',
            vosotros: 'you iu:',
            ellos: 'they dei'
        }
    },
    {
        prepositions: {
            en: 'in in',
            sobre: 'on on',
            en: 'at ats',
            a: 'to tu',
            de: 'from from',
            con: 'with wid',
            por: 'by bai',
            debajo: 'under under',
        }
    },
    {
        conjunctions: {
            y: 'and and',
            pero: 'but buts',
            o: 'or or',
            asi: 'so sou',
            porque: 'because bicaus',
            mientras: 'while wail',
            aunque: 'although aldougt'
        }
    },
    {
        places: {
            escuela: 'School scul',
            trabajo: 'Work work',
            tienda: 'Store estor',
            parque: 'Park park',
            calle: 'Street striit',
            ciudad: 'City citi',
            pais: 'Country cauntri',
            hospital: 'Hospital jospital',
            restaurante: 'Restaurant restaurant',
            banco: 'Bank bank',
            aeropuerto: 'Airport airport'
        }
    }
];

export function loadWords() {
    //console.log(words[1].prepositions);
    let htmlPronouns = '';
    let htmlPrepositions = '';
    let htmlConjunctions = '';
    let htmlPlaces = '';

    for (const key in words[0].pronouns) {
        if (words[0].pronouns.hasOwnProperty(key)) {
            const value = words[0].pronouns[key];
            htmlPronouns += `<tr class="word-traduction">
                <td>${key}</td><td>${value.split(' ')[0]}</td><td class="fonetica">${value.split(' ')[1]}</td>
            </tr>`
        }
    }

    for (const key in words[1].prepositions) {
        if (words[1].prepositions.hasOwnProperty(key)) {
            const value = words[1].prepositions[key];
            htmlPrepositions += `<tr class="word-traduction">
                <td>${key}</td><td>${value.split(' ')[0]}</td><td class="fonetica">${value.split(' ')[1]}</td>
            </tr>`
        }
    }

    for (const key in words[2].conjunctions) {
        if (words[2].conjunctions.hasOwnProperty(key)) {
            const value = words[2].conjunctions[key];
            htmlConjunctions += `<tr class="word-traduction">
                <td>${key}</td><td>${value.split(' ')[0]}</td><td class="fonetica">${value.split(' ')[1]}</td>
            </tr>`
        }
    }

    for (const key in words[3].places) {
        if (words[3].places.hasOwnProperty(key)) {
            const value = words[3].places[key];
            htmlPlaces += `<tr class="word-traduction">
                <td>${key}</td><td>${value.split(' ')[0]}</td><td class="fonetica">${value.split(' ')[1]}</td>
            </tr>`
        }
    }

    return `<div class="words-sections-flex">
    <h2>Some words</h2>
    <section class="words-loaded">
        <table class="table-${Object.keys(words[0])[0]}">
        <caption>Pronombres (${Object.keys(words[0])[0]})</caption>
        <thead>
            <tr>
                <th>español</th>
                <th>inglés</th>
                <th>Pronunciación</th>
            </tr>
        </thead>
        <tbody>
            ${htmlPronouns}
        </tbody>
    </table>
    </section>
    <section class="words-loaded">
        <table class="table-${Object.keys(words[0])[0]}">
            <caption>preposiciones (${Object.keys(words[1])[0]})</caption>
            <thead>
                <tr>
                    <th>español</th>
                    <th>inglés</th>
                    <th>Pronunciación</th>
                </tr>
            </thead>
            <tbody>
                ${htmlPrepositions}
            </tbody>
        </table>
    </section><section class="words-loaded">
        <table class="table-${Object.keys(words[0])[0]}">
            <caption>Conjunciones (${Object.keys(words[2])[0]})</caption>
            <thead>
                <tr>
                    <th>español</th>
                    <th>inglés</th>
                    <th>Pronunciación</th>
                </tr>
            </thead>
            <tbody>
                ${htmlConjunctions}
            </tbody>
        </table>
    </section><section class="words-loaded">
        <table class="table-${Object.keys(words[0])[0]}">
            <caption>Lugares (${Object.keys(words[3])[0]})</caption>
            <thead>
                <tr>
                    <th>español</th>
                    <th>inglés</th>
                    <th>Pronunciación</th>
                </tr>
            </thead>
            <tbody>
                ${htmlPlaces}
            </tbody>
        </table>
    </section></div>`
}

export function wordsTo() {
    return words;
}