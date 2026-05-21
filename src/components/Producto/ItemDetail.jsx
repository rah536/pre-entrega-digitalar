import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ItemDetail = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const { addToCart } = useCart();
    const [cantidad, setCantidad] = useState(0);

    // Con este 'id', podríamos hacer una llamada a una API para buscar los datos del producto
    useEffect(() => {
        fetch('/data/productos.json')
            .then(response => response.json())
            .then(data => {
                const productoEncontrado = data.find(p => String(p.id) === String(id));
                setProducto(productoEncontrado);
            })
            .catch(error => console.error("Error al cargar el producto:", error))
            .finally(() => {
                setCargando(false); //estado "cargando" es para difernciar cuando demora y cuando el id no existe
            });
    }, [id]);

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
        if (cantidad < producto.stock) {
            setCantidad(cantidad + 1);
        }
    };

    const decrementar = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
        }
    };

    if (cargando) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Cargando detalle del producto...</h2>;
                <img src="/images/espera.png" alt="Espera" style={{ width: '100%', height: '200px', marginBottom: '15px', display: 'flex',justifyContent: 'center', alignItems: 'center',overflow: 'hidden',backgroundColor: '#f9f9f9',borderRadius: '8px', maxWidth: '100%',maxHeight: '100%',objectFit: 'contain'}} />
                <p>El producto que estás buscando no existe o fue eliminado.</p>
            </div>

        )
    }

    if (!producto) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Producto no encontrado</h2>
                <img src="/images/x.png" alt="No encontrado" style={{ width: '100%', height: '200px', marginBottom: '15px', display: 'flex',justifyContent: 'center', alignItems: 'center',overflow: 'hidden',backgroundColor: '#f9f9f9',borderRadius: '8px', maxWidth: '100%',maxHeight: '100%',objectFit: 'contain'}} />
                <p>El producto que estás buscando no existe o fue eliminado.</p>
            </div>
        );
    }

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Detalle del Producto: {producto.nombre}</h2>
            <img src={producto.foto} alt={producto.nombre} style={{ width: '100%', height: '200px', marginBottom: '15px', display: 'flex',justifyContent: 'center', alignItems: 'center',overflow: 'hidden',backgroundColor: '#f9f9f9',borderRadius: '8px', maxWidth: '100%',maxHeight: '100%',objectFit: 'contain'}} />
            <h3>Precio: ${producto.precio}</h3>
            <p>{producto.nombre}</p>
            <p>Stock disponible: {producto.stock}</p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
                <button onClick={decrementar}>-</button>
                <p style={{ margin: '0 10px' }}>{cantidad}</p>
                <button onClick={incrementar}>+</button>
            </div>

            <button onClick={handleAddToCart} style={{ backgroundColor: '#b95fe3', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%', maxWidth: '300px' }}>Agregar al Carrito</button>
        </div>
    );
};

export default ItemDetail;