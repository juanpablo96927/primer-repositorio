// Remove duplicate event listener and consolidate menu code
document.addEventListener('DOMContentLoaded', () => {
    const hamburguer = document.querySelector('.hamburguer');
    const navLinks = document.querySelector('.nav-links');

    if (hamburguer && navLinks) {
        hamburguer.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from bubbling to document
            navLinks.classList.toggle('active');
            hamburguer.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburguer.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburguer.classList.remove('active');
            }
        });
        // Cierra el menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.classList.remove('active');
            hamburguer.classList.remove('active');
            container.classList.remove('nav-active');
            console.log('Menú cerrado por clic en enlace:', link.textContent);
        });
    });
    }

    // 2. Validación de formulario en tiempo real y manipulación del DOM
    const form = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-message');

    if (form && messageDiv) {
        const inputs = form.querySelectorAll('input, textarea');

        // Validación en tiempo real
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim() === '' && input.required) {
                    input.style.borderColor = '#ff0000'; // Borde rojo si está vacío
                } else {
                    input.style.borderColor = '#a100a1'; // Borde original
                }
                // Validación específica para email
                if (input.type === 'email') {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value.trim()) && input.value.trim() !== '') {
                        input.style.borderColor = '#ff0000';
                    }
                }
            });
        });

        // COntrol de envío
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // NO envío real

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validaciones
            if (!name || !email || !subject || !message) {
                messageDiv.textContent = 'Por favor, completa todos los campos.';
                messageDiv.className = 'form-message error';
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                messageDiv.textContent = 'Por favor, ingresa un correo válido.';
                messageDiv.className = 'form-message error';
                return;
            }

            messageDiv.textContent = '¡Mensaje enviado con éxito! Te contactaré pronto.';
            messageDiv.className = 'form-message success';

            form.reset();

            setTimeout(() => {
                messageDiv.className = 'form-message';
                messageDiv.textContent = '';
            }, 3000);
        });
    }
});

function toggleText(button) {
    const extraText = button.nextElementSibling;
    if (extraText.style.display === "none") {
        extraText.style.display = "block";
        button.textContent = "Leer menos";
    } else {
        extraText.style.display = "none";
        button.textContent = "Leer más";
    }
}

const buttons = document.querySelectorAll(".toggle-btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const card = button.parentElement;
        const extraText = card.querySelector(".extra-text");

        if (extraText.style.display === "block") {
            extraText.style.display = "none";
            button.textContent = "Leer más";
        } else {
            extraText.style.display = "block";
            button.textContent = "Leer menos";
        }
    });
});