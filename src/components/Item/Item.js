import './Item.css'
import { Link } from 'react-router-dom';

const Item = ({ id, band, album, price, cover, stock }) => {

    const handleClick = (e) => {
        e.stopPropagation()
    }

    return (
        <article onClick={handleClick}>
            <section>
                <picture>
                    <img src={cover} alt={album} />
                </picture>
                <p className='band'>{band}</p>
                <p className='album'>{album}</p>
                <p className='price'>$ {price}</p>
                <p className={
                    stock === 0
                        ? 'stock empty'
                        : 'stock'
                }>Stock disponible <span>{stock}</span> unidades</p>
            </section>
            <footer className='ItemFooter'>
                <Link to={`/detail/${id}`} className='detalles'>Ver detalle</Link>
            </footer>
        </article>
    )
}

export default Item