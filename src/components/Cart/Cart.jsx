import React from 'react';
import { useCart } from '../../context/CartContext'; // Importamos el hook

export function Cart() {
        // 2. Obtenemos el estado 'cart' y las funciones que necesitemos del contexto
    const { cart, clearCart, getCartTotal } = useCart();
    // Si el carrito está vacío, mostramos un mensaje
    if (cart.length === 0) {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>El carrito está vacío</h2>
            <p>Agrega productos para continuar la compra.</p>
        </div>
    );
    }
    // Si hay productos, los mostramos
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
    <h1 style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '2px solid #25741e', paddingBottom: '10px' }}>
        Carrito de Compras
    </h1>

    {/* //Productos listado */}
    <div style={{ marginBottom: '40px' }}>
        {cart.map(item => (
            <div key={item.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                borderBottom: '1px solid #ccc',
                padding: '20px 0' 
            }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <img 
                        src={item.foto} 
                        alt={item.nombre} 
                        style={{ width: '100px', height: '100px', objectFit: 'contain', borderRadius: '8px', border: '1px solid #eee' }} 
                    />
                    <div>
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#333' }}>{item.nombre}</h4>
                        <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '0.9rem' }}>Precio unitario: ${item.precio}</p>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Cantidad: {item.quantity}</p>
                    </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#25741e', margin: 0 }}>
                        ${item.precio * item.quantity}
                    </p>
                </div>
                
            </div>
        ))}
    </div>

    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        backgroundColor: '#f5f5f5',
        padding: '30px', 
        borderRadius: '8px',
        width: 'fit-content', 
        margin: '0 auto', 
        gap: '15px',
        border: '1px solid #ddd'
    }}>
        <h3 style={{ margin: 0, color: '#333' }}>Resumen de compra</h3>
        <h2 style={{ margin: '10px 0 20px 0', fontSize: '1.8rem' }}>Total a pagar: ${getCartTotal()}</h2>
        
        <button style={{ 
            backgroundColor: '#25741e',
            color: 'white', 
            padding: '12px 20px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            width: '250px',
            fontWeight: 'bold',
            fontSize: '1rem'
        }}>
            Finalizar Compra
        </button>
        
        <button onClick={clearCart} style={{ 
            backgroundColor: '#defa41', 
            color: '#333', 
            padding: '12px 20px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            width: '250px',
            fontWeight: 'bold',
            fontSize: '1rem'
        }}>
            Vaciar Carrito
        </button>
    </div>
</div>
    );
}