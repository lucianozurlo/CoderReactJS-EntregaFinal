import { useState, useEffect } from 'react';
import { getDocs, collection, query, where, orderBy } from 'firebase/firestore'; import { useParams } from 'react-router-dom'
import ItemList from '../ItemList/ItemList'
import { getProducts } from '../../services/firebase/firestore'
import { useAsync } from '../../hooks/useAsync'
import { firestoreDb } from '../../services/firebase';

const ItemListContainer = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()

    useAsync(
        setLoading,
        () => getProducts(categoryId),
        setProducts,
        () => console.log('Error en itemListContainer')
        [categoryId]
    )

    useEffect(() => {
        const collectionRef = categoryId
            ? query(collection(firestoreDb, 'products'),
                where('category', '==', categoryId))
            : query(collection(firestoreDb, 'products'),
                orderBy('band', 'asc'))

        getDocs(collectionRef)
            .then(response => {
                const products = response.docs.map(doc => {
                    return { id: doc.id, ...doc.data() }
                })
                setProducts(products)
            })
    }, [categoryId])


    if (loading) {
        return (
            <h1>Cargando...</h1>
        )
    }

    if (products.length === 0) {
        return <h1>No hay productos</h1>
    }

    return (
        <div>
            <ItemList products={products} />
        </div>
    )
}

export default ItemListContainer 