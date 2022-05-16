import './Counter.css'
import { useState } from "react";
import { useNotification } from '../../Notification/Notification';

const Counter = ({ initial, stock, onAdd }) => {

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
                <button onClick={decrement}>-</button>
                {<p>{count}</p>}
                <button onClick={increment}>+</button>
            </div>
            <button onClick={() => onAdd(count)} className={
                stock === 0
                    ? 'disable'
                    : 'cart'
            }>Agregar al carrito</button>
        </div>
    )
}

export default Counter