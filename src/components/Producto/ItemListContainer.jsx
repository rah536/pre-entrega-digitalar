// En /componentes/ItemListContainer/ItemListContainer.jsx
/*Este es nuestro punto de partida. Como componente contenedor, su responsabilidad es
manejar los datos. En una aplicación real, acá haríamos una llamada a una base de datos o
una API para buscar los productos. Para nuestra clase, vamos a simularlo creando un array
directamente en el código.
En resumen: ItemListContainer imprime un mensaje en h2 y obtiene los datos que luego se
los pasa a su hijo, ItemList. No hace más.
*/
import { useState, useEffect } from 'react';
import { ItemList } from "./ItemList";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

export function ItemListContainer({ Mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
            const productosDB = collection(db,"productos")

            getDocs(productosDB)
            .then((resp) => {
                // Mapeamos los datos y seteamos el estado en un solo paso
                const productosFormateados = resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                });
                setProductos(productosFormateados);
            })
            .catch((error) => {
                setError(error.message);
                console.error("Error trayendo productos:", error);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return (
            <div className="text-center mt-5"> 
                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Cargando...</span> 
                </div>
                <h4 className="mt-3 text-secondary">Cargando catálogo...</h4>
            </div>
        );
    }

    if (error) {
        return <h2 className="text-center text-danger mt-5">Error: {error}</h2>;
    }

    return (
        <div>
            <h2>{Mensaje}</h2>
            <div>
                <ItemList productos={productos} />
            </div>
        </div>
);}