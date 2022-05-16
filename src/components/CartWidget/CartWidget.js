import './CartWidget.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext'

const CartWidget = () => {
    const { getQuantity } = useContext(CartContext)

    return (
        <div className='Cart'>
            <Link to='/cart'>
                <img src={'/img/cart.svg'} alt='' />
                <div className='Counter'>{getQuantity()}</div>
            </Link>
        </div>
    )
}

export default CartWidget