/**
 * Base JavaScript - Funciones compartidas y utilidades
 * Usado por todas las páginas del template
 */

// ===== UTILIDADES GLOBALES =====

/**
 * Muestra un mensaje temporal al usuario
 * @param {string} text - Texto del mensaje
 * @param {string} type - Tipo: 'success' | 'error' | 'warning'
 */
function showMessage(text, type = 'success') {
    const messageArea = document.getElementById('messageArea');
    if (!messageArea) return;

    messageArea.innerHTML = `
        <div class="message message-${type}">
            ${text}
        </div>
    `;
    
    // Auto-ocultar mensajes de error después de 5 segundos
    if (type === 'error') {
        setTimeout(() => {
            messageArea.innerHTML = '';
        }, 5000);
    } else {
        // Auto-ocultar mensajes de éxito después de 3 segundos
        setTimeout(() => {
            messageArea.innerHTML = '';
        }, 3000);
    }
}

/**
 * Llena un select con las categorías disponibles
 * @param {HTMLSelectElement} selectElement - Elemento select a llenar
 */
function populateCategories(selectElement) {
    if (!selectElement) return;
    
    selectElement.innerHTML = '<option value="">Selecciona una categoría</option>' +
        MOCK_CATEGORIES.map(category => 
            `<option value="${category.id}">${category.name}</option>`
        ).join('');
}

/**
 * Valida un campo de formulario individual
 * @param {HTMLElement} field - Campo a validar
 * @returns {boolean} - true si es válido
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Validaciones específicas por tipo de campo
    switch (fieldName) {
        case 'title':
            if (!value) {
                errorMessage = 'El título es requerido';
                isValid = false;
            } else if (value.length < 3) {
                errorMessage = 'El título debe tener al menos 3 caracteres';
                isValid = false;
            }
            break;
            
        case 'price':
            if (!value) {
                errorMessage = 'El precio es requerido';
                isValid = false;
            } else if (parseFloat(value) <= 0) {
                errorMessage = 'El precio debe ser mayor a 0';
                isValid = false;
            }
            break;
            
        case 'categoryId':
            if (!value) {
                errorMessage = 'Selecciona una categoría';
                isValid = false;
            }
            break;
            
        case 'description':
            if (!value) {
                errorMessage = 'La descripción es requerida';
                isValid = false;
            } else if (value.length < 10) {
                errorMessage = 'La descripción debe tener al menos 10 caracteres';
                isValid = false;
            }
            break;
            
        case 'imageUrl':
            if (!value) {
                errorMessage = 'La URL de la imagen es requerida';
                isValid = false;
            } else if (!isValidUrl(value)) {
                errorMessage = 'Ingresa una URL válida';
                isValid = false;
            }
            break;
    }

    showFieldError(fieldName, errorMessage);
    return isValid;
}

/**
 * Muestra un error en un campo específico
 * @param {string} fieldName - Nombre del campo
 * @param {string} message - Mensaje de error
 */
function showFieldError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = message ? 'block' : 'none';
    }
}

/**
 * Limpia el error de un campo específico
 * @param {string} fieldName - Nombre del campo
 */
function clearFieldError(fieldName) {
    showFieldError(fieldName, '');
}

/**
 * Valida si una string es una URL válida
 * @param {string} string - String a validar
 * @returns {boolean} - true si es URL válida
 */
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Debounce - Retrasa la ejecución de una función
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} - Función debounced
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Formatea una fecha para mostrar al usuario
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} - Fecha formateada
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Crea un slug a partir de un título
 * @param {string} title - Título a convertir
 * @returns {string} - Slug generado
 */
function createSlug(title) {
    return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
}

// ===== MANEJO DE ESTADOS UI =====

/**
 * Simula un estado de carga y ejecuta callback
 * @param {Function} callback - Función a ejecutar después del loading
 * @param {number} delay - Tiempo de loading en ms (default: 800)
 */
