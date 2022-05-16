import './Cart.css'
import { useContext, useState } from "react"
import CartContext from "../../context/CartContext"
import CartItem from '../CartItem/CartItem'
import { addDoc, collection, documentId, getDocs, query, where, writeBatch, Timestamp } from 'firebase/firestore'
import { firestoreDb } from '../../services/firebase';

const Cart = () => {
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState(false)

    const [input, setInput] = useState({
        name: '',
        phone: '',
        email: '',
        fecha: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;
        const newInput = {
            ...input,
            [name]: value,
        };
        setInput(newInput);
    }

    const addDocToCollection = () => {
        const collectionRef = collection(firestoreDb, 'users')

        const objUser = {
            name: input.name,
            phone: input.phone,
            email: input.email,
            date: Timestamp.fromDate(new Date())
        }

        addDoc(collectionRef, objUser)
            .then(response => {
                console.log(response.id)
            })
    }

    const { cart, clearCart, getTotal, getQuantity } = useContext(CartContext)

    const createOrder = () => {
        setOrder(false)
        setLoading(true)
        addDocToCollection()

        const objOrder = {
            items: cart,
            buyer: {
                name: input.name,
                phone: input.phone,
                email: input.email
            },
            total: getTotal(),
            date: new Date()
        }

        const ids = cart.map(prod => prod.id)

        const batch = writeBatch(firestoreDb)

        const collectionRef = collection(firestoreDb, 'products')

        const outOfStock = []

        getDocs(query(collectionRef, where(documentId(), 'in', ids)))
            .then(response => {
                response.docs.forEach(doc => {
                    const dataDoc = doc.data()
                    const prodQuantity = cart.find(prod => prod.id === doc.id)?.quantity

                    if (dataDoc.stock >= prodQuantity) {
                        batch.update(doc.ref, { stock: dataDoc.stock - prodQuantity })
                    } else {
                        outOfStock.push({ id: doc.id, ...dataDoc })
                    }
                })
            })
            .then(() => {
                if (outOfStock.length === 0) {
                    const collectionRef = collection(firestoreDb, 'orders')
                    return addDoc(collectionRef, objOrder)
                } else {
                    return Promise.reject(({ name: 'outofStockError', products: outOfStock }))
                }
            })
            .then(({ id }) => {
                batch.commit()
                console.log(`El id de la orden es ${id}`)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
                clearCart()
                setOrder(true)
            })
    }

    if (loading) {
        return <h1>Se está generando la orden...</h1>
    }

    if (order) {
        return <h1>El pedido se generó correctamente.</h1>
    }

    if (getQuantity() === 0) {
        return (
            <h1>No hay productos en el carrito</h1>
        )
    }

    return (
        <div className='CartFields'>
            <h1>Carrito de compras</h1>
            <h4>Completá los datos para finalizar la compra:</h4>

            <form onSubmit={handleSubmit}>
                <div className='fields'>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        id="name"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='fields'>
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                        id="phone"
                        name="phone"
                        value={input.phone}
                        onChange={handleChange}
                    />
                </div >
                <div className='fields'>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        id="email"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                    />
                </div >
            </form >

            <h4>Tu orden de compra:</h4>

            {cart.map(p => <CartItem key={p.id} {...p} />)}

            <div className='total'>
                <p>Total: <span>$ {getTotal()}</span></p>
            </div>

            <button onClick={() => clearCart()} className="CartButton">Limpiar carrito</button>
            <button onClick={() => createOrder()} className="CartButton">Agregar documento a coleccion</button>
        </div >
    )
}

export default Cart