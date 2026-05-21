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
import { Item } from "./Item";

export function ItemList({ productos }) {
return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px',padding: '20px 0' }}>
        {productos.filter(prod => prod.stock > 0) //filtro por stock > 0
        .map(prod => (
        <Item key={prod.id} {...prod} />
        ))}
    </div>
);
}