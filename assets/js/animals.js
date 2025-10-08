let animalActual;
const animals = {
    Dog: 'Perro',
    Cat: 'Gato',
    Rabbit: 'Conejo',
    Hamster: 'Hámster',
    Fish: 'Pez',
    Horse: 'Caballo',
    Cow: 'Vaca',
    Pig: 'Cerdo',
    Chicken: 'Gallina',
    Duck: 'Pato',
    Lion: 'León',
    Tiger: 'Tigre',
    Elephant: 'Elefante',
    Monkey: 'Mono',
    Bear: 'Oso',
    Wolf: 'Lobo',
    Fox: 'Zorro',
    Deer: 'Venado',
    Kangaroo: 'Canguro',
    Giraffe: 'Jirafa',
    Ant: 'Hormiga',
    Spider: 'Araña',
    Bee: 'Abeja',
    Butterfly: 'Mariposa',
    Fly: 'Mosca',
    Mosquito: 'Mosquito',
    Ladybug: 'Mariquita',
    Caterpillar: 'Oruga',
    Whale: 'Ballena',
    Dolphin: 'Delfín',
    Shark: 'Tiburón',
    Octopus: 'Pulpo',
    Jellyfish: 'Medusa',
    Crab: 'Cangrejo',
    Shrimp: 'Camarón',
    Seahorse: 'Caballodemar',
    Eagle: 'Águila',
    Owl: 'Búho',
    Parrot: 'Loro',
    Pigeon: 'Paloma',
    Sparrow: 'Gorrión',
    Crow: 'Cuervo',
    Penguin: 'Pingüino',
}

