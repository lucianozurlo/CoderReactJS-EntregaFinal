export const createAdapterProductFromFirestore = (doc) => {
    const data = doc.data()
    const formattedProduct = {
        id: doc.id,
        band: data.band,
        album: data.album,
        cover: data.cover,
        stock: data.stock,
        category: data.category,
        price: data.price,
        description: data.description
    }

    return formattedProduct
}
