/**
 * Detail JavaScript - Lógica específica del detalle de producto
 * Maneja: carga de producto, mostrar información completa, acciones (editar/eliminar)
 */

// ===== ESTADO =====
let currentProduct = null;
let productId = null;

// ===== ELEMENTOS DEL DOM =====
let productDetail;
let deleteModal;
let mainImage;
let productCategory;
let productIdSpan;
let productTitle;
let productPrice;
let productDescription;
let creationDate;
let updateDate;
let productSlug;
let breadcrumbCategory;
let editProductBtn;
let deleteProductBtn;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', async () => {
    await initializeDetail();
});

/**
 * Inicializa la página de detalle del producto
 */
async function initializeDetail() {
    // Obtener ID del producto desde URL
    productId = parseInt(getUrlParameter('id'));

    if (!productId) {
        showErrorState();
        return;
    }

    // Obtener elementos del DOM
    initializeDOMElements();

    // Configurar eventos
    bindEventListeners();

    // Cargar producto
    await loadProductDetail();
}

/**
 * Inicializa las referencias a elementos del DOM
 */
function initializeDOMElements() {
    productDetail = document.getElementById('productDetail');
    deleteModal = document.getElementById('deleteModal');
    mainImage = document.getElementById('mainImage');
    productCategory = document.getElementById('productCategory');
    productIdSpan = document.getElementById('productId');
    productTitle = document.getElementById('productTitle');
    productPrice = document.getElementById('productPrice');
    productDescription = document.getElementById('productDescription');
    creationDate = document.getElementById('creationDate');
    updateDate = document.getElementById('updateDate');
    productSlug = document.getElementById('productSlug');
    breadcrumbCategory = document.getElementById('breadcrumbCategory');
    editProductBtn = document.getElementById('editProductBtn');
    deleteProductBtn = document.getElementById('deleteProductBtn');
}

// ===== CARGA DEL PRODUCTO =====

/**
 * Carga los detalles del producto desde los datos mock
 */
async function loadProductDetail() {
    showLoadingState('Cargando producto...');

    // Simular carga de API
    setTimeout(async () => {
        const repo = window.productRepository;

        currentProduct = await repo.getProduct(productId);

        if (!currentProduct) {
            showErrorState();
            return;
        }

        populateProductDetail(currentProduct);
        showProductDetail();
    }, 800);
}

/**
 * Llena la página con la información del producto
 * @param {Object} product - Datos del producto
 */
function populateProductDetail(product) {
    // Imagen principal
    if (mainImage) {
        mainImage.src = product.images[0];
        mainImage.alt = product.title;
        mainImage.onerror = function () {
            this.src = 'https://via.placeholder.com/500x400?text=No+Image';
        };
    }

    // Información básica
    if (productCategory) productCategory.textContent = product.category.name;
    if (productIdSpan) productIdSpan.textContent = `ID: #${product.id}`;
    if (productTitle) productTitle.textContent = product.title;
    if (productPrice) productPrice.textContent = `$${product.price}`;
    if (productDescription) productDescription.textContent = product.description;
    if (productSlug) productSlug.textContent = product.slug;

    // Breadcrumb
    if (breadcrumbCategory) breadcrumbCategory.textContent = product.category.name;

    // Fechas formateadas
    if (product.creationAt && creationDate) {
        creationDate.textContent = formatDate(product.creationAt);
    }
    if (product.updatedAt && updateDate) {
        updateDate.textContent = formatDate(product.updatedAt);
    }

    // Configurar título de la página
    document.title = `${product.title} - API Course`;
}

// ===== ESTADOS DE LA INTERFAZ =====

/**
 * Muestra el detalle del producto
 */
function showProductDetail() {
    hideAllStates();
    if (productDetail) {
        productDetail.style.display = 'block';
    }
}

// ===== EVENTOS =====

/**
 * Configura todos los event listeners del detalle
 */
function bindEventListeners() {
    // Botón de editar
    if (editProductBtn) {
        editProductBtn.addEventListener('click', () => {
            window.location.href = `edit.html?id=${productId}`;
        });
    }

    // Botón de eliminar
    if (deleteProductBtn) {
        deleteProductBtn.addEventListener('click', showDeleteModal);
    }

    // Modal de eliminación
    if (deleteModal) {
        const confirmBtn = document.getElementById('confirmDelete');
        const cancelBtn = document.getElementById('cancelDelete');

        if (confirmBtn) confirmBtn.addEventListener('click', deleteProduct);
        if (cancelBtn) cancelBtn.addEventListener('click', hideDeleteModal);
    }
}

// ===== ELIMINACIÓN =====

/**
 * Muestra el modal de confirmación para eliminar
 */
function showDeleteModal() {
    if (!currentProduct || !deleteModal) return;

    const modalText = document.getElementById('deleteModalText');
    if (modalText) {
        modalText.textContent = `¿Estás seguro de que quieres eliminar "${currentProduct.title}"?`;
    }

    deleteModal.style.display = 'flex';
}

/**
 * Oculta el modal de confirmación
 */
function hideDeleteModal() {
    if (deleteModal) {
        deleteModal.style.display = 'none';
    }
}

/**
 * Elimina el producto actual
 */
function deleteProduct() {
    if (!productId) return;

    const confirmBtn = document.getElementById('confirmDelete');

    // Mostrar estado de carga
    if (confirmBtn) {
        confirmBtn.innerHTML = '<div class="spinner"></div> Eliminando...';
    }


    const repository = window.productRepository;

    repository.deleteProduct(productId).then(wasDeleted => {
        hideDeleteModal();

        if (wasDeleted) {
            showMessage(MOCK_MESSAGES.delete.success, 'success');

            // Redireccionar al catálogo después de mostrar mensaje
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            showMessage(MOCK_MESSAGES.delete.error, 'error');

            // Restaurar botón
            if (confirmBtn) {
                confirmBtn.innerHTML = 'Eliminar';
            }
        }
    })

}