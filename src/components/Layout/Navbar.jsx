import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();

  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", alignItems: "center"}}>
      <ul style={{ display: "flex", gap: "20px", listStyle: "none", margin: 0, padding: 0, justifyContent: "center" }}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/Productos">Productos</Link></li>
        <li><Link to="/Carrito">Carrito 🛒 {totalItems > 0 && <span>{totalItems}</span>}</Link></li>
        <li><Link to="/Contacto">Contacto</Link></li>
        {/* 2. Renderizado condicional basado en si existe el 'user' */}
        {user ? (
          <>
            <li><Link to="/Gestion">Gestión</Link></li>
            {/* Puedes usar user.email o user.displayName dependiendo de qué guardes */}
            <li>Hola, {user.email}</li> 
            <li>
              <button onClick={logout} style={{ cursor: "pointer" }}>
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/Login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;