// src/componentes/Formulario/FormularioContainer.jsx
import React, { useState, useEffect } from 'react';
import { FormularioProducto } from './FormularioProducto';
// IMPORTANTE: Traemos doc y updateDoc de Firebase
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config'; 

export function FormularioContainer({ productoAEditar, alTerminar }) {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
        categoria: '',
        foto: ''
    });

    // ESCUCHAMOS CONSTANTEMENTE SI LLEGA UN PRODUCTO PARA EDITAR DESDE EL PADRE
    useEffect(() => {
        if (productoAEditar) {
            // MODO EDICIÓN: Forzamos a los inputs a tener los valores del producto elegido
            setDatosForm({
                nombre: productoAEditar.nombre || '',
                precio: productoAEditar.precio || '',
                stock: productoAEditar.stock || '',
                categoria: productoAEditar.categoria || '',
                foto: productoAEditar.foto || ''
            });
        } else {
            // MODO CREACIÓN: Si es null, limpiamos por completo el formulario
            setDatosForm({ nombre: '', precio: '', stock: '', categoria: '', foto: '' });
        }
    }, [productoAEditar]);

    const manejarCambio = (evento) => {
        setDatosForm({
            ...datosForm,
            [evento.target.name]: evento.target.value
        });
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        if (!datosForm.nombre || !datosForm.precio || Number(datosForm.precio) <= 0 ||!datosForm.stock || Number(datosForm.stock) < 0|| !datosForm.categoria) {
            alert("Por favor, complete todos los campos (el precio no puede ser cero o negativo & el stock no puede ser negativo).");
            return;
        }

        try {
            const productoCompleto = {
                nombre: datosForm.nombre,
                precio: Number(datosForm.precio),
                stock: Number(datosForm.stock),
                categoria: datosForm.categoria.toLowerCase().trim(),
                foto: datosForm.foto.trim()
            };

            if (productoAEditar) {
                // --- CASO A: MODO EDICIÓN ---
                const productoRef = doc(db, "productos", productoAEditar.id);
                await updateDoc(productoRef, productoCompleto); // updateDoc reemplaza solo los campos enviados
                alert("¡Producto actualizado con éxito!");
            } else {
                // --- CASO B: MODO CREACIÓN ---
                const productosCollection = collection(db, "productos");
                await addDoc(productosCollection, productoCompleto);
                alert("¡Producto creado con éxito!");
            }

            // FORZANDO LA LIMPIEZA DE LOS INPUTS ---
            setDatosForm({
                nombre: '',
                precio: '',
                stock: '',
                categoria: '',
                foto: ''
            });
            // Avisamos al padre que terminamos la operación (limpiará estados y recargará la lista)
            alTerminar();

        } catch (error) {
            console.error("Error procesando Firestore:", error);
            alert("Hubo un error en la base de datos.");
        }
    };

    return (
        <FormularioProducto 
            datosForm={datosForm} 
            manejarCambio={manejarCambio} 
            manejarEnvio={manejarEnvio} 
            esEdicion={!!productoAEditar} // Pasa true si hay un producto cargado, false si es null
            cancelarEdicion={alTerminar}  // Permite al usuario arrepentirse de editar
        />
    );
}