import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const ItemDetail = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    //const { addToCart } = useCart();
    //const [cantidad, setCantidad] = useState(0);
    const { addToCart, getQuantityById } = useCart();
    const [cantidad, setCantidad] = useState(0);

    // Con este 'id', podríamos hacer una llamada a una API para buscar los datos del producto
    useEffect(() => {

        const productoDB = doc(db, "productos", id)

            getDoc(productoDB)
            .then((resp) => {
               if (resp.exists()) {
                // Si existe, armamos el objeto producto y lo guardamos en el estado
                setProducto({ ...resp.data(), id: resp.id });
            } else {
                // Si no existe (el usuario metió un ID falso en la URL), seteamos null
                setProducto(null);
            }
            })
            .catch((error) => {
                setError(error.message);
                console.error("Error trayendo productos:", error);
            })
            .finally(() => {
                setCargando(false);
            });
    }, [id]);

    const cantidadEnCarrito = producto ? getQuantityById(producto.id) : 0;
    const stockDisponible = producto ? producto.stock - cantidadEnCarrito : 0;

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
            <img src={producto.foto} alt={producto.nombre} style={{ width: '100%', height: '200px', marginBottom: '15px', objectFit: 'contain'}} />
            <h3>Precio: ${producto.precio}</h3>
            
            {/* 4. Mostramos el stock restando lo que ya está en el carrito */}
            <p style={{ color: stockDisponible === 0 ? 'red' : 'green', fontWeight: 'bold' }}>
                Stock disponible: {stockDisponible}
            </p>

            {/* 5. Si no hay stock disponible, ocultamos los controles o avisamos */}
            {stockDisponible > 0 ? (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0', gap: '15px' }}>
                        <button onClick={decrementar} style={{ padding: '8px 15px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '5px' }}>-</button>
                        <p style={{ margin: '0', fontWeight: 'bold', fontSize: '1.2rem' }}>{cantidad}</p>
                        <button onClick={incrementar} style={{ padding: '8px 15px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '5px' }}>+</button>
                    </div>

                    <button 
                        onClick={handleAddToCart}
                        style={{ backgroundColor: '#b95fe3', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%', maxWidth: '300px' }}
                    >
                        Agregar al Carrito
                    </button>
                </>
            ) : (
                <p style={{ color: 'red', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '20px' }}>
                    ¡Alcanzaste el límite de stock para este producto!
                </p>
            )}
        </div>
    );
};

export default ItemDetail;