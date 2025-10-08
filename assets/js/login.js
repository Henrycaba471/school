import { CURRENT_SERVER } from "./server.js";

document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.querySelector('.login__button');

    btnLogin.addEventListener('click', async (e) => {
        e.preventDefault();
        const dataLogin = {
            username: document.querySelector('#user').value,
            password: document.querySelector('#password').value
        }
        //console.log(dataLogin);

        try {
            const res = await fetch(CURRENT_SERVER +'/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataLogin)
            });

            if (!res.ok) {
                //const data = await res.json();
                alert('Verifica los datos e intenta nuevamente...');
                return;
               // throw new Error(data.message || 'Error en el login');
            }
            const data = await res.json();
            if (data.status === 200) {
                localStorage.setItem('authToken', data.token);
                window.location.href = 'dashboard.html';
                return;
            }
        } catch (error) {
            console.error('Error en la petición', error.message);
            alert('El servidor no responde.');
        }
    });
})