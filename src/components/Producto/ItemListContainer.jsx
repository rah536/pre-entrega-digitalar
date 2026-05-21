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

export function ItemListContainer({ Mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/productos.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                throw new Error('No se pudo cargar la información de los productos')
            }
            return respuesta.json();
        })
        .then((datos) => {
            setProductos(datos);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setCargando(false);
        });
        }, []);
        return (
    <div>
        <h2>{Mensaje}</h2>
        <div>
            <ItemList productos={productos} />
        </div>
    </div>
);}