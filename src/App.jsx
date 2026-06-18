import { useState } from 'react'
import './App.css'
import { Layout } from './components/Layout/Layout';
import { ItemListContainer } from './components/Producto/ItemListContainer';
import { Cart } from './components/Cart/Cart';
import { Contacto } from './components/Contacto/Contacto';
import ItemDetail from './components/Producto/ItemDetail';
import { Gestion } from './components/Formulario/FormularioGestion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- PLACEHOLDERS TEMPORALES ---
// Son componentes miniatura para que las rutas tengan algo que renderizar. 
// Luego los reemplazarás por sus archivos .jsx reales.
const Inicio = () => <h2 style={{textAlign: 'center', padding: '50px'}}>¡Bienvenido a DIGITALAR!</h2>;

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<ItemDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/gestion" element={<Gestion />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
