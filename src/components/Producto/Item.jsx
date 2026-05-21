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
    
    //const { addToCart } = useCart(); // Traemos la función del contexto
    const { addToCart, getQuantityById } = useCart();

    // 2. Calculamos el stock disponible
    const cantidadEnCarrito = getQuantityById(id);
    const stockDisponible = stock - cantidadEnCarrito;

    const handleAddToCart = () => {
        if (cantidad === 0) {
            alert("Por favor, selecciona al menos 1 unidad.");
            return;
        }

        if (cantidad > stockDisponible) {
            alert("No hay suficiente stock disponible.");
            return;
        }

        addToCart(producto, cantidad);
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
        setCantidad(0);
    };

    const incrementar = () => {
    if (cantidad < stockDisponible) {
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

        <div style={{ marginTop: 'auto' }}> 
                <p style={{ margin: '5px 0' }}>Precio: ${precio}</p>
                <p style={{ margin: '5px 0 15px 0', color: stockDisponible === 0 ? 'red' : '#666', fontWeight: stockDisponible === 0 ? 'bold' : 'normal' }}>
                    Stock: {stockDisponible > 0 ? stockDisponible : 'Agotado'}
                </p>

                {stockDisponible > 0 ? (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '15px 0', gap: '15px' }}>
                            <button onClick={decrementar} style={{ padding: '5px 15px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '5px' }}>-</button>
                            <p style={{ margin: '0', fontWeight: 'bold' }}>{cantidad}</p>
                            <button onClick={incrementar} style={{ padding: '5px 15px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '5px' }}>+</button>
                        </div>
                        <button 
                            onClick={handleAddToCart}
                            style={{ backgroundColor: '#b95fe3', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
                        >
                            Agregar al Carrito
                        </button>
                    </>
                ) : (
                    <button 
                        disabled
                        style={{ backgroundColor: '#ccc', color: '#666', padding: '12px', border: 'none', borderRadius: '5px', fontWeight: 'bold', width: '100%', marginTop: '15px', cursor: 'not-allowed' }}
                    >
                        Sin stock disponible
                    </button>
                )}
            </div>
    </div>
);
}