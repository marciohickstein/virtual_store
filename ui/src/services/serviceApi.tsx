const PROTOCOL_API = 'http';
const HOST_API = 'localhost';
const PORT_API = '3000';

const serviceApi = {
    getListOfProducts: async function (text = '') {
        let queryString = '';

        if (text) {
            queryString = `?title=${text}`;
        }
        const urlApi = `${PROTOCOL_API}://${HOST_API}:${PORT_API}/product${queryString}`;

        const response = await fetch(urlApi);


        const products = await response.json();
        return (products);
    },

    getListOfProductsAndImages: async function (text = '') {
        const products = await this.getListOfProducts(text);
        const productsAndImages: [] = [];

        for (const product of products) {
            const imageUrl = await this.getImageDataFromProduct(product.id);

            const productAndImages: any = {
                ...product,
                image: imageUrl
            }

            productsAndImages.push(productAndImages)
        }

        return productsAndImages;
    },

    getImageDataFromProduct: async function (productId: number) {
        const urlApi = `${PROTOCOL_API}://${HOST_API}:${PORT_API}/image`;

        let response = await fetch(urlApi);

        const images = await response.json();

        if (!images || !Array.isArray(images) || images.length <= 0) {
            return null;
        }

        const productImages = images.filter((p: any) => {
            if (p.productId === productId) {
                return true;
            }
            return false;
        })

        if (!productImages || !Array.isArray(productImages) || productImages.length <= 0) {
            return null;
        }

        const byteArray = new Uint8Array(productImages[0].data.data);

        // Convert the byte array to a Blob
        const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust 'image/jpeg' to the appropriate MIME type

        // Create an Object URL from the Blob
        const objectURL = URL.createObjectURL(blob);

        return objectURL ? objectURL : '';
    }
}

export default serviceApi;