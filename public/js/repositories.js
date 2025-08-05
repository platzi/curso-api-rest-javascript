
class ProductRepository {
    constructor(url) {
        this.url = url;
    }

    async getProducts(categoryId) {

        const filterParams = new URLSearchParams();
        if (categoryId) {

            filterParams.append('categoryId', categoryId)
        }

        let url = `${this.url}/products/`;

        if (filterParams.size > 0) {
            url = `${url}?${filterParams}`
        }

        const response = await fetch(url);


        if (!response.ok && !response.headers.get('content-type') != 'applicacion/json') {
            throw new Error('No fue posible encontrar los productos')
        }
        const responseData = await response.json();
        return responseData;
    }

    async getProduct(id) {
        const response = await fetch(`${this.url}/products/${id}/`);
        if (!response.ok && !response.headers.get('content-type') != 'applicacion/json') {
            throw new Error('No fue posible encontrar los productos')
        }
        const responseData = await response.json();
        return responseData;
    }


    async createProduct(product) {

        const url = `${this.url}/products/`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error(`No se pudo crear el producto, con status code ${response.status}`);
        }

        const jsonResponse = await response.json()
        return jsonResponse;

    }

    async editProduct(productId, productData) {
        const url = `${this.url}/products/${productId}/`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });


        if (!response.ok) {
            throw new Error(`No se puede actualizar el producto ${productId}: ${response.status}`)
        }

        const jsonResponse = await response.json();
        return jsonResponse;
    }
}


window.productRepository = new ProductRepository("https://api.escuelajs.co/api/v1")
