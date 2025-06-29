/**
 * Funciones comunes para manejo de API y localStorage
 */

/**
 * Envía datos del formulario a la API y almacena la respuesta
 * @param {Object} formData - Datos del formulario
 * @param {string} storageKey - Clave para localStorage
 * @returns {Promise<Object>} - Respuesta de la API
 */
export async function submitForm(formData, storageKey) {
    try {
        // Enviar datos a la API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        
        const data = await response.json();

        storeInLocalStorage(storageKey, data);
        
        return data;
    } catch (error) {
        console.error('Error en submitForm:', error);
        throw error;
    }
}

/**
 * Almacena datos en localStorage
 * @param {string} key - Clave de almacenamiento
 * @param {Object} data - Datos a almacenar
 */
function storeInLocalStorage(key, data) {
    try {
        const existingData = JSON.parse(localStorage.getItem(key) || '[]');
        const newData = {
            ...data,
            timestamp: new Date().toISOString()
        };
        
        existingData.push(newData);
        localStorage.setItem(key, JSON.stringify(existingData));
    } catch (error) {
        console.error('Error almacenando en localStorage:', error);
    }
}

/**
 * Muestra un toast de notificación
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación
 */
export function showToast(message, type = 'success') {
    // Crear contenedor si no existe
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Crear toast
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    toastEl.role = 'alert';
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    toastContainer.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    
    // Eliminar toast después de ocultarse
    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}