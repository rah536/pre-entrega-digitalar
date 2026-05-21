import { Card } from '../Card/PersonaCard';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#eae6e6', padding: "40px 20px", textAlign: "center", marginTop: "40px", color: "black", borderTop: "1px solid #ddd" }}>
        
        {/* Info inventada de la empresa */}
        <div style={{ maxWidth: "800px", margin: "0 auto 40px auto" }}>
            <h3 style={{ color: '#b95fe3', marginBottom: '15px', fontSize: '1.5rem' }}>Sobre Digitalar</h3>
            <p style={{ lineHeight: '1.6', color: '#444', fontSize: '1.05rem' }}>
                En Digitalar somos un equipo de amigos apasionado por la tecnología y el alto rendimiento. Nuestra misión es acercar a gamers, desarrolladores y creadores de contenido los mejores periféricos e insumos del mercado. Creemos que un buen setup es el motor de las grandes ideas, por eso trabajamos día a día para ofrecerte productos de primera calidad, asesoramiento experto y la mejor experiencia de compra.
            </p>
        </div>

        {/* Sección del Equipo */}
        <h4 style={{ marginBottom: '20px', color: '#333', fontSize: '1.2rem' }}>Conocé a nuestro equipo</h4>
        <div style={{ display: "flex", justifyContent: "center", gap: "25px", flexWrap: "wrap", marginBottom: "40px" }}>
            {/* Actualicé los nombres para que hagan juego con las fotos */}
            <Card nombre="Joey Tribbiani" puesto="Atención al Cliente" foto="/images/joey.jpg" />
            <Card nombre="Phoebe Buffay" puesto="Atención a proveedores" foto="/images/phoebe.jpg" />
            <Card nombre="Chandler Bing" puesto="Logística" foto="/images/chandler.jpg" />
        </div>

        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
            &copy; PRE-ENTREGA de Proyecto - Desarrollado por <b>Techlab</b>
        </p>
        
    </footer>
  );
}

export default Footer;