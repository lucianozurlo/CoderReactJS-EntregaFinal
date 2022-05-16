import './CartItem.css'
import { useContext } from 'react'
import CartContext from '../../context/CartContext'

const CartItem = ({ id, band, album, quantity, price }) => {
    const { removeItem } = useContext(CartContext)

    const handleRemove = (id) => {
        removeItem(id)
    }

    return (
        <article className='Item'>
            <div className='ItemQuantity'>
                <p className='ItemName'>
                    Cantidad:<br />
                    <span>{quantity}</span>
                </p>
            </div>
            <div className='ItemTitle'>
                <p className='ItemBand'>{band}</p>
                <p className='ItemAlbum'>{album}</p>
            </div>
            <div className='ItemPrice'>
                <p className='ItemName'>
                    Precio x unidad: <br />
                    <span>$ {price}</span>
                </p>
            </div>
            <div className='ItemPriceTotal'>
                <p className='ItemName'>
                    Subtotal: <br />
                    <span>$ {price * quantity}</span>
                </p>
            </div>
            <div className='ButtonClean'>
                <a onClick={() => handleRemove(id)}>X</a>
            </div>
        </article>
    )
}

export default CartItem