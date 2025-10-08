import { LoadAnimals, loadCompAnimal, loadNextAnimal, loadPrevAnimal } from './animals.js';
import { loadFruits } from './fruits.js';
import { loadEasyDiv, loadEasyMulti, loadEasyRest, loadEasySum, loadHardMulti, loadHardRest, loadHardSum, loadNormalMulti, loadNormalRest, loadNormalSum, loadNormalDiv, loadSuperHardRest, loadSuperHardSum } from './operaciones.js';
import { loadPracticeAnimals, loadPracticeFruits, loadPracticeMixed, loadPractices, loadPracticeThings, loadPracticeWords } from './practice.js';
import { loadHtmlSectionTest, loadSumaTest } from './tests.js';
import { LoadThings } from './things.js';
import { loadWords } from './words.js';
import { CURRENT_SERVER } from './server.js';

document.addEventListener('DOMContentLoaded', () => {

    let content = document.querySelector('.main');
    let loader = document.querySelector('.loader-container');
    let username = document.querySelector('.user-name');
    let userIdentifier = document.querySelector('.user-identifier');
    const btnOptions = document.querySelector('.btn-options');
    const options = document.querySelector('.options');
    const contenedorTemas = document.querySelector('.list-temas-learning');
    let levelSumas = 0;
    let temasEncontradosAsignatura = {};

    let currentExpectedResult = null; // Variable para almacenar el resultado esperado de la suma actual

    btnOptions.addEventListener('click', () => {
        options.classList.toggle('toggle-options');
    });

    document.addEventListener('click', (event) => {
        if (!btnOptions.contains(event.target) && !options.contains(event.target)) {
            options.classList.add('toggle-options');
        }
        if (event.target.matches('.logout')) {
            localStorage.removeItem('authToken');
            content.style.display = 'none';
            loader.style.display = 'flex';
            return setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    });

    //Validar autorización de ingreso
    const token = localStorage.getItem('authToken');

    if (!token) {
        return setTimeout(() => {
            content.style.display = 'none';
            loader.style.display = 'flex';
            window.location.href = 'index.html';
        }, 2000);
    }

    async function cargarDashboard() {
        //console.log(LOCAL_SERVER, DEPLOYED_SERVER);

        try {
            const res = await fetch(CURRENT_SERVER + '/api/users/dashboard', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al cargar el dashboard');
            }

            const data = await res.json();

            username.textContent = `${data.user.name} ${data.user.lastName.split(' ')[0]}`;
            userIdentifier.textContent = `@${data.user.username}`;

            setTimeout(() => {
                content.style.display = 'flex';
                loader.style.display = 'none';
            }, 2000);

        } catch (error) {
            setTimeout(() => {
                content.style.display = 'none';
                loader.style.display = 'flex';
                return window.location.href = 'index.html';
            }, 2000);
        }
    }

    //Configuración de las sumas
    function setupEasySum() {
        //console.log(temasEncontradosAsignatura);
        if (temasEncontradosAsignatura[0].level >= 25) {
            alert('Has alcanzado el nivel máximo de en modo fácil.');
            setupNormalSum();
            return;
        }
        let { html: easySumHtml, expectedResult: newExpectedResult } = loadEasySum(temasEncontradosAsignatura[0].level);
        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = easySumHtml;
        currentExpectedResult = newExpectedResult;

        let btnComprobar = document.querySelector('.btn-suma-valid');
        let btnNext = document.querySelector('.btn-suma-next');
        let easyBtn = document.querySelector('.difficult-easy');
        let normalBtn = document.querySelector('.difficult-normal');
        let hardBtn = document.querySelector('.difficult-hard');
        let superHardBtn = document.querySelector('.difficult-super-hard');
        easyBtn.disabled = true;

        if (btnComprobar) {
            btnComprobar.addEventListener('click', () => {
                const inputs = document.querySelectorAll('.input-result input');
                let cadenaValues = '';
                inputs.forEach(input => {
                    cadenaValues += input.value;
                });
                const respuestaUsuario = parseInt(cadenaValues, 10);

                if (respuestaUsuario === currentExpectedResult) {
                    temasEncontradosAsignatura[0].level += 0.25;
                    fetch(`http://localhost:3000/api/temas/actualizar-tema/${temasEncontradosAsignatura[0]._id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ level: temasEncontradosAsignatura[0].level })
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Error al actualizar el nivel del tema');
                        }
                        return response.json();
                    });
                    let modal = document.createElement('article');
                    modal.classList.add('modal-success-operation');
                    modal.innerHTML = `
                        <h3>¡Correcto!🎉😊</h3>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        btnNext.disabled = false;
                        btnComprobar.disabled = true;
                    }, 1000);
                } else {
                    btnNext.disabled = true; // Por si acaso se vuelve a equivocar
                    // Crear modal de error
                    let modal = document.createElement('article');
                    modal.classList.add('modal-error-operation');

                    modal.innerHTML = `
                        <h3>Respuesta incorrecta</h3>
                        <p>Inténtalo de nuevo. <span>😔</span></p>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 2000);
                }
            });
        }

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                btnNext.disabled = true;
                setupEasySum(); // Carga una nueva suma
            });
        }
        if (normalBtn) {
            normalBtn.addEventListener('click', () => {
                setupNormalSum();
            });
        }
        if (hardBtn) {
            hardBtn.addEventListener('click', () => {
                setupHardSum();
            });
        }
        if (superHardBtn) {
            superHardBtn.addEventListener('click', () => {
                setupSuperHardSum();
            });
        }
    }
    function setupNormalSum() {
        //console.log(temasEncontradosAsignatura[0]);
        if (temasEncontradosAsignatura[0].level >= 50) {
            alert('Has alcanzado el nivel máximo de en modo normal.');
            setupHardSum();
            return;
        }
        const { html: htmlNormalSum, expectedResult: newExpectedResult } = loadNormalSum(temasEncontradosAsignatura[0].level);
        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = htmlNormalSum;
        currentExpectedResult = newExpectedResult;

        let easyBtn = document.querySelector('.difficult-easy');
        let normalBtn = document.querySelector('.difficult-normal');
        let hardBtn = document.querySelector('.difficult-hard');
        let superHardBtn = document.querySelector('.difficult-super-hard');
        let btnComprobar = document.querySelector('.btn-suma-valid');
        let btnNext = document.querySelector('.btn-suma-next');
        normalBtn.disabled = true;
        easyBtn.disabled = false;

        if (btnComprobar) {
            btnComprobar.addEventListener('click', () => {
                const inputs = document.querySelectorAll('.input-result input');
                let cadenaValues = '';
                inputs.forEach(input => {
                    cadenaValues += input.value;
                });
                const respuestaUsuario = parseInt(cadenaValues, 10);

                if (respuestaUsuario === currentExpectedResult) {
                    temasEncontradosAsignatura[0].level += 0.25;
                    fetch(`http://localhost:3000/api/temas/actualizar-tema/${temasEncontradosAsignatura[0]._id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ level: temasEncontradosAsignatura[0].level })
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Error al actualizar el nivel del tema');
                        }
                        return response.json();
                    });
                    let modal = document.createElement('article');
                    modal.classList.add('modal-success-operation');
                    modal.innerHTML = `
                        <h3>¡Correcto!🎉😊</h3>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        btnNext.disabled = false;
                        btnComprobar.disabled = true;
                    }, 1000);
                } else {
                    btnNext.disabled = true; // Por si acaso se vuelve a equivocar
                    // Crear modal de error
                    let modal = document.createElement('article');
                    modal.classList.add('modal-error-operation');

                    modal.innerHTML = `
                        <h3>Respuesta incorrecta</h3>
                        <p>Inténtalo de nuevo. <span>😔</span></p>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 2000);
                }
            });
        }
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                btnNext.disabled = true;
                setupNormalSum();
            });
        }

        if (easyBtn) {
            easyBtn.addEventListener('click', () => {
                setupEasySum();
            });
        }
        if (hardBtn) {
            hardBtn.addEventListener('click', () => {
                setupHardSum();
            });
        }
        if (superHardBtn) {
            superHardBtn.addEventListener('click', () => {
                setupSuperHardSum();
            });
        }
    }
    function setupHardSum() {
        //console.log(temasEncontradosAsignatura[0]);
        if (temasEncontradosAsignatura[0].level >= 75) {
            alert('Has alcanzado el nivel máximo de en modo difícil.');
            setupSuperHardSum();
            return;
        }
        const { html: htmlHardSum, expectedResult: newExpectedResult } = loadHardSum(temasEncontradosAsignatura[0].level);
        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = htmlHardSum;
        currentExpectedResult = newExpectedResult;

        let easyBtn = document.querySelector('.difficult-easy');
        let normalBtn = document.querySelector('.difficult-normal');
        let hardBtn = document.querySelector('.difficult-hard');
        let superHardBtn = document.querySelector('.difficult-super-hard');
        let btnComprobar = document.querySelector('.btn-suma-valid');
        let btnNext = document.querySelector('.btn-suma-next');
        hardBtn.disabled = true;


        if (btnComprobar) {
            btnComprobar.addEventListener('click', () => {
                const inputs = document.querySelectorAll('.input-result input');
                let cadenaValues = '';
                inputs.forEach(input => {
                    cadenaValues += input.value;
                });
                const respuestaUsuario = parseInt(cadenaValues, 10);

                if (respuestaUsuario === currentExpectedResult) {
                    temasEncontradosAsignatura[0].level += 0.25;
                    fetch(`http://localhost:3000/api/temas/actualizar-tema/${temasEncontradosAsignatura[0]._id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ level: temasEncontradosAsignatura[0].level })
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Error al actualizar el nivel del tema');
                        }
                        return response.json();
                    });
                    let modal = document.createElement('article');
                    modal.classList.add('modal-success-operation');
                    modal.innerHTML = `
                        <h3>¡Correcto!🎉😊</h3>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        btnNext.disabled = false;
                        btnComprobar.disabled = true;
                    }, 1000);
                } else {
                    btnNext.disabled = true; // Por si acaso se vuelve a equivocar
                    // Crear modal de error
                    let modal = document.createElement('article');
                    modal.classList.add('modal-error-operation');

                    modal.innerHTML = `
                        <h3>Respuesta incorrecta</h3>
                        <p>Inténtalo de nuevo. <span>😔</span></p>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 2000);
                }
            });
        }
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                btnNext.disabled = true;
                setupHardSum();
            });
        }

        if (easyBtn) {
            easyBtn.addEventListener('click', () => {
                setupEasySum();
            });
        }
        if (normalBtn) {
            normalBtn.addEventListener('click', () => {
                setupNormalSum();
            });
        }
        if (superHardBtn) {
            superHardBtn.addEventListener('click', () => {
                setupSuperHardSum();
            });
        }
    }
    function setupSuperHardSum() {
        //console.log(temasEncontradosAsignatura[0]);
        if (temasEncontradosAsignatura[0].level >= 75) {
            alert('Felicidades has alcanzado el nivel máximo en todos los niveles de sumas');
            return;
        }
        const { html: htmlSuperHardSum, expectedResult: newExpectedResult } = loadSuperHardSum(temasEncontradosAsignatura[0].level);
        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = htmlSuperHardSum;
        currentExpectedResult = newExpectedResult;

        let easyBtn = document.querySelector('.difficult-easy');
        let normalBtn = document.querySelector('.difficult-normal');
        let hardBtn = document.querySelector('.difficult-hard');
        let superHardBtn = document.querySelector('.difficult-super-hard');
        let btnComprobar = document.querySelector('.btn-suma-valid');
        let btnNext = document.querySelector('.btn-suma-next');
        superHardBtn.disabled = true;


        if (btnComprobar) {
            btnComprobar.addEventListener('click', () => {
                const inputs = document.querySelectorAll('.input-result input');
                let cadenaValues = '';
                inputs.forEach(input => {
                    cadenaValues += input.value;
                });
                const respuestaUsuario = parseInt(cadenaValues, 10);

                if (respuestaUsuario === currentExpectedResult) {
                    temasEncontradosAsignatura[0].level += 0.25;
                    fetch(`http://localhost:3000/api/temas/actualizar-tema/${temasEncontradosAsignatura[0]._id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ level: temasEncontradosAsignatura[0].level })
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Error al actualizar el nivel del tema');
                        }
                        return response.json();
                    });
                    let modal = document.createElement('article');
                    modal.classList.add('modal-success-operation');
                    modal.innerHTML = `
                        <h3>¡Correcto!🎉😊</h3>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        btnNext.disabled = false;
                        btnComprobar.disabled = true;
                    }, 1000);
                } else {
                    btnNext.disabled = true; // Por si acaso se vuelve a equivocar
                    // Crear modal de error
                    let modal = document.createElement('article');
                    modal.classList.add('modal-error-operation');

                    modal.innerHTML = `
                        <h3>Respuesta incorrecta</h3>
                        <p>Inténtalo de nuevo. <span>😔</span></p>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 2000);
                }
            });
        }
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                btnNext.disabled = true;
                setupSuperHardSum();
            });
        }

        if (easyBtn) {
            easyBtn.addEventListener('click', () => {
                setupEasySum();
            });
        }
        if (normalBtn) {
            normalBtn.addEventListener('click', () => {
                setupNormalSum();
            });
        }
        if (hardBtn) {
            hardBtn.addEventListener('click', () => {
                setupHardSum();
            });
        }
    }

    //Configuración de las restas
    function setupEasyRest() {
        //console.log(temasEncontradosAsignatura);
        if (temasEncontradosAsignatura[0].level >= 25) {
            alert('Has alcanzado el nivel máximo de en modo fácil.');
            //setupNormalSum();
            return;
        }
        let { html: easyRestHtml, expectedResult: newExpectedResult } = loadEasyRest(temasEncontradosAsignatura[1].level);
        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = easyRestHtml;
        currentExpectedResult = newExpectedResult;

        let btnComprobar = document.querySelector('.btn-suma-valid');
        let btnNext = document.querySelector('.btn-suma-next');
        let easyBtn = document.querySelector('.difficult-easy');
        let normalBtn = document.querySelector('.difficult-normal');
        let hardBtn = document.querySelector('.difficult-hard');
        let superHardBtn = document.querySelector('.difficult-super-hard');
        easyBtn.disabled = true;

        if (btnComprobar) {
            btnComprobar.addEventListener('click', () => {
                const inputs = document.querySelectorAll('.input-result input');
                let cadenaValues = '';
                inputs.forEach(input => {
                    cadenaValues += input.value;
                });
                const respuestaUsuario = parseInt(cadenaValues, 10);

                if (respuestaUsuario === currentExpectedResult) {
                    temasEncontradosAsignatura[1].level += 0.25;
                    fetch(`http://localhost:3000/api/temas/actualizar-tema/${temasEncontradosAsignatura[1]._id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ level: temasEncontradosAsignatura[1].level })
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Error al actualizar el nivel del tema');
                        }
                        return response.json();
                    });
                    let modal = document.createElement('article');
                    modal.classList.add('modal-success-operation');
                    modal.innerHTML = `
                        <h3>¡Correcto!🎉😊</h3>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        btnNext.disabled = false;
                        btnComprobar.disabled = true;
                    }, 1000);
                } else {
                    btnNext.disabled = true; // Por si acaso se vuelve a equivocar
                    // Crear modal de error
                    let modal = document.createElement('article');
                    modal.classList.add('modal-error-operation');

                    modal.innerHTML = `
                        <h3>Respuesta incorrecta</h3>
                        <p>Inténtalo de nuevo. <span>😔</span></p>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 2000);
                }
            });
        }

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                btnNext.disabled = true;
                setupEasyRest(); // Carga una nueva suma
            });
        }
        if (normalBtn) {
            normalBtn.addEventListener('click', () => {
                setupNormalRest();
            });
        }
        if (hardBtn) {
            hardBtn.addEventListener('click', () => {
                setupHardRest();
            });
        }
        if (superHardBtn) {
            superHardBtn.addEventListener('click', () => {
                setupSuperHardRest();
            });
        }
    }
    function setupNormalRest() {
        //console.log(temasEncontradosAsignatura[0]);
        if (temasEncontradosAsignatura[1].level >= 50) {
            alert('Has alcanzado el nivel máximo de en modo normal.');
            //setupHardSum();
            return;
        }
        const { html: htmlNormalSum, expectedResult: newExpectedResult } = loadNormalRest(temasEncontradosAsignatura[1].level);
        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = htmlNormalSum;
        currentExpectedResult = newExpectedResult;

        let easyBtn = document.querySelector('.difficult-easy');
        let normalBtn = document.querySelector('.difficult-normal');
        let hardBtn = document.querySelector('.difficult-hard');
        let superHardBtn = document.querySelector('.difficult-super-hard');
        let btnComprobar = document.querySelector('.btn-suma-valid');
        let btnNext = document.querySelector('.btn-suma-next');
        normalBtn.disabled = true;
        easyBtn.disabled = false;

        if (btnComprobar) {
            btnComprobar.addEventListener('click', () => {
                const inputs = document.querySelectorAll('.input-result input');
                let cadenaValues = '';
                inputs.forEach(input => {
                    cadenaValues += input.value;
                });
                const respuestaUsuario = parseInt(cadenaValues, 10);

                if (respuestaUsuario === currentExpectedResult) {
                    temasEncontradosAsignatura[1].level += 0.25;
                    fetch(`http://localhost:3000/api/temas/actualizar-tema/${temasEncontradosAsignatura[1]._id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ level: temasEncontradosAsignatura[1].level })
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Error al actualizar el nivel del tema');
                        }
                        return response.json();
                    });
                    let modal = document.createElement('article');
                    modal.classList.add('modal-success-operation');
                    modal.innerHTML = `
                        <h3>¡Correcto!🎉😊</h3>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        btnNext.disabled = false;
                        btnComprobar.disabled = true;
                    }, 1000);
                } else {
                    btnNext.disabled = true; // Por si acaso se vuelve a equivocar
                    // Crear modal de error
                    let modal = document.createElement('article');
                    modal.classList.add('modal-error-operation');

                    modal.innerHTML = `
                        <h3>Respuesta incorrecta</h3>
                        <p>Inténtalo de nuevo. <span>😔</span></p>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 2000);
                }
            });
        }
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                btnNext.disabled = true;
                setupNormalRest();
            });
        }

        if (easyBtn) {
            easyBtn.addEventListener('click', () => {
                setupEasyRest();
            });
        }
        if (hardBtn) {
            hardBtn.addEventListener('click', () => {
                setupHardRest();
            });
        }
        if (superHardBtn) {
            superHardBtn.addEventListener('click', () => {
                setupSuperHardRest();
            });
        }
    }
    function setupHardRest() {
        //console.log(temasEncontradosAsignatura[1]);
        if (temasEncontradosAsignatura[1].level >= 75) {
            alert('Has alcanzado el nivel máximo de en modo difícil.');
            //setupSuperHardSum();
            return;
        }
        const { html: htmlHardSum, expectedResult: newExpectedResult } = loadHardRest(temasEncontradosAsignatura[1].level);
        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = htmlHardSum;
        currentExpectedResult = newExpectedResult;

        let easyBtn = document.querySelector('.difficult-easy');
        let normalBtn = document.querySelector('.difficult-normal');
        let hardBtn = document.querySelector('.difficult-hard');
        let superHardBtn = document.querySelector('.difficult-super-hard');
        let btnComprobar = document.querySelector('.btn-suma-valid');
        let btnNext = document.querySelector('.btn-suma-next');
        hardBtn.disabled = true;


        if (btnComprobar) {
            btnComprobar.addEventListener('click', () => {
                const inputs = document.querySelectorAll('.input-result input');
                let cadenaValues = '';
                inputs.forEach(input => {
                    cadenaValues += input.value;
                });
                const respuestaUsuario = parseInt(cadenaValues, 10);

                if (respuestaUsuario === currentExpectedResult) {
                    temasEncontradosAsignatura[1].level += 0.25;
                    fetch(`http://localhost:3000/api/temas/actualizar-tema/${temasEncontradosAsignatura[1]._id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ level: temasEncontradosAsignatura[1].level })
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Error al actualizar el nivel del tema');
                        }
                        return response.json();
                    });
                    let modal = document.createElement('article');
                    modal.classList.add('modal-success-operation');
                    modal.innerHTML = `
                        <h3>¡Correcto!🎉😊</h3>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        btnNext.disabled = false;
                        btnComprobar.disabled = true;
                    }, 1000);
                } else {
                    btnNext.disabled = true; // Por si acaso se vuelve a equivocar
                    // Crear modal de error
                    let modal = document.createElement('article');
                    modal.classList.add('modal-error-operation');

                    modal.innerHTML = `
                        <h3>Respuesta incorrecta</h3>
                        <p>Inténtalo de nuevo. <span>😔</span></p>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 2000);
                }
            });
        }
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                btnNext.disabled = true;
                setupHardRest();
            });
        }

        if (easyBtn) {
            easyBtn.addEventListener('click', () => {
                setupEasyRest();
            });
        }
        if (normalBtn) {
            normalBtn.addEventListener('click', () => {
                setupNormalRest();
            });
        }
        if (superHardBtn) {
            superHardBtn.addEventListener('click', () => {
                setupSuperHardRest();
            });
        }
    }
    function setupSuperHardRest() {
        //console.log(temasEncontradosAsignatura[1]);
        if (temasEncontradosAsignatura[1].level >= 75) {
            alert('Felicidades has alcanzado el nivel máximo en todos los niveles de sumas');
            return;
        }
        const { html: htmlSuperHardSum, expectedResult: newExpectedResult } = loadSuperHardRest(temasEncontradosAsignatura[1].level);
        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = htmlSuperHardSum;
        currentExpectedResult = newExpectedResult;

        let easyBtn = document.querySelector('.difficult-easy');
        let normalBtn = document.querySelector('.difficult-normal');
        let hardBtn = document.querySelector('.difficult-hard');
        let superHardBtn = document.querySelector('.difficult-super-hard');
        let btnComprobar = document.querySelector('.btn-suma-valid');
        let btnNext = document.querySelector('.btn-suma-next');
        superHardBtn.disabled = true;


        if (btnComprobar) {
            btnComprobar.addEventListener('click', () => {
                const inputs = document.querySelectorAll('.input-result input');
                let cadenaValues = '';
                inputs.forEach(input => {
                    cadenaValues += input.value;
                });
                const respuestaUsuario = parseInt(cadenaValues, 10);

                if (respuestaUsuario === currentExpectedResult) {
                    temasEncontradosAsignatura[1].level += 0.25;
                    fetch(`http://localhost:3000/api/temas/actualizar-tema/${temasEncontradosAsignatura[1]._id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ level: temasEncontradosAsignatura[1].level })
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Error al actualizar el nivel del tema');
                        }
                        return response.json();
                    });
                    let modal = document.createElement('article');
                    modal.classList.add('modal-success-operation');
                    modal.innerHTML = `
                        <h3>¡Correcto!🎉😊</h3>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        btnNext.disabled = false;
                        btnComprobar.disabled = true;
                    }, 1000);
                } else {
                    btnNext.disabled = true; // Por si acaso se vuelve a equivocar
                    // Crear modal de error
                    let modal = document.createElement('article');
                    modal.classList.add('modal-error-operation');

                    modal.innerHTML = `
                        <h3>Respuesta incorrecta</h3>
                        <p>Inténtalo de nuevo. <span>😔</span></p>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 2000);
                }
            });
        }
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                btnNext.disabled = true;
                setupSuperHardRest();
            });
        }

        if (easyBtn) {
            easyBtn.addEventListener('click', () => {
                setupEasyRest();
            });
        }
        if (normalBtn) {
            normalBtn.addEventListener('click', () => {
                setupNormalRest();
            });
        }
        if (hardBtn) {
            hardBtn.addEventListener('click', () => {
                setupHardRest();
            });
        }
    }

    //Configuración de las multiplicaciones
    function setupEasyMulti() {
        //console.log(temasEncontradosAsignatura);
        if (temasEncontradosAsignatura[2].level >= 25) {
            alert('Has alcanzado el nivel máximo de en modo fácil.');
            //setupNormalSum();
            return;
        }
        let { html: easyMultiHtml, expectedResult: newExpectedResult } = loadEasyMulti(temasEncontradosAsignatura[2].level);
        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = easyMultiHtml;
        currentExpectedResult = newExpectedResult;

        let btnComprobar = document.querySelector('.btn-suma-valid');
        let btnNext = document.querySelector('.btn-suma-next');
        let easyBtn = document.querySelector('.difficult-easy');
        let normalBtn = document.querySelector('.difficult-normal');
        let hardBtn = document.querySelector('.difficult-hard');
        let superHardBtn = document.querySelector('.difficult-super-hard');
        easyBtn.disabled = true;

        if (btnComprobar) {
            btnComprobar.addEventListener('click', () => {
                const inputs = document.querySelectorAll('.input-result input');
                let cadenaValues = '';
                inputs.forEach(input => {
                    cadenaValues += input.value;
                });
                const respuestaUsuario = parseInt(cadenaValues, 10);

                if (respuestaUsuario === currentExpectedResult) {
                    temasEncontradosAsignatura[2].level += 0.25;
                    fetch(`http://localhost:3000/api/temas/actualizar-tema/${temasEncontradosAsignatura[2]._id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ level: temasEncontradosAsignatura[2].level })
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Error al actualizar el nivel del tema');
                        }
                        return response.json();
                    });
                    let modal = document.createElement('article');
                    modal.classList.add('modal-success-operation');
                    modal.innerHTML = `
                        <h3>¡Correcto!🎉😊</h3>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        btnNext.disabled = false;
                        btnComprobar.disabled = true;
                    }, 1000);
                } else {
                    btnNext.disabled = true; // Por si acaso se vuelve a equivocar
                    // Crear modal de error
                    let modal = document.createElement('article');
                    modal.classList.add('modal-error-operation');

                    modal.innerHTML = `
                        <h3>Respuesta incorrecta</h3>
                        <p>Inténtalo de nuevo. <span>😔</span></p>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 2000);
                }
            });
        }

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                btnNext.disabled = true;
                setupEasyMulti(); // Carga una nueva suma
            });
        }
        if (normalBtn) {
            normalBtn.addEventListener('click', () => {
                setupNormalMulti();
            });
        }
        if (hardBtn) {
            hardBtn.addEventListener('click', () => {
                setupHardMulti();
            });
        }
        if (superHardBtn) {
            superHardBtn.addEventListener('click', () => {
                //setupSuperHardRest();
            });
        }
    }
    function setupNormalMulti() {
        //console.log(temasEncontradosAsignatura[0]);
        if (temasEncontradosAsignatura[2].level >= 50) {
            alert('Has alcanzado el nivel máximo de en modo normal.');
            //setupHardSum();
            return;
        }
        const { html: htmlNormalMulti, expectedResult: newExpectedResult } = loadNormalMulti(temasEncontradosAsignatura[2].level);
        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = htmlNormalMulti;
        currentExpectedResult = newExpectedResult;

        let easyBtn = document.querySelector('.difficult-easy');
        let normalBtn = document.querySelector('.difficult-normal');
        let hardBtn = document.querySelector('.difficult-hard');
        let superHardBtn = document.querySelector('.difficult-super-hard');
        let btnComprobar = document.querySelector('.btn-suma-valid');
        let btnNext = document.querySelector('.btn-suma-next');
        normalBtn.disabled = true;
        easyBtn.disabled = false;

        if (btnComprobar) {
            btnComprobar.addEventListener('click', () => {
                const inputs = document.querySelectorAll('.input-result input');
                let cadenaValues = '';

                inputs.forEach(input => {
                    cadenaValues += input.value;
                });
                const respuestaUsuario = parseInt(cadenaValues, 10);
                if (respuestaUsuario === currentExpectedResult) {
                    temasEncontradosAsignatura[2].level += 0.25;
                    fetch(`http://localhost:3000/api/temas/actualizar-tema/${temasEncontradosAsignatura[2]._id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ level: temasEncontradosAsignatura[2].level })
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Error al actualizar el nivel del tema');
                        }
                        return response.json();
                    });
                    let modal = document.createElement('article');
                    modal.classList.add('modal-success-operation');
                    modal.innerHTML = `
                        <h3>¡Correcto!🎉😊</h3>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        btnNext.disabled = false;
                        btnComprobar.disabled = true;
                    }, 1000);
                } else {
                    btnNext.disabled = true; // Por si acaso se vuelve a equivocar
                    // Crear modal de error
                    let modal = document.createElement('article');
                    modal.classList.add('modal-error-operation');

                    modal.innerHTML = `
                        <h3>Respuesta incorrecta</h3>
                        <p>Inténtalo de nuevo. <span>😔</span></p>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 2000);
                }
            });
        }
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                btnNext.disabled = true;
                setupNormalMulti();
            });
        }

        if (easyBtn) {
            easyBtn.addEventListener('click', () => {
                setupEasyMulti();
            });
        }
        if (hardBtn) {
            hardBtn.addEventListener('click', () => {
                setupHardMulti();
            });
        }
        if (superHardBtn) {
            superHardBtn.addEventListener('click', () => {
                //setupSuperHardRest();
            });
        }
    }
    function setupHardMulti() {
        //console.log(temasEncontradosAsignatura[0]);
        if (temasEncontradosAsignatura[2].level >= 50) {
            alert('Has alcanzado el nivel máximo de en modo normal.');
            //setupHardSum();
            return;
        }
        const { html: htmlHardMulti, expectedResult: newExpectedResult } = loadHardMulti(temasEncontradosAsignatura[2].level);
        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = htmlHardMulti;
        currentExpectedResult = newExpectedResult;

        let easyBtn = document.querySelector('.difficult-easy');
        let normalBtn = document.querySelector('.difficult-normal');
        let hardBtn = document.querySelector('.difficult-hard');
        let superHardBtn = document.querySelector('.difficult-super-hard');
        let btnComprobar = document.querySelector('.btn-suma-valid');
        let btnNext = document.querySelector('.btn-suma-next');
        hardBtn.disabled = true;
        easyBtn.disabled = false;

        if (btnComprobar) {
            btnComprobar.addEventListener('click', () => {
                const inputs = document.querySelectorAll('.input-result input');
                let cadenaValues = '';

                inputs.forEach(input => {
                    cadenaValues += input.value;
                });
                const respuestaUsuario = parseInt(cadenaValues, 10);
                //console.log(respuestaUsuario);
                if (respuestaUsuario === currentExpectedResult) {
                    temasEncontradosAsignatura[2].level += 0.25;
                    fetch(`http://localhost:3000/api/temas/actualizar-tema/${temasEncontradosAsignatura[2]._id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ level: temasEncontradosAsignatura[2].level })
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Error al actualizar el nivel del tema');
                        }
                        return response.json();
                    });
                    let modal = document.createElement('article');
                    modal.classList.add('modal-success-operation');
                    modal.innerHTML = `
                        <h3>¡Correcto!🎉😊</h3>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        btnNext.disabled = false;
                        btnComprobar.disabled = true;
                    }, 1000);
                } else {
                    btnNext.disabled = true; // Por si acaso se vuelve a equivocar
                    // Crear modal de error
                    let modal = document.createElement('article');
                    modal.classList.add('modal-error-operation');

                    modal.innerHTML = `
                        <h3>Respuesta incorrecta</h3>
                        <p>Inténtalo de nuevo. <span>😔</span></p>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 2000);
                }
            });
        }
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                btnNext.disabled = true;
                setupHardMulti();
            });
        }

        if (easyBtn) {
            easyBtn.addEventListener('click', () => {
                setupEasyMulti();
            });
        }
        if (normalBtn) {
            normalBtn.addEventListener('click', () => {
                setupNormalMulti();
            });
        }
        if (superHardBtn) {
            superHardBtn.addEventListener('click', () => {
                //setupSuperHardRest();
            });
        }
    }

    //Configuración de las divisiones
    function setupEasyDiv() {
        //console.log(temasEncontradosAsignatura);
        if (temasEncontradosAsignatura[3].level >= 25) {
            alert('Has alcanzado el nivel máximo de en modo fácil.');
            setupNormalDiv();
            return;
        }
        let { html: easyDivHtml, expectedResult: newExpectedResult } = loadEasyDiv(temasEncontradosAsignatura[3].level);
        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = easyDivHtml;
        currentExpectedResult = newExpectedResult;

        let btnComprobar = document.querySelector('.btn-suma-valid');
        let btnNext = document.querySelector('.btn-suma-next');
        let easyBtn = document.querySelector('.difficult-easy');
        let normalBtn = document.querySelector('.difficult-normal');
        let hardBtn = document.querySelector('.difficult-hard');
        let superHardBtn = document.querySelector('.difficult-super-hard');
        easyBtn.disabled = true;

        if (btnComprobar) {
            btnComprobar.addEventListener('click', () => {
                const inputs = document.querySelectorAll('.input-result-div input');
                let cadenaValues = '';
                inputs.forEach(input => {
                    cadenaValues += input.value;
                });
                const respuestaUsuario = parseInt(cadenaValues, 10);

                if (respuestaUsuario === currentExpectedResult) {
                    temasEncontradosAsignatura[3].level += 0.25;
                    fetch(`http://localhost:3000/api/temas/actualizar-tema/${temasEncontradosAsignatura[3]._id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ level: temasEncontradosAsignatura[2].level })
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Error al actualizar el nivel del tema');
                        }
                        return response.json();
                    });
                    let modal = document.createElement('article');
                    modal.classList.add('modal-success-operation');
                    modal.innerHTML = `
                        <h3>¡Correcto!🎉😊</h3>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        btnNext.disabled = false;
                        btnComprobar.disabled = true;
                    }, 1000);
                } else {
                    btnNext.disabled = true; // Por si acaso se vuelve a equivocar
                    // Crear modal de error
                    let modal = document.createElement('article');
                    modal.classList.add('modal-error-operation');

                    modal.innerHTML = `
                        <h3>Respuesta incorrecta</h3>
                        <p>Inténtalo de nuevo. <span>😔</span></p>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 2000);
                }
            });
        }

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                btnNext.disabled = true;
                setupEasyDiv(); // Carga una nueva suma
            });
        }
        if (normalBtn) {
            normalBtn.addEventListener('click', () => {
                setupNormalDiv();
            });
        }
        if (hardBtn) {
            hardBtn.addEventListener('click', () => {
                //setupHardMulti();
            });
        }
        if (superHardBtn) {
            superHardBtn.addEventListener('click', () => {
                //setupSuperHardRest();
            });
        }
    }
    function setupNormalDiv() {
        //console.log(temasEncontradosAsignatura);
        if (temasEncontradosAsignatura[3].level >= 25) {
            alert('Has alcanzado el nivel máximo de en modo fácil.');
            //setupNormalSum();
            return;
        }
        let { html: normalDivHtml, expectedResult: newExpectedResult } = loadNormalDiv(temasEncontradosAsignatura[3].level);
        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = normalDivHtml;
        currentExpectedResult = newExpectedResult;

        let btnComprobar = document.querySelector('.btn-suma-valid');
        let btnNext = document.querySelector('.btn-suma-next');
        let easyBtn = document.querySelector('.difficult-easy');
        let normalBtn = document.querySelector('.difficult-normal');
        let hardBtn = document.querySelector('.difficult-hard');
        let superHardBtn = document.querySelector('.difficult-super-hard');
        easyBtn.disabled = false;
        normalBtn.disabled = true;

        if (btnComprobar) {
            btnComprobar.addEventListener('click', () => {
                const inputs = document.querySelectorAll('.input-result-div input');
                let cadenaValues = '';
                inputs.forEach(input => {
                    cadenaValues += input.value;
                });
                const respuestaUsuario = parseInt(cadenaValues, 10);

                if (respuestaUsuario === currentExpectedResult) {
                    temasEncontradosAsignatura[3].level += 0.25;
                    fetch(`http://localhost:3000/api/temas/actualizar-tema/${temasEncontradosAsignatura[3]._id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ level: temasEncontradosAsignatura[2].level })
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Error al actualizar el nivel del tema');
                        }
                        return response.json();
                    });
                    let modal = document.createElement('article');
                    modal.classList.add('modal-success-operation');
                    modal.innerHTML = `
                        <h3>¡Correcto!🎉😊</h3>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        btnNext.disabled = false;
                        btnComprobar.disabled = true;
                    }, 1000);
                } else {
                    btnNext.disabled = true; // Por si acaso se vuelve a equivocar
                    // Crear modal de error
                    let modal = document.createElement('article');
                    modal.classList.add('modal-error-operation');

                    modal.innerHTML = `
                        <h3>Respuesta incorrecta</h3>
                        <p>Inténtalo de nuevo. <span>😔</span></p>
                    `;
                    document.body.appendChild(modal);
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 2000);
                }
            });
        }

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                btnNext.disabled = true;
                setupNormalDiv(); // Carga una nueva suma
            });
        }
        if (easyBtn) {
            easyBtn.addEventListener('click', () => {
                setupEasyDiv();
            });
        }
        if (hardBtn) {
            hardBtn.addEventListener('click', () => {
                //setupHardMulti();
            });
        }
        if (superHardBtn) {
            superHardBtn.addEventListener('click', () => {
                //setupSuperHardRest();
            });
        }
    }

    //Configuraciones para test
    function setupTests() {
        let { html: testHtml } = loadHtmlSectionTest();
        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = testHtml;
    }
    function setupTestsSuma() {
        let generarSuma = function () {
            let sumandoUno = Math.round(Math.random() * 9999);
            let sumandoDos = Math.round(Math.random() * 9999);
            let resultado = sumandoUno + sumandoDos;
            return {
                sumandoUno,
                sumandoDos,
                resultado
            }
        }

        const ejercicios = [
            generarSuma(), generarSuma(), generarSuma(), generarSuma(), generarSuma(), generarSuma(), generarSuma(), generarSuma(), generarSuma(), generarSuma()
        ];
        let inputAnswer = null;
        let ejerciciosResueltos = [];
        let ejercicioAResolver = 0;

        let { html: testSumaHtml } = loadSumaTest({ sumandoUno: ejercicios[ejercicioAResolver].sumandoUno, sumandoDos: ejercicios[ejercicioAResolver].sumandoDos, resultado: ejercicios[ejercicioAResolver].resultado });

        contenedorTemas.innerHTML = '';
        contenedorTemas.innerHTML = testSumaHtml;
        contenedorTemas.querySelector('.item-' + ejercicioAResolver).classList.add('btn-test-question');

        document.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.matches('.btn-siguiente-suma')) {
                inputAnswer = contenedorTemas.querySelectorAll('.resultado-test input');
                let cadenaValues = '';
                inputAnswer.forEach(input => {
                    cadenaValues += input.value;
                });

                if (!cadenaValues || cadenaValues === '') {
                    let yesOrNot = confirm('Esta seguro de enviarlo sin respuesta');
                    if (!yesOrNot) {
                        return
                    }
                }

                if (parseInt(cadenaValues) === ejercicios[ejercicioAResolver].resultado) {
                    ejerciciosResueltos.push(
                        {
                            ejercicioResuelto: ejercicios[ejercicioAResolver],
                            ejercicio: ejercicioAResolver + 1,
                            estado: 'correcto'
                        }
                    );
                } else {
                    ejerciciosResueltos.push(
                        {
                            ejercicioResuelto: ejercicios[ejercicioAResolver],
                            ejercicio: ejercicioAResolver + 1,
                            estado: 'incorrecto'
                        }
                    );
                }

                if (ejercicioAResolver === ejercicios.length - 1) {
                    let btnSiguiente = document.querySelector('.btn-siguiente-suma');
                    let calificativo = 0;
                    //console.log(questionBtn);
                    btnSiguiente.textContent = 'Enviado';
                    btnSiguiente.disabled = true;
                    const msgFinalTest = contenedorTemas.querySelector('.ejercicio-suma-test');
                    msgFinalTest.innerHTML = '';
                    contenedorTemas.querySelector('.btn-siguiente-regreso').innerHTML += `<button class="btn-salir-suma">Salir</button>`
                    alert('Enviado');
                    ejerciciosResueltos.forEach((el) => {
                        if (el.estado === 'correcto') {
                            calificativo++;
                            contenedorTemas.querySelector('.item-' + (el.ejercicio - 1)).classList.add('btn-test-question-success');
                            //console.log(el);
                        } else {
                            contenedorTemas.querySelector('.item-' + (el.ejercicio - 1)).classList.add('btn-test-question-error');
                        }
                    });
                    //console.log(calificativo);
                    if (calificativo < 3) {
                        msgFinalTest.innerHTML = `<div class="msg-final-test">
                            <p>Tus resultados fueron bastante bajos debe practicar mas. ${calificativo}/10<span>😒😕</span></p>
                        </div>`
                    }
                    if (calificativo >= 9) {
                        msgFinalTest.innerHTML = `<div class="msg-final-test">
                            <p>Tus resultados fueron bastante buenos. Felicidades ${calificativo}/10<span>🎊🥳</span></p>
                        </div>`
                    }

                    ejercicioAResolver = 0;
                    return
                }
                ejercicioAResolver++;
                //console.log(ejercicioAResolver);
                //console.log(ejercicios.length, ejercicioAResolver);

                let { html: testSumaHtml } = loadSumaTest({ sumandoUno: ejercicios[ejercicioAResolver].sumandoUno, sumandoDos: ejercicios[ejercicioAResolver].sumandoDos, resultado: ejercicios[ejercicioAResolver].resultado });
                contenedorTemas.innerHTML = '';
                contenedorTemas.innerHTML = testSumaHtml;
                for (let i = 0; i <= ejercicioAResolver; i++) {
                    contenedorTemas.querySelector('.item-' + i).classList.add('btn-test-question');
                }
            }
            if (e.target.matches('.btn-salir-suma')) {
                location.reload();
            }
        });
    }

    async function cargarDatosAsignatura() {
        const asignaturas = Array.from(document.querySelectorAll('.asignatura'));
        let titleAsignatura = document.querySelector('.title-asignatura');

        document.addEventListener('click', async (e) => {
            e.preventDefault();

            let materia = e.target.classList[0];
            let validarAsignatura = asignaturas.some(asignatura => asignatura.classList.contains(materia));

            if (validarAsignatura) {
                try {
                    const temasEncontrados = await fetch(`${CURRENT_SERVER}/api/temas/materia-seleccionada/${materia.split('-')[0]}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!temasEncontrados.ok) {
                        const errorData = await temasEncontrados.json();
                        throw new Error(errorData.message || 'Error al cargar los temas');
                    }
                    const temasData = await temasEncontrados.json();

                    temasEncontradosAsignatura = temasData.temas;

                    if (temasEncontradosAsignatura.length === 0) {
                        contenedorTemas.innerHTML = '';
                        contenedorTemas.innerHTML = `<h2>No hay temas disponibles aún</h2>`
                        titleAsignatura.textContent = `Materia en aprendizaje: ${e.target.lastChild.textContent.trim()}`
                        return;
                    }

                    levelSumas = temasData.temas[0].level;

                    contenedorTemas.innerHTML = '';
                    contenedorTemas.innerHTML = `<h2>Temas:</h2>`

                    temasData.temas.forEach(tema => {
                        contenedorTemas.innerHTML += `
                        <div class="cargar-tema ${tema.title}">
                            <h3>${tema.title}</h3>
                            <p>${tema.description}</p>
                            <div class="tema-content">
                                <img src="assets/img/${tema.title}.png" alt="Tema" class="tema-image" width="200" height="200" />
                            </div>
                            <p class="level-easy-sum">Nivel: ${tema.level}%</p>
                        </div>
                        `
                    });

                    document.querySelector('.welcome-section').style.display = 'block';
                    titleAsignatura.textContent = `Materia en aprendizaje: ${e.target.lastChild.textContent.trim()}`

                } catch (error) {
                    console.info("Error al cargar temas:", error);
                }
            }

            const contenedorTemaSuma = e.target.closest('.suma');
            const contenedorTemaResta = e.target.closest('.resta');
            const contenedorTemaMulti = e.target.closest('.multiplicacion');
            const contenedorTemaDiv = e.target.closest('.division');
            const contenedorTests = e.target.closest('.tests');
            const testSuma = e.target.closest('.test-suma');

            const contenedorTemaWords = e.target.closest('.words');
            const contenedorTemaAnimals = e.target.closest('.animals');
            const contenedorTemaThings = e.target.closest('.things');
            const contenedorTemaFruits = e.target.closest('.fruits');
            const contenedorTemaPractice = e.target.closest('.practice');
            const contenedorTemaAnimal = e.target.closest('.animal-article');


            if (contenedorTemaSuma !== null) {
                document.querySelector('.welcome-section').style.display = 'none';
                if (temasEncontradosAsignatura[0].level < 25) {
                    setupEasySum();
                    return;
                }
                if (temasEncontradosAsignatura[0].level >= 25 && temasEncontradosAsignatura[0].level < 50) {
                    setupNormalSum();
                    return;
                }
                if (temasEncontradosAsignatura[0].level >= 50 && temasEncontradosAsignatura[0].level < 75) {
                    setupHardSum();
                    return;
                }
                if (temasEncontradosAsignatura[0].level >= 75) {
                    setupSuperHardSum();
                    return;
                }
            }
            if (contenedorTemaResta !== null) {
                document.querySelector('.welcome-section').style.display = 'none';
                if (temasEncontradosAsignatura[1].level < 25) {
                    setupEasyRest();
                    return;
                }
                if (temasEncontradosAsignatura[1].level >= 25 && temasEncontradosAsignatura[1].level < 50) {
                    setupNormalRest();
                    return;
                }
                if (temasEncontradosAsignatura[1].level >= 50 && temasEncontradosAsignatura[1].level < 75) {
                    setupHardRest();
                    return;
                }
                if (temasEncontradosAsignatura[1].level >= 75) {
                    setupSuperHardRest();
                    return;
                }
            }
            if (contenedorTemaMulti !== null) {
                document.querySelector('.welcome-section').style.display = 'none';
                if (temasEncontradosAsignatura[2].level < 25) {
                    setupEasyMulti();
                    return;
                }
                if (temasEncontradosAsignatura[2].level >= 25 && temasEncontradosAsignatura[2].level < 50) {
                    setupNormalMulti();
                    return;
                }
                if (temasEncontradosAsignatura[2].level >= 50 && temasEncontradosAsignatura[2].level < 75) {
                    setupHardMulti();
                    return;
                }
                if (temasEncontradosAsignatura[2].level >= 75) {
                    alert('Felicidades has alcanzado el nivel máximo en todos los niveles de multiplicaciones');
                    //setupSuperHard();
                    return;
                }
            }
            if (contenedorTemaDiv !== null) {
                document.querySelector('.welcome-section').style.display = 'none';
                if (temasEncontradosAsignatura[3].level < 25) {
                    setupEasyDiv();
                    return;
                }
                if (temasEncontradosAsignatura[3].level >= 25 && temasEncontradosAsignatura[3].level < 50) {
                    //setupNormalRest();
                    return;
                }
                if (temasEncontradosAsignatura[3].level >= 50 && temasEncontradosAsignatura[3].level < 75) {
                    //setupHardRest();
                    return;
                }
                if (temasEncontradosAsignatura[3].level >= 75) {
                    //setupSuperHardRest();
                    return;
                }
            }
            if (contenedorTests !== null) {
                document.querySelector('.welcome-section').style.display = 'none';
                setupTests();
            }
            if (testSuma !== null) {
                contenedorTemas.innerHTML = '';
                setupTestsSuma();
            }

            if (contenedorTemaWords !== null) {
                contenedorTemas.innerHTML = '';
                document.querySelector('.welcome-section').style.display = 'none';
                contenedorTemas.innerHTML = loadWords();
            }
            if (contenedorTemaAnimals !== null) {
                contenedorTemas.innerHTML = '';
                document.querySelector('.welcome-section').style.display = 'none';
                contenedorTemas.innerHTML = `<section class="animals-container"><h2>Animales (Animals)</h2>${LoadAnimals()}</section>`;
            }
            if (contenedorTemaThings !== null) {
                contenedorTemas.innerHTML = '';
                document.querySelector('.welcome-section').style.display = 'none';
                contenedorTemas.innerHTML = `<section class="things-container"><h2>Things (Cosas)</h2>${LoadThings()}</section>`;
            }
            if (contenedorTemaFruits !== null) {
                contenedorTemas.innerHTML = '';
                document.querySelector('.welcome-section').style.display = 'none';
                contenedorTemas.innerHTML = `<section class="fruits-container"><h2>Fruits (Frutas)</h2>${loadFruits()}</section>`;
            }

            if (contenedorTemaPractice !== null) {
                contenedorTemas.innerHTML = '';
                document.querySelector('.welcome-section').style.display = 'none';
                contenedorTemas.innerHTML = `<section class="practice-container"><h2>Select the theme to practice</h2>${loadPractices()}</section>`;
            }

            if (contenedorTemaAnimal !== null) {
                document.querySelector('.modal-animal-vista').textContent = `${contenedorTemaAnimal.dataset.animal.split('-')[0]} (${contenedorTemaAnimal.dataset.animal.split('-')[1]})`;
                document.querySelector('.image-animal img').src = `assets/img/animals/${contenedorTemaAnimal.dataset.animal.split('-')[1]}.png`;

                //console.log(contenedorTemaAnimal.dataset.animal.split('-')[0]);
                loadCompAnimal(contenedorTemaAnimal.dataset.animal.split('-')[0]);
                let modalAnimalSee = document.querySelector('.information-animal-modal');

                modalAnimalSee.classList.add('vista-animal-modal-block');
            }
            if (e.target.matches('.cerrar-modal-animal')) {
                let modalAnimalSee = document.querySelector('.information-animal-modal');
                modalAnimalSee.classList.remove('vista-animal-modal-block');
            }
            if (e.target.matches('#next-animal')) {
                loadNextAnimal();
            }
            if (e.target.matches('#prev-animal')) {
                loadPrevAnimal();
            }
            if (e.target.closest('.practice-words')) {
                contenedorTemas.innerHTML = '';
                contenedorTemas.innerHTML = `<section class="container-words-practice"><h3>Write the corresponding words</h3>${loadPracticeWords()}<div class="button-send"><button id="btn-verify-practice">Verificar</button><button id="btn-back-practice">Volver</button></div></section>`;
            }

            if (e.target.closest('.practice-animals')) {
                contenedorTemas.innerHTML = '';
                contenedorTemas.innerHTML = `<section class="container-words-practice"><h3>Write the corresponding animals</h3>${loadPracticeAnimals()}<div class="button-send"><button id="btn-verify-practice">Verificar</button><button id="btn-back-practice">Volver</button></div></section>`;
            }

            if (e.target.closest('.practice-fruits')) {
                contenedorTemas.innerHTML = '';
                contenedorTemas.innerHTML = `<section class="container-words-practice"><h3>Write the corresponding fruits</h3>${loadPracticeFruits()}<div class="button-send"><button id="btn-verify-practice">Verificar</button><button id="btn-back-practice">Volver</button></div></section>`;
            }

            if (e.target.closest('.practice-things')) {
                contenedorTemas.innerHTML = '';
                contenedorTemas.innerHTML = `<section class="container-words-practice"><h3>Write the corresponding things</h3>${loadPracticeThings()}<div class="button-send"><button id="btn-verify-practice">Verificar</button><button id="btn-back-practice">Volver</button></div></section>`;
            }
            if (e.target.closest('.practice-mixed')) {
                contenedorTemas.innerHTML = '';
                contenedorTemas.innerHTML = `<section class="container-words-practice"><h3>Write the corresponding words</h3>${loadPracticeMixed()}<div class="button-send"><button id="btn-verify-practice">Verificar</button><button id="btn-back-practice">Volver</button></div></section>`;
            }

            if (e.target.matches('#btn-verify-practice')) {
                const correctAnswers = [];
                const incorrectAnswers = [];
                const inputs = document.querySelectorAll('.input-result-practice input');
                inputs.forEach(input => {
                    /*if (input.value.trim() === '') {
                        alert('Por favor, completa todas las palabras antes de verificar.');
                        return;
                    }*/
                    if (input.dataset.word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === input.value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
                        correctAnswers.push(input.value.trim());
                        input.style.backgroundColor = "green";
                        input.style.color = "white";
                    } else {
                        incorrectAnswers.push(input.value.trim());
                        input.style.backgroundColor = "red";
                    }

                });
                //console.log(incorrectAnswers, correctAnswers);
            }

            if (e.target.matches('#btn-back-practice')) {
                contenedorTemas.innerHTML = '';
                contenedorTemas.innerHTML = `<section class="practice-container"><h2>Select the theme to practice</h2>${loadPractices()}</section>`;
            }

            if (e.target.matches('.horario-clase')) {
                contenedorTemas.innerHTML = '';
                let horarioClase = {
                    mon: ['matemáticas', 'naturales', 'religion'],
                    tue: ['español', 'sociales', 'ética'],
                    wed: ['matemáticas', 'español'],
                    thu: ['español', 'naturales', 'ingles'],
                    fri: ['artística', 'sociales', 'emprendimiento', 'catedra de la paz', 'tecnología']
                }
                titleAsignatura.textContent = `${e.target.lastChild.textContent.trim()}`
                let diaHoy = new Date().toString().split(' ')[0].toLocaleLowerCase();
                let diaActual = null;
                switch (diaHoy) {
                    case 'mon':
                        diaActual = 'lunes'
                        break;
                    case 'tue':
                        diaActual = 'martes'
                        break;
                    case 'wed':
                        diaActual = 'miércoles'
                        break;
                    case 'thu':
                        diaActual = 'jueves'
                        break;
                    case 'fri':
                        diaActual = 'viernes'
                        break;
                    default:
                        break;
                }
                //console.log(horarioClase[diaHoy], diaActual);
                contenedorTemas.innerHTML = `<div class="container-horario-clase">
                    <div>
                        <h3>Horario de hoy ${diaActual.toUpperCase()}</h3>
                        <article>
                            ${horarioClase[diaHoy] ? horarioClase[diaHoy].map(materia => `<p class="materia-horario">${materia}</p>`).join('') : '<p>No hay clases hoy</p>'}
                        </article>
                    </div>
                    <div>
                        <h3>Horario semanal</h3>
                        <article>
                            <div class="body-card">
                                <p><strong>Lunes:</strong> ${horarioClase.mon.join(', ')}</p>
                                <p><strong>Martes:</strong> ${horarioClase.tue.join(', ')}</p>
                                <p><strong>Miércoles:</strong> ${horarioClase.wed.join(', ')}</p>
                                <p><strong>Jueves:</strong> ${horarioClase.thu.join(', ')}</p>
                                <p><strong>Viernes:</strong> ${horarioClase.fri.join(', ')}</p>
                            </div>
                        </article>
                    </div>
                </div>`
            }
        });
    }
    cargarDashboard();
    cargarDatosAsignatura();
});