const thingsEnglish = {
    Door: "puerta",
    Window: "ventana",
    Table: "mesa",
    Chair: "silla",
    Bed: "cama",
    Sofa: "sofá",
    Lamp: "lámpara",
    Television: "television",
    Phone: "teléfono",
    Keys: "llaves",
    Wallet: "billetera",
    Bag: "bolso",
    Book: "libro",
    Pen: "bolígrafo",
    Laptop: "portatil",
    Watch: "reloj",
    Water: "agua",
    Coffee: "café",
    Bread: "pan",
    Milk: "leche",
    Cheese: "queso",
    Chicken: "pollo",
    Shirt: "camisa",
    Pants: "pantalones",
    Shoes: "zapatos",
    Dress: "vestido",
    Jacket: "chaqueta",
    Hat: "sombrero",
    Socks: "calcetines",
    Car: "Carro",
    Bus: "autobús",
    Street: "calle",
    Tree: "árbol",
    Building: "edificio",
    Store: "tienda",
    Park: "parque",
    School: "escuela",
    Office: "oficina",
    Hospital: "hospital",
    Airport: "aeropuerto",
    Desk: "escritorio",
    Pencil: "lápiz",
    Paper: "papel",
    Glass: "vaso",
}

export function LoadThings() {
    let thingsHtml = '';

    Object.entries(thingsEnglish).forEach(([key, value]) => {
        //console.log(`Inglés: ${key}, Español: ${value}`);
        thingsHtml += `<article class="thing-article" data-thing="${key}-${value.toLowerCase()}">
                <img src="assets/img/cosas/${value.toLowerCase()}.png" alt="${value.toLowerCase()}" width="250">
                <span>${key}</span><span class="thing-spanish">(${value})</span>
            </article>`
    });

    //console.log(thingsEnglish);
    return thingsHtml;
}

export function thingsTo() {
    return thingsEnglish;
}