const compAnimal = {
    Dog: {
        phraseOne: "The dog is a man's best friend., El perro es el mejor amigo del hombre.",
        phraseTwo: "The dog is the only animal that loves you more than he loves himself., El perro es el único animal que te ama más de lo que se ama a sí mismo."
    },
    Cat: {
        phraseOne: "Time spent with cats is never wasted., El tiempo pasado con gatos nunca es tiempo perdido.",
        phraseTwo: "The only thing better than a cat is two cats., La única cosa mejor que un gato son dos gatos."
    },
    Rabbit: {
        phraseOne: "Rabbits have a keen sense of smell and hearing., Los conejos tienen un agudo sentido del olfato y del oído.",
        phraseTwo: "A group of rabbits is called a colony., Un grupo de conejos se llama colonia."
    },
    Hamster: {
        phraseOne: "Hamsters are crepuscular meaning they are most active at dusk and dawn., Los hámsteres son crepusculares lo que significa que son más activos al anochecer y al amanecer.",
        phraseTwo: "A hamster's teeth never stop growing., Los dientes de un hámster nunca dejan de crecer."
    },
    Fish: {
        phraseOne: "There are over 33000 known species of fish., Hay más de 33000 especies de peces conocidas.",
        phraseTwo: "Fish use gills to breathe oxygen from the water., Los peces usan branquias para respirar oxígeno del agua."
    },
    Horse: {
        phraseOne: "Horses can sleep both standing up and lying down., Los caballos pueden dormir tanto de pie como tumbados.",
        phraseTwo: "A horse's age can be estimated by looking at its teeth., La edad de un caballo se puede estimar mirando sus dientes."
    },
    Cow: {
        phraseOne: "Cows have four stomachs., Las vacas tienen cuatro estómagos.",
        phraseTwo: "A cow can produce about 15 to 20 gallons of milk a day., Una vaca puede producir entre 15 y 20 galones de leche al día."
    },
    Pig: {
        phraseOne: "Pigs are highly intelligent animals., Los cerdos son animales muy inteligentes.",
        phraseTwo: "Pigs can't sweat so they roll in mud to keep cool., Los cerdos no pueden sudar por lo que se revuelcan en el barro para mantenerse frescos."
    },
    Chicken: {
        phraseOne: "The chicken is the most common bird in the world., La gallina es el ave más común del mundo.",
        phraseTwo: "A chicken's heart beats between 220 and 360 times a minute., El corazón de una gallina late entre 220 y 360 veces por minuto."
    },
    Duck: {
        phraseOne: "Ducks have waterproof feathers., Los patos tienen plumas impermeables.",
        phraseTwo: "A duck's webbed feet are used for paddling and steering., Las patas palmeadas de un pato se utilizan para remar y dirigir."
    },
    Lion: {
        phraseOne: "A lion's roar can be heard from 5 miles away., El rugido de un león se puede oír a 5 millas de distancia.",
        phraseTwo: "Lions are the only cats that live in groups., Los leones son los únicos felinos que viven en grupos."
    },
    Tiger: {
        phraseOne: "Tigers are the largest cat species in the world., Los tigres son la especie de felino más grande del mundo.",
        phraseTwo: "The stripes on a tiger are like human fingerprints no two are the same., Las rayas de un tigre son como las huellas dactilares humanas: no hay dos iguales."
    },
    Elephant: {
        phraseOne: "An elephant's trunk contains over 40.000 muscles., La trompa de un elefante contiene más de 40.000 músculos.",
        phraseTwo: "Elephants communicate using a variety of low-frequency rumbles., Los elefantes se comunican usando una variedad de bramidos de baja frecuencia."
    },
    Monkey: {
        phraseOne: "There are over 260 species of monkeys in the world., Hay más de 260 especies de monos en el mundo.",
        phraseTwo: "Monkeys are highly social and intelligent creatures., Los monos son criaturas muy sociables e inteligentes."
    },
    Bear: {
        phraseOne: "Bears have an excellent sense of smell better than that of a bloodhound., Los osos tienen un excelente sentido del olfato mejor que el de un sabueso.",
        phraseTwo: "Most bears are omnivores eating both plants and meat., La mayoría de los osos son omnívoros comiendo tanto plantas como carne."
    },
    Wolf: {
        phraseOne: "Wolves howl to communicate their location and warn other packs., Los lobos aúllan para comunicar su ubicación y advertir a otras manadas.",
        phraseTwo: "A wolf's powerful bite has a pressure of about 400 psi., La poderosa mordida de un lobo tiene una presión de unas 400 psi."
    },
    Fox: {
        phraseOne: "The fox is part of the canine family but has cat-like qualities., El zorro es parte de la familia canina pero tiene cualidades similares a las de un gato.",
        phraseTwo: "A fox can live in forests mountains and even cities., Un zorro puede vivir en bosques montañas e incluso ciudades."
    },
    Deer: {
        phraseOne: "Male deer grow and shed their antlers every year., Los ciervos machos crecen y mudan sus astas cada año.",
        phraseTwo: "A deer's large ears can rotate to help them hear predators., Las grandes orejas de un ciervo pueden rotar para ayudarles a escuchar a los depredadores."
    },
    Kangaroo: {
        phraseOne: "Kangaroos use their strong tails for balance and support., Los canguros usan sus fuertes colas para mantener el equilibrio y como apoyo.",
        phraseTwo: "A baby kangaroo is called a joey., Una cría de canguro se llama joey."
    },
    Giraffe: {
        phraseOne: "Giraffes have the same number of neck vertebrae as humans: seven., Las jirafas tienen el mismo número de vértebras en el cuello que los humanos: siete.",
        phraseTwo: "A giraffe's tongue can be up to 20 inches long., La lengua de una jirafa puede medir hasta 20 pulgadas de largo."
    },
    Ant: {
        phraseOne: "Ants can lift up to 50 times their own body weight., Las hormigas pueden levantar hasta 50 veces su propio peso corporal.",
        phraseTwo: "Ants live in colonies that can contain millions of individuals., Las hormigas viven en colonias que pueden contener millones de individuos."
    },
    Spider: {
        phraseOne: "Spiders are arachnids not insects., Las arañas son arácnidos no insectos.",
        phraseTwo: "All spiders produce silk but not all of them spin webs., Todas las arañas producen seda pero no todas tejen telarañas."
    },
    Bee: {
        phraseOne: "Bees are vital for pollinating many of the world's crops., Las abejas son vitales para polinizar muchos de los cultivos del mundo.",
        phraseTwo: "A bee's buzz is the sound of its wings beating 190 times a second., El zumbido de una abeja es el sonido de sus alas batiendo 190 veces por segundo."
    },
    Butterfly: {
        phraseOne: "Butterflies taste with their feet., Las mariposas saborean con sus patas.",
        phraseTwo: "A butterfly's life cycle has four stages: egg larva pupa and adult., El ciclo de vida de una mariposa tiene cuatro etapas: huevo larva pupa y adulto."
    },
    Fly: {
        phraseOne: "Flies can walk on ceilings because of tiny pads and hairs on their feet., Las moscas pueden caminar por los techos debido a pequeñas almohadillas y pelos en sus patas.",
        phraseTwo: "A fly's lifespan is typically 15 to 25 days., La vida útil de una mosca es típicamente de 15 a 25 días."
    },
    Mosquito: {
        phraseOne: "Only female mosquitoes bite humans and other animals., Solo las mosquitas hembras pican a los humanos y a otros animales.",
        phraseTwo: "Mosquitoes are attracted to carbon dioxide and lactic acid., Los mosquitos se sienten atraídos por el dióxido de carbono y el ácido láctico."
    },
    Ladybug: {
        phraseOne: "Ladybugs are beetles and are often beneficial to gardens., Las mariquitas son escarabajos y a menudo son beneficiosas para los jardines.",
        phraseTwo: "A ladybug's spots can help to deter predators., Las manchas de una mariquita pueden ayudar a disuadir a los depredadores."
    },
    Caterpillar: {
        phraseOne: "A caterpillar's main job is to eat and grow., La principal tarea de una oruga es comer y crecer.",
        phraseTwo: "Caterpillars have six true legs but can have up to 10 prolegs., Las orugas tienen seis patas verdaderas pero pueden tener hasta 10 propatas."
    },
    Whale: {
        phraseOne: "The blue whale is the largest animal that has ever lived on Earth., La ballena azul es el animal más grande que ha vivido en la Tierra.",
        phraseTwo: "Whales communicate with complex songs and calls., Las ballenas se comunican con complejos cantos y llamadas."
    },
    Dolphin: {
        phraseOne: "Dolphins are known for their intelligence and playful behavior., Los delfines son conocidos por su inteligencia y comportamiento juguetón.",
        phraseTwo: "Dolphins use echolocation to navigate and hunt., Los delfines usan la ecolocalización para navegar y cazar."
    },
    Shark: {
        phraseOne: "Sharks have multiple rows of teeth that can be replaced throughout their lives., Los tiburones tienen múltiples filas de dientes que pueden ser reemplazados a lo largo de sus vidas.",
        phraseTwo: "A shark's skeleton is made of cartilage not bone., El esqueleto de un tiburón está hecho de cartílago no de hueso."
    },
    Octopus: {
        phraseOne: "An octopus has three hearts and blue blood., Un pulpo tiene tres corazones y sangre azul.",
        phraseTwo: "Octopuses can change their color and texture to camouflage themselves., Los pulpos pueden cambiar su color y textura para camuflarse."
    },
    Jellyfish: {
        phraseOne: "Jellyfish have no brains hearts or bones., Las medusas no tienen cerebro corazón ni huesos.",
        phraseTwo: "A group of jellyfish is called a bloom or a swarm., Un grupo de medusas se llama floración o enjambre."
    },
    Crab: {
        phraseOne: "Crabs walk sideways because of the way their leg joints are arranged., Los cangrejos caminan de lado debido a la forma en que se disponen las articulaciones de sus patas.",
        phraseTwo: "A crab's shell is called a carapace., El caparazón de un cangrejo se llama caparazón."
    },
    Shrimp: {
        phraseOne: "Shrimp are omnivores and eat both plants and other small creatures., Los camarones son omnívoros y comen tanto plantas como otras criaturas pequeñas.",
        phraseTwo: "Shrimp can swim backward to escape from danger., Los camarones pueden nadar hacia atrás para escapar del peligro."
    },
    Seahorse: {
        phraseOne: "Male seahorses are the ones who carry the eggs and give birth., Los caballitos de mar machos son los que llevan los huevos y dan a luz.",
        phraseTwo: "Seahorses are the only fish that swim upright., Los caballitos de mar son los únicos peces que nadan erguidos."
    },
    Eagle: {
        phraseOne: "Eagles have incredible eyesight up to eight times better than a human's., Las águilas tienen una vista increíble hasta ocho veces mejor que la de un humano.",
        phraseTwo: "The bald eagle is not bald; its name comes from the word 'piebald' which means 'white-headed'., El águila calva no es calva; su nombre proviene de la palabra 'piebald' que significa 'de cabeza blanca'."
    },
    Owl: {
        phraseOne: "Owls cannot move their eyeballs so they must turn their heads up to 270 degrees., Los búhos no pueden mover sus globos oculares por lo que deben girar sus cabezas hasta 270 grados.",
        phraseTwo: "A group of owls is called a parliament., Un grupo de búhos se llama parlamento."
    },
    Parrot: {
        phraseOne: "Parrots are known for their ability to mimic human speech., Los loros son conocidos por su capacidad para imitar el habla humana.",
        phraseTwo: "Parrots are zygodactyls meaning they have two toes pointing forward and two backward., Los loros son zigodáctilos lo que significa que tienen dos dedos apuntando hacia adelante y dos hacia atrás."
    },
    Pigeon: {
        phraseOne: "Pigeons can find their way home from long distances using the Earth's magnetic field., Las palomas pueden encontrar su camino a casa desde largas distancias usando el campo magnético de la Tierra.",
        phraseTwo: "Pigeons are considered one of the most intelligent birds., Las palomas son consideradas una de las aves más inteligentes."
    },
    Sparrow: {
        phraseOne: "Sparrows are found on every continent except Antarctica., Los gorriones se encuentran en todos los continentes excepto en la Antártida.",
        phraseTwo: "Sparrows are known for their social nature and often form flocks., Los gorriones son conocidos por su naturaleza social y a menudo forman bandadas."
    },
    Crow: {
        phraseOne: "Crows are incredibly smart and can even use tools., Los cuervos son increíblemente inteligentes y pueden incluso usar herramientas.",
        phraseTwo: "A group of crows is called a murder., Un grupo de cuervos se llama 'murder'."
    },
    Penguin: {
        phraseOne: "Penguins are flightless birds that are excellent swimmers., Los pingüinos son aves no voladoras que son excelentes nadadores.",
        phraseTwo: "The Emperor Penguin is the tallest and heaviest of all living penguin species., El pingüino emperador es la especie de pingüino vivo más alta y pesada."
    }
};

