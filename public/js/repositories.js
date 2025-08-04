
class ProductRepository {
    constructor(url) {
        this.url = url;
    }

    async getProducts() {
        const response = await fetch(`${this.url}/products/`);
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
}


window.productRepository = new ProductRepository("https://api.escuelajs.co/api/v1")
