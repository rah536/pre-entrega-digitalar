/*Este es nuestro componente presentacional o "dumb". No
sabe de listas ni de lógica. Solo recibe las props de un
producto y se encarga de mostrarlo de la forma más linda
posible, usando sus propios estilos de CSS Modules.*/
// En /componentes/Item/Item.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export function Item({ id, nombre, foto, precio, stock }) {
    const [cantidad, setCantidad] = useState(0);
    const producto = { id, nombre, foto, precio, stock };
    
    const { addToCart } = useCart(); // Traemos la función del contexto

    const handleAddToCart = () => {
        if (cantidad === 0) {
            alert("Por favor, selecciona al menos 1 unidad.");
            return;
        }
        addToCart(producto, cantidad);
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
        setCantidad(0);
    };

    const incrementar = () => {
    if (cantidad < stock) {
        setCantidad(cantidad + 1);
    }
    };

    const decrementar = () => {
    if (cantidad >= 1) {
        setCantidad(cantidad - 1);
    }
};

return (
    <div style={{ border: '1px solid #382f2f', padding: '20px', borderRadius: '12px', width: '280px', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Link to={`/producto/${id}`} style={{ color: 'black' }}>
            <img src={foto} alt={nombre} style={{ width: '100%', height: '170px', marginBottom: '15px', display: 'flex',justifyContent: 'center', alignItems: 'center',overflow: 'hidden',backgroundColor: '#f9f9f9',borderRadius: '8px', maxWidth: '100%',maxHeight: '100%',objectFit: 'contain'}} />
            <h3>{nombre}</h3>
        </Link>

        <p>Precio: ${precio}</p>
        <p>Stock disponible: {stock}</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
            <button onClick={decrementar}>-</button>
            <p style={{ margin: '0 10px' }}>{cantidad}</p>
            <button onClick={incrementar}>+</button>
        </div>

        <button onClick={handleAddToCart} style={{ backgroundColor: '#b95fe3', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%', maxWidth: '300px' }}>Agregar al Carrito</button>
    </div>
);
}