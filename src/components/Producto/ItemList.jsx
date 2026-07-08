// En /components/ItemList/ItemList.jsx
/*
Este componente recibe la lista. No le importa cómo
se ve cada producto, solo se encarga de recorrer el
array (.map()) y decirle al siguiente nivel que
renderice cada uno. ItemList recibe una lista y la
transforma en múltiples componentes Item,
pasándole a cada uno los datos que le corresponden.
Prestá atención a la forma de importación. Escribi
import y busca entre las opciones el componente que
quieras importar.
*/
import { useState } from 'react';
import { Item } from "./Item";
import { Container, Row, Col } from 'react-bootstrap';
import { useSearch } from "../../context/SearchContext"; 

export function ItemList({ productos }) {
    // context de busqueda
    const { busqueda, setBusqueda } = useSearch();

    //estados de paginacion
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 4;

    const productosFiltrados = productos.filter(prod => {
        const tieneStock = prod.stock > 0;
        const coincideBusqueda = prod.nombre?.toLowerCase().includes(busqueda.toLowerCase());
        
        return tieneStock && coincideBusqueda;
    });

    // Logica para cortar el array y paginar
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosPaginados = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
    
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    const irPaginaSiguiente = () => setPaginaActual(paginaActual + 1);
    const irPaginaAnterior = () => setPaginaActual(paginaActual - 1);

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
        setPaginaActual(1); // Regresa a la página 1 al tipear
    };

    return (
        <Container style={{ padding: '20px 0' }}>
            
            {/* --- BARRA DE BUSQUEDA --- */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                <input
                    type="text"
                    placeholder="🔍 Buscar productos..."
                    value={busqueda}
                    onChange={handleBusqueda}
                    style={{ 
                        padding: '12px', 
                        width: '100%', 
                        maxWidth: '500px', 
                        borderRadius: '8px', 
                        border: '1px solid #382f2f',
                        outline: 'none',
                        fontSize: '1rem'
                    }}
                />
            </div>

            {/* --- CONTENEDOR DE PRODUCTOS CON GRILLA BOOTSTRAP --- */}
            {productosPaginados.length > 0 ? (
                // Usamos Row en lugar del div con flexbox. 
                // justify-content-center centra las tarjetas si hay menos de 4
                <Row className="g-4 justify-content-center">
                    {productosPaginados.map(prod => (
                        // Acá definimos cómo se adapta. 
                        // Celular (xs)=1 columna, Tablet (md)=2 columnas, PC (lg)=4 columnas
                        <Col key={prod.id} xs={12} md={6} lg={3}>
                            <Item {...prod} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <h4 style={{ color: '#888', marginTop: '40px', textAlign: 'center', width: '100%' }}>
                    No se encontraron productos para "{busqueda}"
                </h4>
            )}

            {/* --- CONTROLES DE PAGINACIÓN --- */}
            {totalPaginas > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '40px' }}>
                    <button 
                        onClick={irPaginaAnterior} 
                        disabled={paginaActual === 1}
                        style={{ 
                            padding: '10px 20px', 
                            cursor: paginaActual === 1 ? 'not-allowed' : 'pointer',
                            backgroundColor: paginaActual === 1 ? '#e0e0e0' : '#b95fe3',
                            color: paginaActual === 1 ? '#888' : 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold'
                        }}
                    >
                        Anterior
                    </button>
                    
                    <span style={{ fontWeight: 'bold', color: '#382f2f' }}>
                        Página {paginaActual} de {totalPaginas}
                    </span>

                    <button 
                        onClick={irPaginaSiguiente} 
                        disabled={paginaActual === totalPaginas}
                        style={{ 
                            padding: '10px 20px', 
                            cursor: paginaActual === totalPaginas ? 'not-allowed' : 'pointer',
                            backgroundColor: paginaActual === totalPaginas ? '#e0e0e0' : '#b95fe3',
                            color: paginaActual === totalPaginas ? '#888' : 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold'
                        }}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </Container>
    );
}