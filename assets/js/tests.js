//Funcion para los 
export function loadHtmlSectionTest() {
    const titleAsignatura = document.querySelector('.title-asignatura');
    titleAsignatura.textContent = '';
    const html = `
    <section class="tests-section">
        <div class="test-header">
            <h1>Pruebas de Matemáticas🧮</h1>
            <p>Elige el tipo de prueba que deseas realizar:</p>
        </div>
        <div class="test-suma"><h2><img src="assets/img/mas.png" alt="Suma Icon" width="100" /></h2></div>
        <div class="test-resta"><h2><img src="assets/img/menos.png" alt="Suma Icon" width="100" /></h2></div>
        <div class="test-multi"><h2><img src="assets/img/por.png" alt="Suma Icon" width="100" /></h2></div>
        <div class="test-div"><h2><img src="assets/img/dividir.png" alt="Suma Icon" width="100" /></h2></div>
        <div class="test-div"><h2><img src="assets/img/signos.png" alt="Suma Icon" width="100" /></h2></div>
    </section>
    `;
    return {
        html: html,
    };
}
export function loadSumaTest({sumandoUno, sumandoDos, resultado}) {
    const titleAsignatura = document.querySelector('.title-asignatura');
    titleAsignatura.textContent = 'Pruebas de matemáticas - Sumas (➕)';
    return {
        html: `<section class="sumas-test-section">
                    <h3>Resuelve las siguientes sumas:</h3>
                    <div class="sumas-container-test">
                        <ul class="ejercicios-suma-list">
                            Ejercicios a resolver:
                            <li class="ejercicio-suma-item-0"><button class="item-0" disabled>1</button></li>
                            <li class="ejercicio-suma-item-1"><button class="item-1" disabled>2</button></li>
                            <li class="ejercicio-suma-item-2"><button class="item-2" disabled>3</button></li>
                            <li class="ejercicio-suma-item-3"><button class="item-3" disabled>4</button></li>
                            <li class="ejercicio-suma-item-4"><button class="item-4" disabled>5</button></li>
                            <li class="ejercicio-suma-item-5"><button class="item-5" disabled>6</button></li>
                            <li class="ejercicio-suma-item-6"><button class="item-6" disabled>7</button></li>
                            <li class="ejercicio-suma-item-7"><button class="item-7" disabled>8</button></li>
                            <li class="ejercicio-suma-item-8"><button class="item-8" disabled>9</button></li>
                            <li class="ejercicio-suma-item-9"><button class="item-9" disabled>10</button></li>
                        </ul>
                        <div class="ejercicio-suma-test">
                            <div class="sumandos-test">
                                <p>${sumandoUno}</p>
                                <p>${sumandoDos}</p>
                            </div>
                            <div class="resultado-test">
                                ${resultado.toString().split('').map(() => `<input type="text" />`).join(' ')}
                            </div>
                        </div>
                    </div>
                    <div class="btn-siguiente-regreso">
                        <button class="btn-siguiente-suma">Siguiente</button>
                    </div>
            </section>`,
    }
}