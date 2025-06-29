/**
 * Manejo del formulario de contacto
 */

import { submitForm, showToast } from './api.js';

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Mostrar estado de carga
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Enviando...';
            submitButton.disabled = true;
            
            try {
                // Recoger datos del formulario
                const formData = {
                    nombre: document.getElementById('fullName').value,
                    email: document.getElementById('email').value,
                    tema: document.getElementById('subject').value,
                    mensaje: document.getElementById('message').value
                };
                
                // Enviar a la API y almacenar
                const response = await submitForm(formData, 'contactSubmissions');
                
                // Mostrar feedback
                showToast('Mensaje enviado con éxito!');
                
                // Resetear formulario
                contactForm.reset();
            } catch (error) {
                console.error('Error en el formulario de contacto:', error);
                showToast('Error al enviar el mensaje', 'danger');
            } finally {
                // Restaurar botón
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
});