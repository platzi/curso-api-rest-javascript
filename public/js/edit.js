/**
 * Edit JavaScript - Lógica específica del formulario de edición
 * Maneja: carga de producto existente, validación, actualización
 */

// ===== ESTADO =====
let currentProduct = null;
let productId = null;

// ===== ELEMENTOS DEL DOM =====
let form;
let categorySelect;
let imageUrlInput;
let previewImg;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initializeEditForm();
});

/**
 * Inicializa el formulario de edición
 */
function initializeEditForm() {
    // Obtener ID del producto desde URL
    productId = parseInt(getUrlParameter('id'));

    if (!productId) {
        showErrorState();
        return;
    }

    // Obtener elementos del DOM
    form = document.getElementById('editForm');
    categorySelect = document.getElementById('categoryId');
    imageUrlInput = document.getElementById('imageUrl');
    previewImg = document.getElementById('previewImg');

    // Inicializar componentes
    populateCategories(categorySelect);
    bindEventListeners();
    loadProduct();
}

// ===== CARGA DEL PRODUCTO =====

/**
 * Carga el producto a editar desde los datos mock
 */
function loadProduct() {
    showLoadingState('Cargando producto...');

    // Simular carga de API
    setTimeout(() => {
        // Buscar producto en mock data
        currentProduct = findProductById(productId);
        
        if (!currentProduct) {
            showErrorState();
            return;
        }

        populateForm(currentProduct);
        showForm();
    }, 800);
}

/**
 * Llena el formulario con los datos del producto
 * @param {Object} product - Datos del producto
 */
function populateForm(product) {
    if (!form) return;

    // Llenar campos del formulario
    const titleField = document.getElementById('title');
    const priceField = document.getElementById('price');
    const descriptionField = document.getElementById('description');
    const imageUrlField = document.getElementById('imageUrl');

    if (titleField) titleField.value = product.title;
    if (priceField) priceField.value = product.price;
    if (categorySelect) categorySelect.value = product.category.id;
    if (descriptionField) descriptionField.value = product.description;
    if (imageUrlField) imageUrlField.value = product.images[0];
    
    // Mostrar preview de imagen actual
    if (previewImg) {
        previewImg.src = product.images[0];
    }
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
        imageUrlInput.addEventListener('input', debounce(updateImagePreview, 500));
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
 * Maneja el envío del formulario de edición
 * @param {Event} e - Evento de submit
 */
function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showMessage('Por favor corrige los errores del formulario', 'error');
        return;
    }

    const formData = new FormData(form);
    const updatedData = {
        title: formData.get('title').trim(),
        price: parseFloat(formData.get('price')),
        categoryId: parseInt(formData.get('categoryId')),
        description: formData.get('description').trim(),
        imageUrl: formData.get('imageUrl').trim()
    };

    simulateUpdateProduct(updatedData);
}

/**
 * Simula la actualización del producto
 * @param {Object} updatedData - Datos actualizados del producto
 */
function simulateUpdateProduct(updatedData) {
    showEditLoadingState();
    
    // Simular petición al servidor
    setTimeout(() => {
        // Simular éxito o error aleatorio (90% éxito para edición)
        const isSuccess = Math.random() > 0.1;
        
        if (isSuccess) {
            // Actualizar en mock data
            const updatedProduct = updateProductInMock(productId, updatedData);
            
            if (updatedProduct) {
                showMessage(MOCK_MESSAGES.update.success, 'success');
                
                // Redireccionar después de 2 segundos
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                showMessage(MOCK_MESSAGES.update.error, 'error');
                showForm();
            }
        } else {
            showMessage(MOCK_MESSAGES.update.error, 'error');
            showForm();
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
 * Actualiza el preview de imagen cuando cambia la URL
 */
function updateImagePreview() {
    if (!imageUrlInput || !previewImg) return;
    
    const url = imageUrlInput.value.trim();
    if (url && isValidUrl(url)) {
        previewImg.src = url;
    }
}

// ===== ESTADOS DE LA INTERFAZ =====

/**
 * Muestra el formulario de edición
 */
function showForm() {
    hideAllStates();
    if (form) {
        form.style.display = 'block';
    }
}

/**
 * Muestra estado de loading durante la actualización
 */
function showEditLoadingState() {
    showLoadingState('Actualizando producto...');
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) submitBtn.disabled = true;
}

/**
 * Oculta estado de loading y muestra formulario
 */
function hideEditLoadingState() {
    showForm();
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) submitBtn.disabled = false;
}