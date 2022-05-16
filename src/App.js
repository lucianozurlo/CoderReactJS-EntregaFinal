import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import { CartContextProvider } from './context/CartContext';
import { NotificationProvider } from './Notification/Notification';

const App = () => {
    return (
        <div className="App">
            <NotificationProvider>
                <CartContextProvider>
                    <header className="App-header">
                        <BrowserRouter>
                            <NavBar />
                            <Routes>
                                <Route path='/' element={<ItemListContainer />} />
                                <Route path='/list' element={<ItemListContainer />} />
                                <Route path='/category/:categoryId' element={<ItemListContainer />} />
                                <Route path='/detail/:productId' element={<ItemDetailContainer />} />
                                <Route path='/cart' element={<Cart />} />
                            </Routes>
                        </BrowserRouter>
                    </header>
                </CartContextProvider>
            </NotificationProvider>
        </div>
    );
}

export default App;