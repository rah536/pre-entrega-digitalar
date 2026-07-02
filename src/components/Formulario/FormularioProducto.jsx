// src/componentes/Formulario/FormularioProducto.jsx
import React from 'react';

export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, esEdicion, cancelarEdicion }) {
    return (
        <form 
            onSubmit={manejarEnvio} 
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '15px', 
                maxWidth: '400px', 
                margin: '20px auto', 
                padding: '20px', 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                backgroundColor: esEdicion ? '#f0fff4' : '#f9f9f9' // Cambia levemente de color si está editando
            }}
        >
            {/* TÍTULO DINÁMICO */}
            <h3 style={{ textAlign: 'center', margin: '0 0 10px 0', color: esEdicion ? '#2e7d32' : '#333' }}>
                {esEdicion ? '📝 Editar Producto' : '🚀 Agregar Nuevo Producto'}
            </h3>
            
            <input 
                type="text" 
                name="nombre" 
                placeholder="Nombre del producto" 
                value={datosForm.nombre} 
                onChange={manejarCambio} 
                required
                maxLength="90"
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            
            <input 
                type="number" 
                name="precio" 
                placeholder="Precio" 
                value={datosForm.precio} 
                onChange={manejarCambio} 
                required
                min="1"
                max="10000000"
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />

            <input 
                type="number" 
                name="stock" 
                placeholder="Stock" 
                value={datosForm.stock} 
                onChange={manejarCambio} 
                required
                min="1"
                max="1000"
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />

            <input 
                type="text" 
                name="categoria" 
                placeholder="Categoría" 
                value={datosForm.categoria} 
                onChange={manejarCambio} 
                required
                maxLength="30"
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />

            <input 
                type="url" 
                name="foto" 
                placeholder="URL de la imagen (Opcional)" 
                value={datosForm.foto} 
                onChange={manejarCambio} 
                // No lleva 'required' para que permita dejarlo vacío sin que salte el cartelito HTML
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />

            {/* BOTÓN CON TEXTO Y COLOR DINÁMICO */}
            <button 
                type="submit" 
                style={{ 
                    padding: '12px', 
                    backgroundColor: esEdicion ? '#4caf50' : '#b95fe3', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold',
                    fontSize: '1rem'
                }}
            >
                {esEdicion ? 'Guardar Cambios' : 'Guardar Producto'}
            </button>

            {/* SI ESTÁ EN MODO EDICIÓN, MOSTRAMOS UN BOTÓN PARA CANCELAR Y VOLVER A MODO CREACIÓN */}
            {esEdicion && (
                <button 
                    type="button" 
                    onClick={cancelarEdicion}
                    style={{ padding: '10px', backgroundColor: '#e0e0e0', color: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Cancelar Edición
                </button>
            )}
        </form>
    );
}