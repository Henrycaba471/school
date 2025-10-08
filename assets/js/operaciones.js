// Funciones para las sumas
export function loadEasySum(level) {
    let sumandoUno = Math.round(Math.random() * 899 + 100);
    let sumandoDos = Math.round(Math.random() * 899 + 100);
    let result = sumandoUno + sumandoDos;

    let htmlEasySum = `
                    <section class="section-sumas">
                        <div class="header-sumas">
                            <h2>Sumas</h2>
                            <span class="average-easy">Completado: ${level}% → Fácil</span>
                        </div>
                        <div class="mode-difficult">
                            <button class="difficult-easy">Fácil</button>
                            <button class="difficult-normal">Normal</button>
                            <button class="difficult-hard">Difícil</button>
                            <button class="difficult-super-hard">Super difícil</button>
                        </div>
                        <div class="body-operation-pizarra">
                            <div class="pizarra-numbers">
                                <div class="suma-operation-body">
                                    <p class="type-operation">+</p>
                                    <div class="sumas-operation">
                                        <div class="sumando-uno">
                                            ${sumandoUno.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                        <div class="sumando-dos">
                                            ${sumandoDos.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                    </div>
                                </div>
                                <div class="input-result">
                                    ${result.toString().split('').map(num => `<input type="text" />`).join(' ')}
                                </div>
                            </div>
                        </div>
                        <div class="footer-sumas">
                            <button class="btn-suma-valid">Comprobar</button>
                            <button class="btn-suma-next" disabled>Siguiente</button>
                        </div>
                    </section>`;
    return {
        html: htmlEasySum,
        expectedResult: result, // Usamos un nombre más claro como 'expectedResult'
    };
};
export function loadNormalSum(level) {
    let sumandoUno = Math.round(Math.random() * 9899 + 100);
    let sumandoDos = Math.round(Math.random() * 9899 + 100);
    let result = sumandoUno + sumandoDos;

    let htmlNormalSum = `
                    <section class="section-sumas">
                        <div class="header-sumas">
                            <h2>Sumas</h2>
                            <span class="average-easy">Completado: ${level}% → normal</span>
                        </div>
                        <div class="mode-difficult">
                            <button class="difficult-easy">Fácil</button>
                            <button class="difficult-normal">Normal</button>
                            <button class="difficult-hard">Difícil</button>
                            <button class="difficult-super-hard">Super difícil</button>
                        </div>
                        <div class="body-operation-pizarra">
                            <div class="pizarra-numbers">
                                <div class="suma-operation-body">
                                    <p class="type-operation">+</p>
                                    <div class="sumas-operation">
                                        <div class="sumando-uno">
                                            ${sumandoUno.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                        <div class="sumando-dos">
                                            ${sumandoDos.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                    </div>
                                </div>
                                <div class="input-result">
                                    ${result.toString().split('').map(num => `<input type="text" />`).join(' ')}
                                </div>
                            </div>
                        </div>
                        <div class="footer-sumas">
                            <button class="btn-suma-valid">Comprobar</button>
                            <button class="btn-suma-next" disabled>Siguiente</button>
                        </div>
                    </section>`;
    return {
        html: htmlNormalSum,
        expectedResult: result // Usamos un nombre más claro como 'expectedResult'
    };
};
export function loadHardSum(level) {
    let sumandoUno = Math.round(Math.random() * 99999 + 1000);
    let sumandoDos = Math.round(Math.random() * 99999 + 1000);
    let sumandoTres = Math.round(Math.random() * 99999 + 1000);

    let result = sumandoUno + sumandoDos + sumandoTres;

    let htmlHardSum = `
                    <section class="section-sumas">
                        <div class="header-sumas">
                            <h2>Sumas</h2>
                            <span class="average-easy">Completado: ${level}% → difícil</span>
                        </div>
                        <div class="mode-difficult">
                            <button class="difficult-easy">Fácil</button>
                            <button class="difficult-normal">Normal</button>
                            <button class="difficult-hard">Difícil</button>
                            <button class="difficult-super-hard">Super difícil</button>
                        </div>
                        <div class="body-operation-pizarra">
                            <div class="pizarra-numbers">
                                <div class="suma-operation-body">
                                    <p class="type-operation">+</p>
                                    <div class="sumas-operation">
                                        <div class="sumando-tres">
                                            ${sumandoTres.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                        <div class="sumando-uno">
                                            ${sumandoUno.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                        <div class="sumando-dos">
                                            ${sumandoDos.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                    </div>
                                </div>
                                <div class="input-result">
                                    ${result.toString().split('').map(num => `<input type="text" />`).join(' ')}
                                </div>
                            </div>
                        </div>
                        <div class="footer-sumas">
                            <button class="btn-suma-valid">Comprobar</button>
                            <button class="btn-suma-next" disabled>Siguiente</button>
                        </div>
                    </section>`;
    return {
        html: htmlHardSum,
        expectedResult: result // Usamos un nombre más claro como 'expectedResult'
    };
}
export function loadSuperHardSum(level) {
    let sumandoUno = Math.round(Math.random() * 999999 + 99999);
    let sumandoDos = Math.round(Math.random() * 999999 + 99999);
    let sumandoTres = Math.round(Math.random() * 999999 + 99999);
    let sumandoCuatro = Math.round(Math.random() * 999999 + 99999);
    let result = sumandoUno + sumandoDos + sumandoTres + sumandoCuatro;
    let htmlHardSum = `
                    <section class="section-sumas">
                        <div class="header-sumas">
                            <h2>Sumas</h2>
                            <span class="average-easy">Completado: ${level}% → muy difícil</span>
                        </div>
                        <div class="mode-difficult">
                            <button class="difficult-easy">Fácil</button>
                            <button class="difficult-normal">Normal</button>
                            <button class="difficult-hard">Difícil</button>
                            <button class="difficult-super-hard">Super difícil</button>
                        </div>
                        <div class="body-operation-pizarra">
                            <div class="pizarra-numbers">
                                <div class="suma-operation-body">
                                    <p class="type-operation">+</p>
                                    <div class="sumas-operation">
                                        <div class="sumando-tres">
                                            ${sumandoCuatro.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                        <div class="sumando-tres">
                                            ${sumandoTres.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                        <div class="sumando-uno">
                                            ${sumandoUno.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                        <div class="sumando-dos">
                                            ${sumandoDos.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                    </div>
                                </div>
                                <div class="input-result">
                                    ${result.toString().split('').map(num => `<input type="text" />`).join(' ')}
                                </div>
                            </div>
                        </div>
                        <div class="footer-sumas">
                            <button class="btn-suma-valid">Comprobar</button>
                            <button class="btn-suma-next" disabled>Siguiente</button>
                        </div>
                    </section>`;
    return {
        html: htmlHardSum,
        expectedResult: result // Usamos un nombre más claro como 'expectedResult'
    };
}

