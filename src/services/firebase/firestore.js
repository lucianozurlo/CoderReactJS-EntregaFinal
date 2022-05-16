import { firestoreDb } from './index'
import { getDocs, collection, query, where, limit, orderBy } from 'firebase/firestore';
import { createAdapterProductFromFirestore } from '../../adapters/productAdapter';

export const getProducts = (categoryId) => {
    return new Promise((resolve, reject) => {
        const collectionRef = categoryId
            ? query(collection(firestoreDb, 'products'),
                where('category', '==', categoryId),
                limit(2))
            : query(collection(firestoreDb, 'products'),
                orderBy('band', 'asc'),
                limit(20))

        getDocs(collectionRef)
            .then(response => {
                const products = response.docs.map(doc => {
                    return createAdapterProductFromFirestore(doc)
                })
                resolve(products)
            })
            .catch(error => {
                reject(error)
            })
    })
}