/**
 * Create JavaScript - Lógica específica del formulario de creación
 * Maneja: validación, preview de imagen, creación de producto
 */

// ===== ELEMENTOS DEL DOM =====
let form;
let categorySelect;
let imageUrlInput;
let imagePreview;
let previewImg;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initializeCreateForm();
});

/**
 * Inicializa el formulario de creación
 */
function initializeCreateForm() {
    // Obtener elementos del DOM
    form = document.getElementById('createForm');
    categorySelect = document.getElementById('categoryId');
    imageUrlInput = document.getElementById('imageUrl');
    imagePreview = document.getElementById('imagePreview');
    previewImg = document.getElementById('previewImg');

    // Inicializar componentes
    populateCategories(categorySelect);
    bindEventListeners();
}

// ===== EVENTOS =====

/**
 * Configura todos los event listeners del formulario
 */
function bindEventListeners() {
    // Manejo del formulario
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    
    // Preview de imagen con debounce
    if (imageUrlInput) {
        imageUrlInput.addEventListener('input', debounce(showImagePreview, 500));
    }
    
    // Validación en tiempo real para todos los campos
    const formFields = form ? form.querySelectorAll('input, select, textarea') : [];
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => clearFieldError(field.name));
    });
}

// ===== MANEJO DEL FORMULARIO =====

/**
 * Maneja el envío del formulario
 * @param {Event} e - Evento de submit
 */
function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showMessage('Por favor corrige los errores del formulario', 'error');
        return;
    }

    const formData = new FormData(form);
    const productData = {
        title: formData.get('title').trim(),
        price: parseFloat(formData.get('price')),
        categoryId: parseInt(formData.get('categoryId')),
        description: formData.get('description').trim(),
        imageUrl: formData.get('imageUrl').trim()
    };

    simulateCreateProduct(productData);
}

/**
 * Simula la creación de un producto
 * @param {Object} productData - Datos del producto a crear
 */
function simulateCreateProduct(productData) {
    // Cambiar estado a loading
    showCreateLoadingState();
    
    // Simular petición al servidor
    setTimeout(() => {
        // Simular éxito o error aleatorio (80% éxito)
        const isSuccess = Math.random() > 0.2;
        
        hideCreateLoadingState();
        
        if (isSuccess) {
            // Agregar al mock data
            const newProduct = addProductToMock(productData);
            
            showMessage(MOCK_MESSAGES.create.success, 'success');
            resetForm();
            
            // Redireccionar después de 2 segundos
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            showMessage(MOCK_MESSAGES.create.error, 'error');
        }
    }, 1500);
}

// ===== VALIDACIÓN =====

/**
 * Valida todo el formulario
 * @returns {boolean} - true si el formulario es válido
 */
function validateForm() {
    let isValid = true;
    const fields = ['title', 'price', 'categoryId', 'description', 'imageUrl'];
    
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field && !validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// ===== PREVIEW DE IMAGEN =====

/**
 * Muestra preview de la imagen ingresada
 */
function showImagePreview() {
    if (!imageUrlInput || !imagePreview || !previewImg) return;
    
    const url = imageUrlInput.value.trim();
    if (url && isValidUrl(url)) {
        previewImg.src = url;
        previewImg.onload = () => {
            imagePreview.style.display = 'block';
        };
        previewImg.onerror = () => {
            imagePreview.style.display = 'none';
        };
    } else {
        imagePreview.style.display = 'none';
    }
}

// ===== ESTADOS DE LA INTERFAZ =====

/**
 * Muestra estado de loading durante la creación
 */
function showCreateLoadingState() {
    if (form) form.style.display = 'none';
    showLoadingState('Creando producto...');
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) submitBtn.disabled = true;
}

/**
 * Oculta estado de loading
 */
function hideCreateLoadingState() {
    if (form) form.style.display = 'block';
    hideAllStates();
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) submitBtn.disabled = false;
}

// ===== UTILIDADES =====

/**
 * Resetea el formulario a su estado inicial
 */
function resetForm() {
    if (!form) return;
    
    form.reset();
    
    // Ocultar preview de imagen
    if (imagePreview) {
        imagePreview.style.display = 'none';
    }
    
    // Limpiar errores
    const fieldNames = ['title', 'price', 'categoryId', 'description', 'imageUrl'];
    fieldNames.forEach(fieldName => {
        clearFieldError(fieldName);
    });
}