// Funciones para las restas
export function loadEasyRest(level) {
    let numberOne = Math.round(Math.random() * 899 + 100);
    let numberTwo = Math.round(Math.random() * 899 + 100);
    let minuendo;
    let sustraendo;

    if (numberOne >= numberTwo) {
        minuendo = numberOne;
        sustraendo = numberTwo;
    } else {
        minuendo = numberTwo;
        sustraendo = numberOne;
    }

    let result = minuendo - sustraendo;

    let htmlEasyRest = `
                    <section class="section-sumas">
                        <div class="header-sumas">
                            <h2>Restas</h2>
                            <span class="average-easy">Completado: ${level}% → Fácil</span>
                        </div>
                        <div class="mode-difficult">
                            <button class="difficult-easy">Fácil</button>
                            <button class="difficult-normal">Normal</button>
                            <button class="difficult-hard">Difícil</button>
                            <button class="difficult-super-hard">Super difícil</button>
                        </div>
                        <div class="body-operation-pizarra">
                            <div class="pizarra-numbers">
                                <div class="suma-operation-body">
                                    <p class="type-operation">-</p>
                                    <div class="sumas-operation">
                                        <div class="sumando-uno">
                                            ${minuendo.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                        <div class="sumando-dos">
                                            ${sustraendo.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                    </div>
                                </div>
                                <div class="input-result">
                                    ${result.toString().split('').map(num => `<input type="text" />`).join(' ')}
                                </div>
                            </div>
                        </div>
                        <div class="footer-sumas">
                            <button class="btn-suma-valid">Comprobar</button>
                            <button class="btn-suma-next" disabled>Siguiente</button>
                        </div>
                    </section>`;
    return {
        html: htmlEasyRest,
        expectedResult: result, // Usamos un nombre más claro como 'expectedResult'
    };
};
export function loadNormalRest(level) {
    let numberOne = Math.round(Math.random() * 9899 + 100);
    let numberTwo = Math.round(Math.random() * 9899 + 100);
    let minuendo;
    let sustraendo;

    if (numberOne >= numberTwo) {
        minuendo = numberOne;
        sustraendo = numberTwo;
    } else {
        minuendo = numberTwo;
        sustraendo = numberOne;
    }

    let result = minuendo - sustraendo;


    let htmlNormalRest = `
                    <section class="section-sumas">
                        <div class="header-sumas">
                            <h2>Restas</h2>
                            <span class="average-easy">Completado: ${level}% → normal</span>
                        </div>
                        <div class="mode-difficult">
                            <button class="difficult-easy">Fácil</button>
                            <button class="difficult-normal">Normal</button>
                            <button class="difficult-hard">Difícil</button>
                            <button class="difficult-super-hard">Super difícil</button>
                        </div>
                        <div class="body-operation-pizarra">
                            <div class="pizarra-numbers">
                                <div class="suma-operation-body">
                                    <p class="type-operation">-</p>
                                    <div class="sumas-operation">
                                        <div class="sumando-uno">
                                            ${minuendo.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                        <div class="sumando-dos">
                                            ${sustraendo.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                    </div>
                                </div>
                                <div class="input-result">
                                    ${result.toString().split('').map(num => `<input type="text" />`).join(' ')}
                                </div>
                            </div>
                        </div>
                        <div class="footer-sumas">
                            <button class="btn-suma-valid">Comprobar</button>
                            <button class="btn-suma-next" disabled>Siguiente</button>
                        </div>
                    </section>`;
    return {
        html: htmlNormalRest,
        expectedResult: result // Usamos un nombre más claro como 'expectedResult'
    };
};
export function loadHardRest(level) {
    let numberOne = Math.round(Math.random() * 999999 + 99999);
    let numberTwo = Math.round(Math.random() * 999999 + 99999);
    let minuendo;
    let sustraendo;

    if (numberOne >= numberTwo) {
        minuendo = numberOne;
        sustraendo = numberTwo;
    } else {
        minuendo = numberTwo;
        sustraendo = numberOne;
    }
    let result = minuendo - sustraendo;

    let htmlHardRest = `
                    <section class="section-sumas">
                        <div class="header-sumas">
                            <h2>Restas</h2>
                            <span class="average-easy">Completado: ${level}% → difícil</span>
                        </div>
                        <div class="mode-difficult">
                            <button class="difficult-easy">Fácil</button>
                            <button class="difficult-normal">Normal</button>
                            <button class="difficult-hard">Difícil</button>
                            <button class="difficult-super-hard">Super difícil</button>
                        </div>
                        <div class="body-operation-pizarra">
                            <div class="pizarra-numbers">
                                <div class="suma-operation-body">
                                    <p class="type-operation">-</p>
                                    <div class="sumas-operation">
                                        <div class="sumando-uno">
                                            ${minuendo.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                        <div class="sumando-dos">
                                            ${sustraendo.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                    </div>
                                </div>
                                <div class="input-result">
                                    ${result.toString().split('').map(() => `<input type="text" />`).join(' ')}
                                </div>
                            </div>
                        </div>
                        <div class="footer-sumas">
                            <button class="btn-suma-valid">Comprobar</button>
                            <button class="btn-suma-next" disabled>Siguiente</button>
                        </div>
                    </section>`;
    return {
        html: htmlHardRest,
        expectedResult: result // Usamos un nombre más claro como 'expectedResult'
    };
}
export function loadSuperHardRest(level) {
    let numberOne = Math.round(Math.random() * 99999999 + 999999);
    let numberTwo = Math.round(Math.random() * 99999999 + 999999);
    let minuendo;
    let sustraendo;

    if (numberOne >= numberTwo) {
        minuendo = numberOne;
        sustraendo = numberTwo;
    } else {
        minuendo = numberTwo;
        sustraendo = numberOne;
    }

    let result = minuendo - sustraendo;

    let htmlHardRest = `
                    <section class="section-sumas">
                        <div class="header-sumas">
                            <h2>Restas</h2>
                            <span class="average-easy">Completado: ${level}% → muy difícil</span>
                        </div>
                        <div class="mode-difficult">
                            <button class="difficult-easy">Fácil</button>
                            <button class="difficult-normal">Normal</button>
                            <button class="difficult-hard">Difícil</button>
                            <button class="difficult-super-hard">Super difícil</button>
                        </div>
                        <div class="body-operation-pizarra">
                            <div class="pizarra-numbers">
                                <div class="suma-operation-body">
                                    <p class="type-operation">-</p>
                                    <div class="sumas-operation">
                                        <div class="sumando-uno">
                                            ${minuendo.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                        <div class="sumando-dos">
                                            ${sustraendo.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                    </div>
                                </div>
                                <div class="input-result">
                                    ${result.toString().split('').map(() => `<input type="text" />`).join(' ')}
                                </div>
                            </div>
                        </div>
                        <div class="footer-sumas">
                            <button class="btn-suma-valid">Comprobar</button>
                            <button class="btn-suma-next" disabled>Siguiente</button>
                        </div>
                    </section>`;
    return {
        html: htmlHardRest,
        expectedResult: result // Usamos un nombre más claro como 'expectedResult'
    };
}

