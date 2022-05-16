import './ItemDetail.css'
import Counter from '../Counter/Counter';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import { useNotification } from '../../Notification/Notification';

const ItemDetail = ({ id, band, album, price, description, cover, stock }) => {

    const { addItem, isInCart, getQuantityProd } = useContext(CartContext)

    const { setNotification } = useNotification()

    const handleOnAdd = (count) => {
        console.log(`Se agregaron ${count} productos`)

        const productObj = {
            id, band, album, price
        }
        addItem(productObj)
        setNotification('success', `Agregado: ${band} - ${album} (cant: ${count})`)

        addItem({ ...productObj, quantity: count })
    }

    const { getQuantity } = useContext(CartContext)

    return (
        <article>
            <section className='detail'>
                <picture>
                    <img src={cover} alt={album} />
                </picture>
                <div>
                    <p className='band'>{band}</p>
                    <p className='album'>{album}</p>
                    <p className='description'>({description})</p>
                    <p className='price'>$ {price}</p>
                    <p className={
                        stock === 0
                            ? 'stock empty'
                            : 'stock'
                    }>Stock disponible <span>{stock}</span> unidades</p>

                    <Counter initial={
                        isInCart(id) > 0
                            ? getQuantityProd(id)
                            : 1
                    } stock={stock} onAdd={handleOnAdd} />
                    <Link to='/cart' className={
                        getQuantity() === 0
                            ? 'disable'
                            : 'enable'
                    }>Ir al carrito</Link>
                </div>
            </section>

        </article>
    )
}

export default ItemDetail