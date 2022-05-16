import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { firestoreDb } from '../../services/firebase';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';

const NavBar = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getDocs(query(collection(firestoreDb, 'categories'), orderBy('description', 'asc')))
            .then(response => {
                const categories = response.docs.map(doc => {
                    return { id: doc.id, ...doc.data() }
                })
                setCategories(categories)
            })
    }, [])

    return (
        <>
            <nav className="NavBar">
                <Link to='/'>
                    <img className='Logo' src={'/img/logo.svg'} alt='' />
                </Link>
                <div className='Categories'>
                    {categories.map(cat =>
                        <NavLink key={cat.id} to={`/category/${cat.id}`} className={({ isActive }) =>
                            isActive
                                ? 'ActiveOption'
                                : 'Option'
                        }>
                            {cat.description}
                        </NavLink>
                    )}
                </div>
                <CartWidget counter={0} />
            </nav>
        </>
    )
}

export default NavBar