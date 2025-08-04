
class ProductRepository {
    constructor(url) {
        this.url = url;
    }

    async getProducts() {
        const response = await fetch(`${this.url}/products/`);
        const responseData = await response.json();
        return responseData;
    }
}


window.productRepository = new ProductRepository("https://api.escuelajs.co/api/v1")