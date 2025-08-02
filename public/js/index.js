/**
 * Index JavaScript - Lógica específica del catálogo de productos
 * Maneja: listado, búsqueda, filtrado y eliminación de productos
 */

// ===== ESTADO DE LA APLICACIÓN =====
let currentProducts = [...MOCK_PRODUCTS];
let currentCategory = '';
let currentSearch = '';
let productToDelete = null;

// ===== ELEMENTOS DEL DOM =====
let productsGrid;
let emptyState;
let searchInput;
let categoryFilter;
let deleteModal;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initializeCatalog();
});

/**
 * Inicializa el catálogo de productos
 */
function initializeCatalog() {
    // Obtener elementos del DOM
    productsGrid = document.getElementById('productsGrid');
    emptyState = document.getElementById('emptyState');
    searchInput = document.getElementById('searchInput');
    categoryFilter = document.getElementById('categoryFilter');
    deleteModal = document.getElementById('deleteModal');

    // Inicializar componentes
    populateCategories(categoryFilter);
    bindEventListeners();
    
    // Simular carga inicial
    simulateLoading(() => {
        renderProducts(currentProducts);
    });
}

// ===== RENDERIZADO DE PRODUCTOS =====

/**
 * Renderiza la lista de productos en el catálogo
 * @param {Array} products - Array de productos a mostrar
 */
function renderProducts(products) {
    hideAllStates();
    
    if (products.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <article class="product-card">
            <a href="detail.html?id=${product.id}" class="product-card-link">
                <img 
                    src="${product.images[0]}" 
                    alt="${product.title}"
                    class="product-image"
                    onerror="this.src='https://via.placeholder.com/280x200?text=No+Image'"
                >
            </a>
            <div class="product-content">
                <div class="product-category">${product.category.name}</div>
                <h3 class="product-title">
                    <a href="detail.html?id=${product.id}" class="product-title-link">${product.title}</a>
                </h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price}</span>
                    <div class="product-actions">
                        <a href="detail.html?id=${product.id}" class="btn btn-primary btn-sm">
                            👁️ Ver
                        </a>
                        <a href="edit.html?id=${product.id}" class="btn btn-secondary btn-sm">
                            ✏️ Editar
                        </a>
                        <button 
                            onclick="showDeleteModal(${product.id})"
                            class="btn btn-danger btn-sm"
                        >
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </article>
    `).join('');
}

// ===== FILTRADO Y BÚSQUEDA =====

/**
 * Filtra productos según categoría y búsqueda actual
 */
function filterProducts() {
    let filtered = [...MOCK_PRODUCTS];

    // Filtrar por categoría
    if (currentCategory) {
        filtered = filtered.filter(product => 
            product.category.id.toString() === currentCategory
        );
    }

    // Filtrar por búsqueda
    if (currentSearch) {
        filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
            product.description.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }

    currentProducts = filtered;
    renderProducts(filtered);
}

// ===== EVENTOS =====

/**
 * Configura todos los event listeners del catálogo
 */
function bindEventListeners() {
    // Búsqueda en tiempo real
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        filterProducts();
    });

    // Filtro por categoría
    categoryFilter.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        filterProducts();
    });

    // Modal de eliminación
    if (deleteModal) {
        document.getElementById('confirmDelete').addEventListener('click', deleteProduct);
        document.getElementById('cancelDelete').addEventListener('click', hideDeleteModal);
    }
}

// ===== ELIMINACIÓN DE PRODUCTOS =====

/**
 * Muestra el modal de confirmación para eliminar producto
 * @param {number} productId - ID del producto a eliminar
 */
function showDeleteModal(productId) {
    productToDelete = productId;
    const product = findProductById(productId);
    
    if (product && deleteModal) {
        // Actualizar texto del modal con nombre del producto
        const modalText = document.querySelector('#deleteModal p');
        if (modalText) {
            modalText.textContent = `¿Estás seguro de que quieres eliminar "${product.title}"?`;
        }
        
        deleteModal.style.display = 'flex';
    }
}

/**
 * Oculta el modal de confirmación
 */
function hideDeleteModal() {
    productToDelete = null;
    if (deleteModal) {
        deleteModal.style.display = 'none';
    }
}

/**
 * Elimina el producto seleccionado
 */
function deleteProduct() {
    if (!productToDelete) return;

    const confirmBtn = document.getElementById('confirmDelete');
    
    // Mostrar estado de carga en el botón
    if (confirmBtn) {
        confirmBtn.innerHTML = '<div class="spinner"></div> Eliminando...';
    }
    
    // Simular operación de eliminación
    setTimeout(() => {
        // Eliminar del array mock
        const wasDeleted = removeProductFromMock(productToDelete);
        
        hideDeleteModal();
        
        if (wasDeleted) {
            showMessage(MOCK_MESSAGES.delete.success, 'success');
            // Re-renderizar la lista filtrada
            filterProducts();
        } else {
            showMessage(MOCK_MESSAGES.delete.error, 'error');
        }
        
        // Restaurar botón
        if (confirmBtn) {
            confirmBtn.innerHTML = 'Eliminar';
        }
    }, 1000);
}

// ===== FUNCIONES AUXILIARES =====

/**
 * Actualiza el catálogo después de cambios externos
 * Útil cuando se regresa desde crear/editar producto
 */
function refreshCatalog() {
    currentProducts = [...MOCK_PRODUCTS];
    filterProducts();
}

// Exponer función global para que otras páginas puedan actualizar el catálogo
window.refreshCatalog = refreshCatalog;