// Funciones para las multiplicaciones
export function loadEasyMulti(level) {
    let numberOne = Math.round(Math.random() * 999);
    let numberTwo = Math.round(Math.random() * 9);
    let productoUno;
    let productoDos;

    if (numberOne >= numberTwo) {
        productoUno = numberOne;
        productoDos = numberTwo;
    } else {
        productoUno = numberTwo;
        productoDos = numberOne;
    }

    let result = productoUno * productoDos;

    let htmlEasyMulti = `
                    <section class="section-sumas">
                        <div class="header-sumas">
                            <h2>Multiplicación</h2>
                            <span class="average-easy">Completado: ${level}% → Fácil</span>
                        </div>
                        <div class="mode-difficult">
                            <button class="difficult-easy">Fácil</button>
                            <button class="difficult-normal">Normal</button>
                            <button class="difficult-hard">Difícil</button>
                            <button class="difficult-super-hard">Super difícil</button>
                        </div>
                        <div class="body-operation-pizarra-multi">
                            <div class="pizarra-numbers">
                                <div class="suma-operation-body">
                                    <p class="type-operation">x</p>
                                    <div class="sumas-operation">
                                        <div class="sumando-uno">
                                            ${productoUno.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                        <div class="sumando-dos">
                                            ${productoDos.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                    </div>
                                </div>
                                <div class="input-result">
                                    ${result.toString().split('').map(() => `<input type="text" />`).join(' ')}
                                </div>
                            </div>
                        </div>
                        <div class="footer-sumas">
                            <button class="btn-suma-valid">Comprobar</button>
                            <button class="btn-suma-next" disabled>Siguiente</button>
                        </div>
                    </section>`;
    return {
        html: htmlEasyMulti,
        expectedResult: result, // Usamos un nombre más claro como 'expectedResult'
    };
};
export function loadNormalMulti(level) {
    let numberOne = Math.round(Math.random() * 9999 + 100);
    let numberTwo = Math.round(Math.random() * 89 + 10);
    let productoUno;
    let productoDos;

    if (numberOne >= numberTwo) {
        productoUno = numberOne;
        productoDos = numberTwo;
    } else {
        productoUno = numberTwo;
        productoDos = numberOne;
    }

    let sumandoUno = parseInt(productoDos.toString().split('')[1], 10) * productoUno;
    let sumandoDos = parseInt(productoDos.toString().split('')[0], 10) * productoUno;

    let result = productoUno * productoDos;
    //console.log(result);

    let htmlNormalMulti = `
                    <section class="section-sumas">
                        <div class="header-sumas">
                            <h2>Multiplicación</h2>
                            <span class="average-easy">Completado: ${level}% → Fácil</span>
                        </div>
                        <div class="mode-difficult">
                            <button class="difficult-easy">Fácil</button>
                            <button class="difficult-normal">Normal</button>
                            <button class="difficult-hard">Difícil</button>
                            <button class="difficult-super-hard">Super difícil</button>
                        </div>
                        <div class="body-operation-pizarra-multi">
                            <div class="pizarra-numbers">
                                <div class="suma-operation-body">
                                    <p class="type-operation">x</p>
                                    <div class="sumas-operation">
                                        <div class="sumando-uno">
                                            ${productoUno.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                        <div class="sumando-dos">
                                            ${productoDos.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                    </div>
                                </div>
                                <div class="input-result-multi">
                                    <div class="suma-multi">
                                        ${sumandoUno.toString().split('').map(num => `<input type="text" />`).join(' ')}
                                    </div>
                                    <div class="suma-multi-dos">
                                        ${sumandoDos.toString().split('').map(num => `<input type="text" />`).join(' ')}
                                        <input type="text" readonly style="background-color: #c8c5c54f;">
                                    </div>
                                    <div class="input-result">
                                        ${result.toString().split('').map(() => `<input type="text" />`).join(' ')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="footer-sumas">
                            <button class="btn-suma-valid">Comprobar</button>
                            <button class="btn-suma-next" disabled>Siguiente</button>
                        </div>
                    </section>`;
    return {
        html: htmlNormalMulti,
        expectedResult: result, // Usamos un nombre más claro como 'expectedResult'
    };
};
export function loadHardMulti(level) {
    let numberOne = Math.round(Math.random() * 99999 + 1000);
    let numberTwo = Math.round(Math.random() * 899 + 100);
    let productoUno;
    let productoDos;

    if (numberOne >= numberTwo) {
        productoUno = numberOne;
        productoDos = numberTwo;
    } else {
        productoUno = numberTwo;
        productoDos = numberOne;
    }

    let sumandoUno = parseInt(productoDos.toString().split('')[2], 10) * productoUno;
    let sumandoDos = parseInt(productoDos.toString().split('')[1], 10) * productoUno;
    let sumandoTres = parseInt(productoDos.toString().split('')[0], 10) * productoUno;

    let result = productoUno * productoDos;
    //console.log(result);

    let htmlHardMulti = `
                    <section class="section-sumas">
                        <div class="header-sumas">
                            <h2>Multiplicación</h2>
                            <span class="average-easy">Completado: ${level}% → Fácil</span>
                        </div>
                        <div class="mode-difficult">
                            <button class="difficult-easy">Fácil</button>
                            <button class="difficult-normal">Normal</button>
                            <button class="difficult-hard">Difícil</button>
                            <button class="difficult-super-hard">Super difícil</button>
                        </div>
                        <div class="body-operation-pizarra-multi">
                            <div class="pizarra-numbers">
                                <div class="suma-operation-body">
                                    <p class="type-operation">x</p>
                                    <div class="sumas-operation">
                                        <div class="sumando-uno">
                                            ${productoUno.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                        <div class="sumando-dos">
                                            ${productoDos.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                    </div>
                                </div>
                                <div class="input-result-multi">
                                    <div class="suma-multi">
                                        ${sumandoUno.toString().split('').map(() => `<input type="text" />`).join(' ')}
                                    </div>
                                    <div class="suma-multi">
                                        ${sumandoDos.toString().split('').map(() => `<input type="text" />`).join(' ')}
                                        <input type="text" readonly style="background-color: #c8c5c54f;">
                                    </div>
                                    <div class="suma-multi-dos">
                                        ${sumandoTres.toString().split('').map(() => `<input type="text" />`).join(' ')}
                                        <input type="text" readonly style="background-color: #c8c5c54f;">
                                        <input type="text" readonly style="background-color: #c8c5c54f;">
                                    </div>
                                    <div class="input-result">
                                        ${result.toString().split('').map(() => `<input type="text" />`).join(' ')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="footer-sumas">
                            <button class="btn-suma-valid">Comprobar</button>
                            <button class="btn-suma-next" disabled>Siguiente</button>
                        </div>
                    </section>`;
    return {
        html: htmlHardMulti,
        expectedResult: result, // Usamos un nombre más claro como 'expectedResult'
    };
};

