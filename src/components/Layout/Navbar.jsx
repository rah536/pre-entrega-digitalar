import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();

  return (
    <nav style={{ padding: "10px", alignItems: "center"}}>
      <ul style={{ display: "flex", gap: "20px", listStyle: "none", margin: 0, padding: 0, justifyContent: "center" }}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/Productos">Productos</Link></li>
        <li><Link to="/Carrito">Carrito 🛒 {totalItems > 0 && <span>{totalItems}</span>}
</Link></li>
        <li><Link to="/Contacto">Contacto</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;