//console.log(compAnimal.cat);

export function LoadAnimals() {
    let animalHtml = '';

    Object.entries(animals).forEach(([key, value]) => {
        //console.log(`Inglés: ${key}, Español: ${value}`);
        animalHtml += `<article class="animal-article" data-animal="${key}-${value.toLowerCase()}">
                <img src="assets/img/animals/${value.toLowerCase()}.png" alt="${value.toLowerCase()}" width="200">
                <span>${key}</span><span class="animal-spanish">(${value})</span>
            </article>`
    });

    //console.log(animals);
    return animalHtml;
}

export function loadCompAnimal(animalToSearch) {
    //console.log('... ' + animalToSearch);
    animalActual = animalToSearch;
    let animal = compAnimal[animalToSearch];
    document.querySelector('.phrase-one').innerHTML = `<span class="phrase-english">${animal.phraseOne.split(',')[0]}</span><span class="phrase-spanish">(${animal.phraseOne.split(',')[1]})</span>`;
    document.querySelector('.phrase-two').innerHTML = `<span class="phrase-english">${animal.phraseTwo.split(',')[0]}</span><span class="phrase-spanish">(${animal.phraseTwo.split(',')[1]})</span>`;
    return; //compAnimal[animalToSearch];
}

export function loadNextAnimal() {
    let arrayAnimals = Object.keys(animals);
    let currentIndexAnimal = arrayAnimals.indexOf(animalActual);
    let nextIndex = (currentIndexAnimal + 1) % arrayAnimals.length;
    let nextAnimal = arrayAnimals[nextIndex];
    //console.log(animals[animalActual]);

    document.querySelector('.modal-animal-vista').textContent = `${nextAnimal} (${animals[nextAnimal]})`;
    document.querySelector('.image-animal img').src = `assets/img/animals/${animals[nextAnimal].toLowerCase()}.png`;
    loadCompAnimal(nextAnimal);
    return
}
export function loadPrevAnimal() {
    let arrayAnimals = Object.keys(animals);
    let currentIndexAnimal = arrayAnimals.indexOf(animalActual);

    let prevIndex;

    if (currentIndexAnimal === 0) {
        prevIndex = arrayAnimals.length - 1;
    } else {
        prevIndex = currentIndexAnimal - 1;
    }
    let prevAnimal = arrayAnimals[prevIndex];
    document.querySelector('.modal-animal-vista').textContent = `${prevAnimal} (${animals[prevAnimal]})`;
    document.querySelector('.image-animal img').src = `assets/img/animals/${animals[prevAnimal].toLowerCase()}.png`;
    animalActual = prevAnimal;
    loadCompAnimal(prevAnimal);

    return;
}

export function animalTo() {
    return animals
}
//Lion, Tiger, Elephant, Monkey, Wolf, Fox, Deer, Kangaroo, Giraffe, Ant, Spider, Bee, Butterfly, Fly, Mosquito, Ladybug, Caterpillar, Whale, Dolphin, Shark, Octopus, Jellyfish, Shrimp, Seahorse, Eagle, Owl, Parrot, Pigeon, Sparrow, Crow,
//ALT+164 = ñ
//ALT+165 = Ñ