//Funciones para las divisiones
export function loadEasyDiv(level) {
    let numberOne = Math.round(Math.random() * 999);
    let numberTwo = Math.round(Math.random() * 9);
    let dividendo;
    let divisor;
    let cociente;

    if (numberOne >= numberTwo) {
        dividendo = numberOne;
        divisor = numberTwo;
    } else {
        dividendo = numberTwo;
        divisor = numberOne;
    }

    if (divisor === 0) {
        divisor = 1;
    }

    let result = dividendo / divisor;
    result = parseInt(result, 10);
    console.log(result);
    cociente = dividendo % divisor;

    let htmlEasyDiv = `
                    <section class="section-sumas">
                        <div class="header-sumas">
                            <h2>División</h2>
                            <span class="average-easy">Completado: ${level}% → Fácil</span>
                        </div>
                        <div class="mode-difficult">
                            <button class="difficult-easy">Fácil</button>
                            <button class="difficult-normal">Normal</button>
                            <button class="difficult-hard">Difícil</button>
                            <button class="difficult-super-hard">Super difícil</button>
                        </div>
                        <div class="body-operation-pizarra-multi">
                            <div class="pizarra-numbers">
                                <div class="suma-operation-body">
                                    <div class="division-operation">
                                        <div class="dividendo-uno">
                                            <div>
                                                ${dividendo.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                                ${result.toString().split('').map(() => `<div class="residuos"><input type="text" /></div>`).join(' ')}
                                            </div>
                                        </div>
                                        <div class="divisor-dos">
                                            ${divisor.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                    </div>
                                </div>
                                <div class="input-result-div">
                                    ${result.toString().split('').map(() => `<input type="text" />`).join(' ')}
                                </div>
                            </div>
                        </div>
                        <div class="footer-sumas">
                            <button class="btn-suma-valid">Comprobar</button>
                            <button class="btn-suma-next" disabled>Siguiente</button>
                        </div>
                    </section>`;
    return {
        html: htmlEasyDiv,
        expectedResult: result, // Usamos un nombre más claro como 'expectedResult'
    };
};
export function loadNormalDiv(level) {
    let numberOne = Math.round(Math.random() * 99899 + 100);
    let numberTwo = Math.round(Math.random() * 88 + 10);
    let dividendo;
    let divisor;
    let cociente;

    if (numberOne >= numberTwo) {
        dividendo = numberOne;
        divisor = numberTwo;
    } else {
        dividendo = numberTwo;
        divisor = numberOne;
    }

    if (divisor === 0) {
        divisor = 10;
    }

    let result = dividendo / divisor;
    result = parseInt(result, 10);
    console.log(result);
    cociente = dividendo % divisor;

    let htmlNormalDiv = `
                    <section class="section-sumas">
                        <div class="header-sumas">
                            <h2>División</h2>
                            <span class="average-easy">Completado: ${level}% → Fácil</span>
                        </div>
                        <div class="mode-difficult">
                            <button class="difficult-easy">Fácil</button>
                            <button class="difficult-normal">Normal</button>
                            <button class="difficult-hard">Difícil</button>
                            <button class="difficult-super-hard">Super difícil</button>
                        </div>
                        <div class="body-operation-pizarra-multi">
                            <div class="pizarra-numbers">
                                <div class="suma-operation-body">
                                    <div class="division-operation">
                                        <div class="dividendo-uno">
                                            <div>
                                                ${dividendo.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                                ${result.toString().split('').map(() => `<div class="residuos"><input type="text" /></div>`).join(' ')}
                                            </div>
                                        </div>
                                        <div class="divisor-dos">
                                            ${divisor.toString().split('').map(num => `<span>${num}</span>`).join(' ')}
                                        </div>
                                    </div>
                                </div>
                                <div class="input-result-div">
                                    ${result.toString().split('').map(() => `<input type="text" />`).join(' ')}
                                </div>
                            </div>
                        </div>
                        <div class="footer-sumas">
                            <button class="btn-suma-valid">Comprobar</button>
                            <button class="btn-suma-next" disabled>Siguiente</button>
                        </div>
                    </section>`;
    return {
        html: htmlNormalDiv,
        expectedResult: result,
    };
};

