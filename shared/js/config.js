/**
 * Manejo de la página de configuración
 */

import { submitForm, showToast } from './api.js';

document.addEventListener('DOMContentLoaded', function() {
    loadSavedSettings();
    
    const configForm = document.getElementById('configForm');
    
    if (configForm) {
        configForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = configForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Guardando...';
            submitButton.disabled = true;
            
            try {
                const formData = {
                    profileImage: document.getElementById('profileImage').files[0]?.name || '',
                    birthDate: document.getElementById('birthDate').value,
                    gender: document.querySelector('input[name="gender"]:checked')?.value || '',
                    primaryColor: document.getElementById('primaryColor').value,
                    username: document.getElementById('username').value
                };
                
                const response = await submitForm(formData, 'userSettings');
                
                applySettings(formData);
                
                showToast('Configuración guardada con éxito!');
            } catch (error) {
                console.error('Error en el formulario de configuración:', error);
                showToast('Error al guardar la configuración', 'danger');
            } finally {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
    
    function loadSavedSettings() {
        const savedSettings = JSON.parse(localStorage.getItem('userSettings'));
        
        if (savedSettings && savedSettings.length > 0) {
            const latest = savedSettings.reduce((prev, current) => 
                (prev.timestamp > current.timestamp) ? prev : current
            );
            
            if (latest.birthDate) document.getElementById('birthDate').value = latest.birthDate;
            if (latest.gender) {
                const genderInput = document.querySelector(`input[name="gender"][value="${latest.gender}"]`);
                if (genderInput) genderInput.checked = true;
            }
            if (latest.primaryColor) document.getElementById('primaryColor').value = latest.primaryColor;
            if (latest.username) document.getElementById('username').value = latest.username;
            
            applySettings(latest);
        }
    }
    
    function applySettings(settings) {
        if (settings.primaryColor) {
            document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
        }
    }
});