import './ItemDetail.css'
import Counter from '../Counter/Counter';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import { useNotification } from '../../Notification/Notification';

const ItemDetail = ({ id, band, album, price, description, cover, stock }) => {
    const options = [{ id: 0, value: '', text: '-' }, { id: 1, value: '/', text: 'ItemDetailContainer' }, { id: 2, value: '/', text: 'Formulario' }]
    const navigate = useNavigate()

    const { addItem, isInCart, getQuantityProd } = useContext(CartContext)

    const { setNotification } = useNotification()

    const handleOnAdd = (count) => {
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