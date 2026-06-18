// src/componentes/Gestion/Gestion.jsx
// src/componentes/Formulario/FormularioGestion.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { FormularioContainer } from './FormularioContainer';
// IMPORTANTE: Sumamos deleteDoc y doc para poder borrar
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export function Gestion() {
    const [productos, setProductos] = useState([]);
    // Este estado guarda el producto que el usuario seleccionó para editar
    const [editandoProd, setEditandoProd] = useState(null); 

    const fetchProductos = async () => {
        const productosRef = collection(db, "productos");
        const resp = await getDocs(productosRef);
        setProductos(
            resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    // FUNCIÓN PARA BORRAR UN PRODUCTO DE FIREBASE
    const handleEliminar = async (id) => {
        const confirmar = window.confirm("¿Seguro que querés eliminar este producto de la base de datos?");
        if (!confirmar) return;

        try {
            // Apuntamos al documento exacto mediante su ID y lo borramos
            await deleteDoc(doc(db, "productos", id));
            alert("Producto eliminado correctamente.");
            fetchProductos(); // Refrescamos la lista en vivo

            // Si justo estábamos editando el producto que borramos, limpiamos el form
            if (editandoProd?.id === id) setEditandoProd(null);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    const handleEditar = (prod) => {
        setEditandoProd(prod); // Ponemos el formulario en modo edición
        //redirige al inicio del form
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center' }}>Panel de Gestión</h2>
            <hr style={{ margin: '20px 0' }} />
            
            {/* Le pasamos el producto seleccionado y una función callback para cuando termine */}
            <FormularioContainer 
                productoAEditar={editandoProd} 
                alTerminar={() => {
                    setEditandoProd(null); // Limpiamos el modo edición
                    fetchProductos();      // Refrescamos la lista de la pantalla
                }} 
            />
            
            <hr style={{ margin: '40px 0' }} />
            
            <h3>Lista de Productos en Base de Datos</h3>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
                {productos.map((prod) => (
                    <li key={prod.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #ccc' }}>
                        <span><strong>{prod.nombre}</strong> - ${prod.precio} <small style={{color: '#888'}}>(Stock: {prod.stock})</small></span>
                        
                        {/* BOTONES DE ACCIÓN */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                onClick={() => handleEditar(prod)} // Activa el modo edición cargando el producto
                                style={{ padding: '6px 12px', backgroundColor: '#259428', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                Editar
                            </button>
                            <button 
                                onClick={() => handleEliminar(prod.id)}
                                style={{ padding: '6px 12px', backgroundColor: '#f52e1f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                Eliminar 
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}