function simulateLoading(callback, delay = 800) {
    const loadingState = document.getElementById('loadingState');
    const allStates = ['loadingState', 'emptyState', 'errorState'];
    
    // Ocultar todos los estados
    allStates.forEach(stateId => {
        const element = document.getElementById(stateId);
        if (element) element.style.display = 'none';
    });
    
    // Mostrar loading
    if (loadingState) {
        loadingState.style.display = 'flex';
    }
    
    setTimeout(() => {
        if (loadingState) {
            loadingState.style.display = 'none';
        }
        callback();
    }, delay);
}

/**
 * Oculta todos los estados de la aplicación
 */
function hideAllStates() {
    const states = ['loadingState', 'emptyState', 'errorState'];
    states.forEach(stateId => {
        const element = document.getElementById(stateId);
        if (element) element.style.display = 'none';
    });
    
    // Mostrar contenido principal si existe
    const mainContent = document.getElementById('productsGrid') || 
                       document.getElementById('productDetail') ||
                       document.querySelector('form');
    if (mainContent) {
        mainContent.style.display = mainContent.tagName === 'FORM' ? 'block' : 'grid';
    }
}

/**
 * Muestra el estado de loading con texto personalizable
 * @param {string} text - Texto a mostrar (opcional)
 */
function showLoadingState(text = 'Cargando...') {
    hideAllStates();
    const loadingState = document.getElementById('loadingState');
    const loadingText = document.getElementById('loadingText');
    
    if (loadingText && text) {
        loadingText.textContent = text;
    }
    
    if (loadingState) {
        loadingState.style.display = 'flex';
    }
}

/**
 * Muestra el estado de error
 */
function showErrorState() {
    hideAllStates();
    const errorState = document.getElementById('errorState');
    if (errorState) {
        errorState.style.display = 'block';
    }
}

/**
 * Obtiene parámetros de la URL
 * @param {string} param - Nombre del parámetro
 * @returns {string|null} - Valor del parámetro
 */
function getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ===== MANEJO DE DATOS MOCK =====

/**
 * Encuentra un producto por ID en los datos mock
 * @param {number} productId - ID del producto
 * @returns {Object|null} - Producto encontrado o null
 */
function findProductById(productId) {
    return MOCK_PRODUCTS.find(p => p.id === productId) || null;
}

/**
 * Elimina un producto de los datos mock
 * @param {number} productId - ID del producto a eliminar
 * @returns {boolean} - true si se eliminó correctamente
 */
function removeProductFromMock(productId) {
    const index = MOCK_PRODUCTS.findIndex(p => p.id === productId);
    if (index > -1) {
        MOCK_PRODUCTS.splice(index, 1);
        return true;
    }
    return false;
}

/**
 * Agrega un producto a los datos mock
 * @param {Object} productData - Datos del producto
 * @returns {Object} - Producto creado con ID único
 */
function addProductToMock(productData) {
    const newProduct = {
        id: Date.now(), // ID único temporal
        ...productData,
        slug: createSlug(productData.title),
        category: MOCK_CATEGORIES.find(c => c.id === productData.categoryId),
        images: [productData.imageUrl],
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    MOCK_PRODUCTS.unshift(newProduct);
    return newProduct;
}

/**
 * Actualiza un producto en los datos mock
 * @param {number} productId - ID del producto
 * @param {Object} updatedData - Datos actualizados
 * @returns {Object|null} - Producto actualizado o null
 */
function updateProductInMock(productId, updatedData) {
    const productIndex = MOCK_PRODUCTS.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        const currentProduct = MOCK_PRODUCTS[productIndex];
        MOCK_PRODUCTS[productIndex] = {
            ...currentProduct,
            ...updatedData,
            category: MOCK_CATEGORIES.find(c => c.id === updatedData.categoryId),
            images: [updatedData.imageUrl],
            updatedAt: new Date().toISOString()
        };
        return MOCK_PRODUCTS[productIndex];
    }
    return null;
}