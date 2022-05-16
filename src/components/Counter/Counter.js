import './Counter.css'
import { useState } from "react";
import { useNotification } from '../../Notification/Notification';

const Counter = ({ initial, stock, onAdd, band, album }) => {

    const [count, setCount] = useState(initial)
    const { setNotification } = useNotification()

    const decrement = () => (count > 1)
        ? setCount(count - 1)
        : (null)
    const increment = () => (count < stock)
        ? setCount(count + 1)
        : setNotification('Error', `No contamos con más de ${stock} productos de este disco`)

    return (
        <div className='base'>
            <div className={
                stock === 0
                    ? 'count disable'
                    : 'count'
            }>
                <a onClick={decrement}>-</a>
                {<p>{count}</p>}
                <a onClick={increment}>+</a>
            </div>
            <a onClick={() => onAdd(count)} className={
                stock === 0
                    ? 'disable'
                    : 'cart'
            }>Agregar al carrito</a>
        </div>
    )
}

export default Counter